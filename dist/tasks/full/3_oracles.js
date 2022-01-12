"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const contracts_helpers_1 = require("../../helpers/contracts-helpers");
const contracts_deployments_1 = require("../../helpers/contracts-deployments");
const oracles_helpers_1 = require("../../helpers/oracles-helpers");
const misc_utils_1 = require("../../helpers/misc-utils");
const configuration_1 = require("../../helpers/configuration");
const contracts_getters_1 = require("../../helpers/contracts-getters");
config_1.task('full:deploy-oracles', 'Deploy oracles for dev enviroment')
    .addFlag('verify', 'Verify contracts at Etherscan')
    .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(configuration_1.ConfigNames)}`)
    .setAction(async ({ verify, pool }, DRE) => {
    try {
        await DRE.run('set-DRE');
        const network = DRE.network.name;
        const poolConfig = configuration_1.loadPoolConfig(pool);
        const { ProtocolGlobalParams: { UsdAddress }, ReserveAssets, FallbackOracle, ChainlinkAggregator, } = poolConfig;
        const lendingRateOracles = configuration_1.getLendingRateOracles(poolConfig);
        const addressesProvider = await contracts_getters_1.getLendingPoolAddressesProvider();
        const admin = await configuration_1.getGenesisPoolAdmin(poolConfig);
        const aaveOracleAddress = contracts_helpers_1.getParamPerNetwork(poolConfig.AaveOracle, network);
        const lendingRateOracleAddress = contracts_helpers_1.getParamPerNetwork(poolConfig.LendingRateOracle, network);
        const fallbackOracleAddress = await contracts_helpers_1.getParamPerNetwork(FallbackOracle, network);
        const reserveAssets = await contracts_helpers_1.getParamPerNetwork(ReserveAssets, network);
        const chainlinkAggregators = await contracts_helpers_1.getParamPerNetwork(ChainlinkAggregator, network);
        const tokensToWatch = {
            ...reserveAssets,
            USD: UsdAddress,
        };
        const [tokens, aggregators] = contracts_getters_1.getPairsTokenAggregator(tokensToWatch, chainlinkAggregators);
        let aaveOracle;
        if (misc_utils_1.notFalsyOrZeroAddress(aaveOracleAddress)) {
            aaveOracle = await await contracts_getters_1.getAaveOracle(aaveOracleAddress);
            const owner = await aaveOracle.owner();
            const signer = DRE.ethers.provider.getSigner(owner);
            aaveOracle = await (await contracts_getters_1.getAaveOracle(aaveOracleAddress)).connect(signer);
            await misc_utils_1.waitForTx(await aaveOracle.setAssetSources(tokens, aggregators));
        }
        else {
            aaveOracle = await contracts_deployments_1.deployAaveOracle([tokens, aggregators, fallbackOracleAddress, await configuration_1.getWethAddress(poolConfig)], verify);
        }
        let lendingRateOracle = misc_utils_1.notFalsyOrZeroAddress(lendingRateOracleAddress)
            ? await contracts_getters_1.getLendingRateOracle(lendingRateOracleAddress)
            : await contracts_deployments_1.deployLendingRateOracle(verify);
        const { USD, ...tokensAddressesWithoutUsd } = tokensToWatch;
        lendingRateOracle = lendingRateOracle.connect(DRE.ethers.provider.getSigner(await lendingRateOracle.owner()));
        // This must be done any time a new market is created I believe
        //if (!lendingRateOracleAddress) {
        await oracles_helpers_1.setInitialMarketRatesInRatesOracleByHelper(lendingRateOracles, tokensAddressesWithoutUsd, lendingRateOracle, admin);
        //}
        console.log('ORACLES: %s and %s', aaveOracle.address, lendingRateOracle.address);
        // Register the proxy price provider on the addressesProvider
        await misc_utils_1.waitForTx(await addressesProvider.setPriceOracle(aaveOracle.address));
        await misc_utils_1.waitForTx(await addressesProvider.setLendingRateOracle(lendingRateOracle.address));
    }
    catch (error) {
        if (DRE.network.name.includes('tenderly')) {
            const transactionLink = `https://dashboard.tenderly.co/${DRE.config.tenderly.username}/${DRE.config.tenderly.project}/fork/${DRE.tenderlyRPC.getFork()}/simulation/${DRE.tenderlyRPC.getHead()}`;
            console.error('Check tx error:', transactionLink);
        }
        throw error;
    }
});
