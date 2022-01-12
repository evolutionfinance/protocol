"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployFlashLiquidationAdapter = exports.deployUniswapRepayAdapter = exports.deployUniswapLiquiditySwapAdapter = exports.deployMockUniswapRouter = exports.deploySelfdestructTransferMock = exports.deployMockAToken = exports.deployMockVariableDebtToken = exports.deployWETHMocked = exports.deployMockStableDebtToken = exports.authorizeWETHGateway = exports.deployWETHGateway = exports.deployATokensAndRatesHelper = exports.deployStableAndVariableTokensHelper = exports.deployMockTokens = exports.deployAllMockTokens = exports.deployDelegationAwareATokenImpl = exports.deployDelegationAwareAToken = exports.deployGenericATokenImpl = exports.deployGenericAToken = exports.deployGenericVariableDebtToken = exports.deployGenericStableDebtToken = exports.deployVariableDebtToken = exports.deployStableDebtToken = exports.deployDefaultReserveInterestRateStrategy = exports.deployMintableDelegationERC20 = exports.deployMintableERC20 = exports.deployAaveProtocolDataProvider = exports.deployWalletBalancerProvider = exports.deployMockFlashLoanReceiver = exports.deployInitializableAdminUpgradeabilityProxy = exports.deployLendingPoolCollateralManager = exports.deployAaveOracle = exports.deployMockAggregator = exports.deployLendingRateOracle = exports.deployPriceOracle = exports.deployLendingPool = exports.deployAaveLibraries = exports.deployValidationLogic = exports.deployGenericLogic = exports.deployReserveLogicLibrary = exports.deployLendingPoolConfigurator = exports.deployLendingPoolAddressesProviderRegistry = exports.deployLendingPoolAddressesProvider = void 0;
const misc_utils_1 = require("./misc-utils");
const types_1 = require("./types");
const configuration_1 = require("./configuration");
const contracts_getters_1 = require("./contracts-getters");
const types_2 = require("../types");
const contracts_helpers_1 = require("./contracts-helpers");
const StableAndVariableTokensHelperFactory_1 = require("../types/StableAndVariableTokensHelperFactory");
const plugins_1 = require("@nomiclabs/buidler/plugins");
const readArtifact = async (id) => {
    if (misc_utils_1.DRE.network.name === types_1.eEthereumNetwork.buidlerevm) {
        return plugins_1.readArtifact(misc_utils_1.DRE.config.paths.artifacts, id);
    }
    return misc_utils_1.DRE.artifacts.readArtifact(id);
};
exports.deployLendingPoolAddressesProvider = async (marketId, verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.LendingPoolAddressesProviderFactory(await contracts_getters_1.getFirstSigner()).deploy(marketId), types_1.eContractid.LendingPoolAddressesProvider, [marketId], verify);
exports.deployLendingPoolAddressesProviderRegistry = async (verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.LendingPoolAddressesProviderRegistryFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.LendingPoolAddressesProviderRegistry, [], verify);
exports.deployLendingPoolConfigurator = async (verify) => {
    const lendingPoolConfiguratorImpl = await new types_2.LendingPoolConfiguratorFactory(await contracts_getters_1.getFirstSigner()).deploy();
    await contracts_helpers_1.insertContractAddressInDb(types_1.eContractid.LendingPoolConfiguratorImpl, lendingPoolConfiguratorImpl.address);
    return contracts_helpers_1.withSaveAndVerify(lendingPoolConfiguratorImpl, types_1.eContractid.LendingPoolConfigurator, [], verify);
};
exports.deployReserveLogicLibrary = async (verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.ReserveLogicFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.ReserveLogic, [], verify);
exports.deployGenericLogic = async (reserveLogic, verify) => {
    const genericLogicArtifact = await readArtifact(types_1.eContractid.GenericLogic);
    const linkedGenericLogicByteCode = contracts_helpers_1.linkBytecode(genericLogicArtifact, {
        [types_1.eContractid.ReserveLogic]: reserveLogic.address,
    });
    const genericLogicFactory = await misc_utils_1.DRE.ethers.getContractFactory(genericLogicArtifact.abi, linkedGenericLogicByteCode);
    const genericLogic = await (await genericLogicFactory.deploy()).deployed();
    return contracts_helpers_1.withSaveAndVerify(genericLogic, types_1.eContractid.GenericLogic, [], verify);
};
exports.deployValidationLogic = async (reserveLogic, genericLogic, verify) => {
    const validationLogicArtifact = await readArtifact(types_1.eContractid.ValidationLogic);
    const linkedValidationLogicByteCode = contracts_helpers_1.linkBytecode(validationLogicArtifact, {
        [types_1.eContractid.ReserveLogic]: reserveLogic.address,
        [types_1.eContractid.GenericLogic]: genericLogic.address,
    });
    const validationLogicFactory = await misc_utils_1.DRE.ethers.getContractFactory(validationLogicArtifact.abi, linkedValidationLogicByteCode);
    const validationLogic = await (await validationLogicFactory.deploy()).deployed();
    return contracts_helpers_1.withSaveAndVerify(validationLogic, types_1.eContractid.ValidationLogic, [], verify);
};
exports.deployAaveLibraries = async (verify) => {
    const reserveLogic = await exports.deployReserveLogicLibrary(verify);
    const genericLogic = await exports.deployGenericLogic(reserveLogic, verify);
    const validationLogic = await exports.deployValidationLogic(reserveLogic, genericLogic, verify);
    // Hardcoded solidity placeholders, if any library changes path this will fail.
    // The '__$PLACEHOLDER$__ can be calculated via solidity keccak, but the LendingPoolLibraryAddresses Type seems to
    // require a hardcoded string.
    //
    //  how-to:
    //  1. PLACEHOLDER = solidityKeccak256(['string'], `${libPath}:${libName}`).slice(2, 36)
    //  2. LIB_PLACEHOLDER = `__$${PLACEHOLDER}$__`
    // or grab placeholdes from LendingPoolLibraryAddresses at Typechain generation.
    //
    // libPath example: contracts/libraries/logic/GenericLogic.sol
    // libName example: GenericLogic
    return {
        ['__$de8c0cf1a7d7c36c802af9a64fb9d86036$__']: validationLogic.address,
        ['__$22cd43a9dda9ce44e9b92ba393b88fb9ac$__']: reserveLogic.address,
    };
};
exports.deployLendingPool = async (verify) => {
    const libraries = await exports.deployAaveLibraries(verify);
    const lendingPoolImpl = await new types_2.LendingPoolFactory(libraries, await contracts_getters_1.getFirstSigner()).deploy();
    await contracts_helpers_1.insertContractAddressInDb(types_1.eContractid.LendingPoolImpl, lendingPoolImpl.address);
    return contracts_helpers_1.withSaveAndVerify(lendingPoolImpl, types_1.eContractid.LendingPool, [], verify);
};
exports.deployPriceOracle = async (verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.PriceOracleFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.PriceOracle, [], verify);
exports.deployLendingRateOracle = async (verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.LendingRateOracleFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.LendingRateOracle, [], verify);
exports.deployMockAggregator = async (price, verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.MockAggregatorFactory(await contracts_getters_1.getFirstSigner()).deploy(price), types_1.eContractid.MockAggregator, [price], verify);
exports.deployAaveOracle = async (args, verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.AaveOracleFactory(await contracts_getters_1.getFirstSigner()).deploy(...args), types_1.eContractid.AaveOracle, args, verify);
exports.deployLendingPoolCollateralManager = async (verify) => {
    const collateralManagerImpl = await new types_2.LendingPoolCollateralManagerFactory(await contracts_getters_1.getFirstSigner()).deploy();
    await contracts_helpers_1.insertContractAddressInDb(types_1.eContractid.LendingPoolCollateralManagerImpl, collateralManagerImpl.address);
    return contracts_helpers_1.withSaveAndVerify(collateralManagerImpl, types_1.eContractid.LendingPoolCollateralManager, [], verify);
};
exports.deployInitializableAdminUpgradeabilityProxy = async (verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.InitializableAdminUpgradeabilityProxyFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.InitializableAdminUpgradeabilityProxy, [], verify);
exports.deployMockFlashLoanReceiver = async (addressesProvider, verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.MockFlashLoanReceiverFactory(await contracts_getters_1.getFirstSigner()).deploy(addressesProvider), types_1.eContractid.MockFlashLoanReceiver, [addressesProvider], verify);
exports.deployWalletBalancerProvider = async (verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.WalletBalanceProviderFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.WalletBalanceProvider, [], verify);
exports.deployAaveProtocolDataProvider = async (addressesProvider, verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.AaveProtocolDataProviderFactory(await contracts_getters_1.getFirstSigner()).deploy(addressesProvider), types_1.eContractid.AaveProtocolDataProvider, [addressesProvider], verify);
exports.deployMintableERC20 = async (args, verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.MintableERC20Factory(await contracts_getters_1.getFirstSigner()).deploy(...args), types_1.eContractid.MintableERC20, args, verify);
exports.deployMintableDelegationERC20 = async (args, verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.MintableDelegationERC20Factory(await contracts_getters_1.getFirstSigner()).deploy(...args), types_1.eContractid.MintableDelegationERC20, args, verify);
exports.deployDefaultReserveInterestRateStrategy = async (args, verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.DefaultReserveInterestRateStrategyFactory(await contracts_getters_1.getFirstSigner()).deploy(...args), types_1.eContractid.DefaultReserveInterestRateStrategy, args, verify);
exports.deployStableDebtToken = async (args, verify) => {
    const instance = await contracts_helpers_1.withSaveAndVerify(await new types_2.StableDebtTokenFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.StableDebtToken, [], verify);
    await instance.initialize(args[0], args[1], args[2], '18', args[3], args[4], '0x10');
    return instance;
};
exports.deployVariableDebtToken = async (args, verify) => {
    const instance = await contracts_helpers_1.withSaveAndVerify(await new types_2.VariableDebtTokenFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.VariableDebtToken, [], verify);
    await instance.initialize(args[0], args[1], args[2], '18', args[3], args[4], '0x10');
    return instance;
};
exports.deployGenericStableDebtToken = async () => contracts_helpers_1.withSaveAndVerify(await new types_2.StableDebtTokenFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.StableDebtToken, [], false);
exports.deployGenericVariableDebtToken = async () => contracts_helpers_1.withSaveAndVerify(await new types_2.VariableDebtTokenFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.VariableDebtToken, [], false);
exports.deployGenericAToken = async ([poolAddress, underlyingAssetAddress, treasuryAddress, incentivesController, name, symbol], verify) => {
    const instance = await contracts_helpers_1.withSaveAndVerify(await new types_2.ATokenFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.AToken, [], verify);
    await instance.initialize(poolAddress, treasuryAddress, underlyingAssetAddress, incentivesController, '18', name, symbol, '0x10');
    return instance;
};
exports.deployGenericATokenImpl = async (verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.ATokenFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.AToken, [], verify);
exports.deployDelegationAwareAToken = async ([pool, underlyingAssetAddress, treasuryAddress, incentivesController, name, symbol], verify) => {
    const instance = await contracts_helpers_1.withSaveAndVerify(await new types_2.DelegationAwareATokenFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.DelegationAwareAToken, [], verify);
    await instance.initialize(pool, treasuryAddress, underlyingAssetAddress, incentivesController, '18', name, symbol, '0x10');
    return instance;
};
exports.deployDelegationAwareATokenImpl = async (verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.DelegationAwareATokenFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.DelegationAwareAToken, [], verify);
exports.deployAllMockTokens = async (verify) => {
    const tokens = {};
    const protoConfigData = configuration_1.getReservesConfigByPool(types_1.AavePools.proto);
    for (const tokenSymbol of Object.keys(types_1.TokenContractId)) {
        let decimals = '18';
        let configData = protoConfigData[tokenSymbol];
        tokens[tokenSymbol] = await exports.deployMintableERC20([tokenSymbol, tokenSymbol, configData ? configData.reserveDecimals : decimals], verify);
        await contracts_helpers_1.registerContractInJsonDb(tokenSymbol.toUpperCase(), tokens[tokenSymbol]);
    }
    return tokens;
};
exports.deployMockTokens = async (config, verify) => {
    const tokens = {};
    const defaultDecimals = 18;
    const configData = config.ReservesConfig;
    for (const tokenSymbol of Object.keys(configData)) {
        tokens[tokenSymbol] = await exports.deployMintableERC20([
            tokenSymbol,
            tokenSymbol,
            configData[tokenSymbol].reserveDecimals ||
                defaultDecimals.toString(),
        ], verify);
        await contracts_helpers_1.registerContractInJsonDb(tokenSymbol.toUpperCase(), tokens[tokenSymbol]);
    }
    return tokens;
};
exports.deployStableAndVariableTokensHelper = async (args, verify) => contracts_helpers_1.withSaveAndVerify(await new StableAndVariableTokensHelperFactory_1.StableAndVariableTokensHelperFactory(await contracts_getters_1.getFirstSigner()).deploy(...args), types_1.eContractid.StableAndVariableTokensHelper, args, verify);
exports.deployATokensAndRatesHelper = async (args, verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.ATokensAndRatesHelperFactory(await contracts_getters_1.getFirstSigner()).deploy(...args), types_1.eContractid.ATokensAndRatesHelper, args, verify);
exports.deployWETHGateway = async (args, verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.WETHGatewayFactory(await contracts_getters_1.getFirstSigner()).deploy(...args), types_1.eContractid.WETHGateway, args, verify);
exports.authorizeWETHGateway = async (wethGateWay, lendingPool) => await new types_2.WETHGatewayFactory(await contracts_getters_1.getFirstSigner())
    .attach(wethGateWay)
    .authorizeLendingPool(lendingPool);
