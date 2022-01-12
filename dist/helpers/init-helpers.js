"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTokenReservesByHelper = exports.configureReservesByHelper = exports.getPairsTokenAggregator = exports.initReservesByHelper = exports.chooseATokenDeployment = void 0;
const types_1 = require("./types");
const misc_utils_1 = require("./misc-utils");
const contracts_getters_1 = require("./contracts-getters");
const contracts_helpers_1 = require("./contracts-helpers");
const ethers_1 = require("ethers");
const contracts_deployments_1 = require("./contracts-deployments");
const constants_1 = require("./constants");
const ethereumjs_util_1 = require("ethereumjs-util");
exports.chooseATokenDeployment = (id) => {
    switch (id) {
        case types_1.eContractid.AToken:
            return contracts_deployments_1.deployGenericAToken;
        case types_1.eContractid.DelegationAwareAToken:
            return contracts_deployments_1.deployDelegationAwareAToken;
        default:
            throw Error(`Missing aToken deployment script for: ${id}`);
    }
};
exports.initReservesByHelper = async (reservesParams, tokenAddresses, aTokenNamePrefix, stableDebtTokenNamePrefix, variableDebtTokenNamePrefix, symbolPrefix, admin, treasuryAddress, incentivesController, verify) => {
    let gasUsage = ethers_1.BigNumber.from('0');
    const stableAndVariableDeployer = await contracts_getters_1.getStableAndVariableTokensHelper();
    const addressProvider = await contracts_getters_1.getLendingPoolAddressesProvider();
    // CHUNK CONFIGURATION
    const initChunks = 4;
    // Initialize variables for future reserves initialization
    let reserveTokens = [];
    let reserveInitDecimals = [];
    let reserveSymbols = [];
    let initInputParams = [];
    let strategyRates;
    let rateStrategies = {};
    let strategyAddresses = {};
    let strategyAddressPerAsset = {};
    let aTokenType = {};
    let delegationAwareATokenImplementationAddress = '';
    let aTokenImplementationAddress = '';
    let stableDebtTokenImplementationAddress = '';
    let variableDebtTokenImplementationAddress = '';
    // NOT WORKING ON MATIC, DEPLOYING INDIVIDUAL IMPLs INSTEAD
    // const tx1 = await waitForTx(
    //   await stableAndVariableDeployer.initDeployment([ZERO_ADDRESS], ["1"])
    // );
    // console.log(tx1.events);
    // tx1.events?.forEach((event, index) => {
    //   stableDebtTokenImplementationAddress = event?.args?.stableToken;
    //   variableDebtTokenImplementationAddress = event?.args?.variableToken;
    //   rawInsertContractAddressInDb(`stableDebtTokenImpl`, stableDebtTokenImplementationAddress);
    //   rawInsertContractAddressInDb(`variableDebtTokenImpl`, variableDebtTokenImplementationAddress);
    // });
    //gasUsage = gasUsage.add(tx1.gasUsed);
    stableDebtTokenImplementationAddress = await (await contracts_deployments_1.deployGenericStableDebtToken()).address;
    variableDebtTokenImplementationAddress = await (await contracts_deployments_1.deployGenericVariableDebtToken()).address;
    const aTokenImplementation = await contracts_deployments_1.deployGenericATokenImpl(verify);
    aTokenImplementationAddress = aTokenImplementation.address;
    contracts_helpers_1.rawInsertContractAddressInDb(`aTokenImpl`, aTokenImplementationAddress);
    const delegatedAwareReserves = Object.entries(reservesParams).filter(([_, { aTokenImpl }]) => aTokenImpl === types_1.eContractid.DelegationAwareAToken);
    if (delegatedAwareReserves.length > 0) {
        const delegationAwareATokenImplementation = await contracts_deployments_1.deployDelegationAwareATokenImpl(verify);
        delegationAwareATokenImplementationAddress = delegationAwareATokenImplementation.address;
        contracts_helpers_1.rawInsertContractAddressInDb(`delegationAwareATokenImpl`, delegationAwareATokenImplementationAddress);
    }
    const reserves = Object.entries(reservesParams).filter(([_, { aTokenImpl }]) => aTokenImpl === types_1.eContractid.DelegationAwareAToken || aTokenImpl === types_1.eContractid.AToken);
    for (let [symbol, params] of reserves) {
        const { strategy, aTokenImpl, reserveDecimals } = params;
        const { optimalUtilizationRate, baseVariableBorrowRate, variableRateSlope1, variableRateSlope2, stableRateSlope1, stableRateSlope2, } = strategy;
        if (!strategyAddresses[strategy.name]) {
            // Strategy does not exist, create a new one
            rateStrategies[strategy.name] = [
                addressProvider.address,
                optimalUtilizationRate,
                baseVariableBorrowRate,
                variableRateSlope1,
                variableRateSlope2,
                stableRateSlope1,
                stableRateSlope2,
            ];
            strategyAddresses[strategy.name] = (await contracts_deployments_1.deployDefaultReserveInterestRateStrategy(rateStrategies[strategy.name], verify)).address;
            // This causes the last strategy to be printed twice, once under "DefaultReserveInterestRateStrategy"
            // and once under the actual `strategyASSET` key.
            contracts_helpers_1.rawInsertContractAddressInDb(strategy.name, strategyAddresses[strategy.name]);
        }
        strategyAddressPerAsset[symbol] = strategyAddresses[strategy.name];
        console.log('Strategy address for asset %s: %s', symbol, strategyAddressPerAsset[symbol]);
        if (aTokenImpl === types_1.eContractid.AToken) {
            aTokenType[symbol] = 'generic';
        }
        else if (aTokenImpl === types_1.eContractid.DelegationAwareAToken) {
            aTokenType[symbol] = 'delegation aware';
        }
        reserveInitDecimals.push(reserveDecimals);
        reserveTokens.push(tokenAddresses[symbol]);
        reserveSymbols.push(symbol);
    }
    for (let i = 0; i < reserveSymbols.length; i++) {
        let aTokenToUse;
        if (aTokenType[reserveSymbols[i]] === 'generic') {
            aTokenToUse = aTokenImplementationAddress;
        }
        else {
            aTokenToUse = delegationAwareATokenImplementationAddress;
        }
        initInputParams.push({
            aTokenImpl: aTokenToUse,
            stableDebtTokenImpl: stableDebtTokenImplementationAddress,
            variableDebtTokenImpl: variableDebtTokenImplementationAddress,
            underlyingAssetDecimals: reserveInitDecimals[i],
            interestRateStrategyAddress: strategyAddressPerAsset[reserveSymbols[i]],
            underlyingAsset: reserveTokens[i],
            treasury: treasuryAddress,
            incentivesController: constants_1.ZERO_ADDRESS,
            underlyingAssetName: reserveSymbols[i],
            aTokenName: `${aTokenNamePrefix} ${reserveSymbols[i]}`,
            aTokenSymbol: `a${symbolPrefix}${reserveSymbols[i]}`,
            variableDebtTokenName: `${variableDebtTokenNamePrefix} ${symbolPrefix}${reserveSymbols[i]}`,
            variableDebtTokenSymbol: `variableDebt${symbolPrefix}${reserveSymbols[i]}`,
            stableDebtTokenName: `${stableDebtTokenNamePrefix} ${reserveSymbols[i]}`,
            stableDebtTokenSymbol: `stableDebt${symbolPrefix}${reserveSymbols[i]}`,
            params: '0x10'
        });
    }
    // Deploy init reserves per chunks
    const chunkedSymbols = misc_utils_1.chunk(reserveSymbols, initChunks);
    const chunkedInitInputParams = misc_utils_1.chunk(initInputParams, initChunks);
    const configurator = await contracts_getters_1.getLendingPoolConfiguratorProxy();
    //await waitForTx(await addressProvider.setPoolAdmin(admin));
    console.log(`- Reserves initialization in ${chunkedInitInputParams.length} txs`);
    for (let chunkIndex = 0; chunkIndex < chunkedInitInputParams.length; chunkIndex++) {
        const tx3 = await misc_utils_1.waitForTx(await configurator.batchInitReserve(chunkedInitInputParams[chunkIndex]));
        console.log(`  - Reserve ready for: ${chunkedSymbols[chunkIndex].join(', ')}`);
        console.log('    * gasUsed', tx3.gasUsed.toString());
        //gasUsage = gasUsage.add(tx3.gasUsed);
    }
    return gasUsage; // Deprecated
};
exports.getPairsTokenAggregator = (allAssetsAddresses, aggregatorsAddresses) => {
    const { ETH, USD, WETH, ...assetsAddressesWithoutEth } = allAssetsAddresses;
    const pairs = Object.entries(assetsAddressesWithoutEth).map(([tokenSymbol, tokenAddress]) => {
        if (tokenSymbol !== 'WETH' && tokenSymbol !== 'ETH') {
            const aggregatorAddressIndex = Object.keys(aggregatorsAddresses).findIndex((value) => value === tokenSymbol);
            const [, aggregatorAddress] = Object.entries(aggregatorsAddresses)[aggregatorAddressIndex];
            return [tokenAddress, aggregatorAddress];
        }
    });
    const mappedPairs = pairs.map(([asset]) => asset);
    const mappedAggregators = pairs.map(([, source]) => source);
    return [mappedPairs, mappedAggregators];
};
exports.configureReservesByHelper = async (reservesParams, tokenAddresses, helpers, admin) => {
    const addressProvider = await contracts_getters_1.getLendingPoolAddressesProvider();
    const atokenAndRatesDeployer = await contracts_getters_1.getATokensAndRatesHelper();
    const tokens = [];
    const symbols = [];
    const baseLTVA = [];
    const liquidationThresholds = [];
    const liquidationBonuses = [];
    const reserveFactors = [];
    const stableRatesEnabled = [];
    const inputParams = [];
    for (const [assetSymbol, { baseLTVAsCollateral, liquidationBonus, liquidationThreshold, reserveFactor, stableBorrowRateEnabled, },] of Object.entries(reservesParams)) {
        if (baseLTVAsCollateral === '-1')
            continue;
        const assetAddressIndex = Object.keys(tokenAddresses).findIndex((value) => value === assetSymbol);
        const [, tokenAddress] = Object.entries(tokenAddresses)[assetAddressIndex];
        const { usageAsCollateralEnabled: alreadyEnabled } = await helpers.getReserveConfigurationData(tokenAddress);
        if (alreadyEnabled) {
            console.log(`- Reserve ${assetSymbol} is already enabled as collateral, skipping`);
            continue;
        }
        // Push data
        inputParams.push({
            asset: tokenAddress,
            baseLTV: baseLTVAsCollateral,
            liquidationThreshold: liquidationThreshold,
            liquidationBonus: liquidationBonus,
            reserveFactor: reserveFactor,
            stableBorrowingEnabled: stableBorrowRateEnabled,
        });
        tokens.push(tokenAddress);
        symbols.push(assetSymbol);
        baseLTVA.push(baseLTVAsCollateral);
        liquidationThresholds.push(liquidationThreshold);
        liquidationBonuses.push(liquidationBonus);
        reserveFactors.push(reserveFactor);
        stableRatesEnabled.push(stableBorrowRateEnabled);
    }
    if (tokens.length) {
        // Set aTokenAndRatesDeployer as temporal admin
        await misc_utils_1.waitForTx(await addressProvider.setPoolAdmin(atokenAndRatesDeployer.address));
        // Deploy init per chunks
        const enableChunks = 20;
        const chunkedSymbols = misc_utils_1.chunk(symbols, enableChunks);
        const chunkedInputParams = misc_utils_1.chunk(inputParams, enableChunks);
        console.log(`- Configure reserves in ${chunkedInputParams.length} txs`);
        for (let chunkIndex = 0; chunkIndex < chunkedInputParams.length; chunkIndex++) {
            await misc_utils_1.waitForTx(await atokenAndRatesDeployer.configureReserves(chunkedInputParams[chunkIndex], {
                gasLimit: 12000000,
            }));
            console.log(`  - Init for: ${chunkedSymbols[chunkIndex].join(', ')}`);
        }
        // Set deployer back as admin
        await misc_utils_1.waitForTx(await addressProvider.setPoolAdmin(admin));
    }
};
const getAddressById = async (id, network) => { var _a; return ((_a = (await misc_utils_1.getDb().get(`${id}.${network}`).value())) === null || _a === void 0 ? void 0 : _a.address) || undefined; };
// Function deprecated? Updated but untested, script is not updated on package.json.
// This is not called during regular deployment, only in the "full:initialize-tokens"
// hardhat task.
exports.initTokenReservesByHelper = async (reservesParams, tokenAddresses, admin, addressesProviderAddress, ratesHelperAddress, dataProviderAddress, signer, treasuryAddress, verify) => {
    let gasUsage = ethers_1.BigNumber.from('0');
    const atokenAndRatesDeployer = await (await contracts_getters_1.getATokensAndRatesHelper(ratesHelperAddress)).connect(signer);
    const addressProvider = await (await contracts_getters_1.getLendingPoolAddressesProvider(addressesProviderAddress)).connect(signer);
    const protocolDataProvider = await (await contracts_getters_1.getAaveProtocolDataProvider(dataProviderAddress)).connect(signer);
    const poolAddress = await addressProvider.getLendingPool();
    // Set aTokenAndRatesDeployer as temporal admin
    //await waitForTx(await addressProvider.setPoolAdmin(atokenAndRatesDeployer.address));
    // CHUNK CONFIGURATION
    const initChunks = 4;
    // Initialize variables for future reserves initialization
    let deployedStableTokens = [];
    let deployedVariableTokens = [];
    let deployedATokens = [];
    let deployedRates = [];
    //let reserveTokens: string[] = [];
    let reserveInitDecimals = [];
    let reserveSymbols = [];
    let initInputParams = [];
    const network = process.env.MAINNET_FORK === 'true' ? types_1.eEthereumNetwork.main : misc_utils_1.DRE.network.name;
    // Grab config from DB
    for (const [symbol, address] of Object.entries(tokenAddresses)) {
        const { aTokenAddress } = await protocolDataProvider.getReserveTokensAddresses(address);
        const reserveParamIndex = Object.keys(reservesParams).findIndex((value) => value === symbol);
        const [, { reserveDecimals: decimals }] = Object.entries(reservesParams)[reserveParamIndex];
        if (!ethereumjs_util_1.isZeroAddress(aTokenAddress)) {
            console.log(`- Skipping ${symbol} due already initialized`);
            continue;
        }
        let stableTokenImpl = await getAddressById(`stableDebtTokenImpl`, network);
        let variableTokenImpl = await getAddressById(`variableDebtTokenImpl`, network);
        let aTokenImplementation = '';
        const [, { aTokenImpl, strategy }] = Object.entries(reservesParams)[reserveParamIndex];
        if (aTokenImpl === types_1.eContractid.AToken) {
            aTokenImplementation = await getAddressById(`aTokenImpl`, network);
        }
        else if (aTokenImpl === types_1.eContractid.DelegationAwareAToken) {
            aTokenImplementation = await getAddressById(`delegationAwareATokenImpl`, network);
        }
        let strategyImpl = await getAddressById(strategy.name, network);
        if (!stableTokenImpl) {
            const stableDebt = await contracts_deployments_1.deployStableDebtToken([
                poolAddress,
                tokenAddresses[symbol],
                constants_1.ZERO_ADDRESS,
                `Aave stable debt bearing ${symbol}`,
                `stableDebt${symbol}`,
            ], verify);
            stableTokenImpl = stableDebt.address;
        }
        if (!variableTokenImpl) {
            const variableDebt = await contracts_deployments_1.deployVariableDebtToken([
                poolAddress,
                tokenAddresses[symbol],
                constants_1.ZERO_ADDRESS,
                `Aave variable debt bearing ${symbol}`,
                `variableDebt${symbol}`,
            ], verify);
            variableTokenImpl = variableDebt.address;
        }
        if (!aTokenImplementation) {
            const [, { aTokenImpl }] = Object.entries(reservesParams)[reserveParamIndex];
            const deployCustomAToken = exports.chooseATokenDeployment(aTokenImpl);
            const aToken = await deployCustomAToken([
                poolAddress,
                tokenAddresses[symbol],
                treasuryAddress,
                constants_1.ZERO_ADDRESS,
                `Aave interest bearing ${symbol}`,
                `a${symbol}`,
            ], verify);
            aTokenImplementation = aToken.address;
        }
        if (!strategyImpl) {
            const [, { strategy }] = Object.entries(reservesParams)[reserveParamIndex];
            const { optimalUtilizationRate, baseVariableBorrowRate, variableRateSlope1, variableRateSlope2, stableRateSlope1, stableRateSlope2, } = strategy;
            const rates = await contracts_deployments_1.deployDefaultReserveInterestRateStrategy([
                tokenAddresses[symbol],
                optimalUtilizationRate,
                baseVariableBorrowRate,
                variableRateSlope1,
                variableRateSlope2,
                stableRateSlope1,
                stableRateSlope2,
            ], verify);
            strategyImpl = rates.address;
        }
        // --- REMOVED BECAUSE WE NOW USE THE SAME IMPLEMENTATIONS ---
        // const symbols = [`a${symbol}`, `variableDebt${symbol}`, `stableDebt${symbol}`];
        // const tokens = [aTokenImplementation, variableTokenImpl, stableTokenImpl];
        // for (let index = 0; index < symbols.length; index++) {
        //   if (!(await isErc20SymbolCorrect(tokens[index], symbols[index]))) {
        //     console.error(`${symbol} and implementation does not match: ${tokens[index]}`);
        //     throw Error('Symbol does not match implementation.');
        //   }
        // }
        console.log(`- Added ${symbol} to the initialize batch`);
        deployedStableTokens.push(stableTokenImpl);
        deployedVariableTokens.push(variableTokenImpl);
        deployedATokens.push(aTokenImplementation);
        //reserveTokens.push();
        deployedRates.push(strategyImpl);
        reserveInitDecimals.push(decimals.toString());
        reserveSymbols.push(symbol);
    }
    for (let i = 0; i < deployedATokens.length; i++) {
        initInputParams.push({
            aTokenImpl: deployedATokens[i],
            stableDebtTokenImpl: deployedStableTokens[i],
            variableDebtTokenImpl: deployedVariableTokens[i],
            underlyingAssetDecimals: reserveInitDecimals[i],
            interestRateStrategyAddress: deployedRates[i],
            underlyingAsset: tokenAddresses[reserveSymbols[i]],
            treasury: treasuryAddress,
            incentivesController: constants_1.ZERO_ADDRESS,
            underlyingAssetName: reserveSymbols[i],
            aTokenName: `Aave interest bearing ${reserveSymbols[i]}`,
            aTokenSymbol: `a${reserveSymbols[i]}`,
            variableDebtTokenName: `Aave variable debt bearing ${reserveSymbols[i]}`,
            variableDebtTokenSymbol: `variableDebt${reserveSymbols[i]}`,
            stableDebtTokenName: `Aave stable debt bearing ${reserveSymbols[i]}`,
            stableDebtTokenSymbol: `stableDebt${reserveSymbols[i]}`,
            params: '0x10'
        });
    }
    // Deploy init reserves per chunks
    const chunkedSymbols = misc_utils_1.chunk(reserveSymbols, initChunks);
    const chunkedInitInputParams = misc_utils_1.chunk(initInputParams, initChunks);
    const configurator = await contracts_getters_1.getLendingPoolConfiguratorProxy();
    //await waitForTx(await addressProvider.setPoolAdmin(admin));
    console.log(`- Reserves initialization in ${chunkedInitInputParams.length} txs`);
    for (let chunkIndex = 0; chunkIndex < chunkedInitInputParams.length; chunkIndex++) {
        const tx3 = await misc_utils_1.waitForTx(await configurator.batchInitReserve(chunkedInitInputParams[chunkIndex]));
        console.log(`  - Reserve ready for: ${chunkedSymbols[chunkIndex].join(', ')}`);
        console.log('    * gasUsed', tx3.gasUsed.toString());
    }
    // Set deployer back as admin
    //await waitForTx(await addressProvider.setPoolAdmin(admin));
    return gasUsage; // No longer relevant
};
// Function deprecated
const isErc20SymbolCorrect = async (token, symbol) => {
    const erc20 = await contracts_getters_1.getAToken(token); // using aToken for ERC20 interface
    const erc20Symbol = await erc20.symbol();
    return symbol === erc20Symbol;
};