exports.deployMockStableDebtToken = async (args, verify) => {
    const instance = await contracts_helpers_1.withSaveAndVerify(await new types_2.MockStableDebtTokenFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.MockStableDebtToken, [], verify);
    await instance.initialize(args[0], args[1], args[2], '18', args[3], args[4], args[5]);
    return instance;
};
exports.deployWETHMocked = async (verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.WETH9MockedFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.WETHMocked, [], verify);
exports.deployMockVariableDebtToken = async (args, verify) => {
    const instance = await contracts_helpers_1.withSaveAndVerify(await new types_2.MockVariableDebtTokenFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.MockVariableDebtToken, [], verify);
    await instance.initialize(args[0], args[1], args[2], '18', args[3], args[4], args[5]);
    return instance;
};
exports.deployMockAToken = async (args, verify) => {
    const instance = await contracts_helpers_1.withSaveAndVerify(await new types_2.MockATokenFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.MockAToken, [], verify);
    await instance.initialize(args[0], args[2], args[1], args[3], '18', args[4], args[5], args[6]);
    return instance;
};
exports.deploySelfdestructTransferMock = async (verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.SelfdestructTransferFactory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.SelfdestructTransferMock, [], verify);
exports.deployMockUniswapRouter = async (verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.MockUniswapV2Router02Factory(await contracts_getters_1.getFirstSigner()).deploy(), types_1.eContractid.MockUniswapV2Router02, [], verify);
exports.deployUniswapLiquiditySwapAdapter = async (args, verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.UniswapLiquiditySwapAdapterFactory(await contracts_getters_1.getFirstSigner()).deploy(...args), types_1.eContractid.UniswapLiquiditySwapAdapter, args, verify);
exports.deployUniswapRepayAdapter = async (args, verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.UniswapRepayAdapterFactory(await contracts_getters_1.getFirstSigner()).deploy(...args), types_1.eContractid.UniswapRepayAdapter, args, verify);
exports.deployFlashLiquidationAdapter = async (args, verify) => contracts_helpers_1.withSaveAndVerify(await new types_2.FlashLiquidationAdapterFactory(await contracts_getters_1.getFirstSigner()).deploy(...args), types_1.eContractid.FlashLiquidationAdapter, args, verify);
