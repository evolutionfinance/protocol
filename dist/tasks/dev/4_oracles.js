"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const contracts_deployments_1 = require("../../helpers/contracts-deployments");
const oracles_helpers_1 = require("../../helpers/oracles-helpers");
const types_1 = require("../../helpers/types");
const misc_utils_1 = require("../../helpers/misc-utils");
const mock_helpers_1 = require("../../helpers/mock-helpers");
const configuration_1 = require("../../helpers/configuration");
const contracts_getters_1 = require("../../helpers/contracts-getters");
config_1.task('dev:deploy-oracles', 'Deploy oracles for dev enviroment')
    .addFlag('verify', 'Verify contracts at Etherscan')
    .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(configuration_1.ConfigNames)}`)
    .setAction(async ({ verify, pool }, localBRE) => {
    await localBRE.run('set-DRE');
    const poolConfig = configuration_1.loadPoolConfig(pool);
    const { Mocks: { AllAssetsInitialPrices }, ProtocolGlobalParams: { UsdAddress, MockUsdPriceInWei }, LendingRateOracleRatesCommon, } = poolConfig;
    const defaultTokenList = {
        ...Object.fromEntries(Object.keys(types_1.TokenContractId).map((symbol) => [symbol, ''])),
        USD: UsdAddress,
    };
    const mockTokens = await contracts_getters_1.getAllMockedTokens();
    const mockTokensAddress = Object.keys(mockTokens).reduce((prev, curr) => {
        prev[curr] = mockTokens[curr].address;
        return prev;
    }, defaultTokenList);
    const addressesProvider = await contracts_getters_1.getLendingPoolAddressesProvider();
    const admin = await addressesProvider.getPoolAdmin();
    const fallbackOracle = await contracts_deployments_1.deployPriceOracle(verify);
    await misc_utils_1.waitForTx(await fallbackOracle.setEthUsdPrice(MockUsdPriceInWei));
    await oracles_helpers_1.setInitialAssetPricesInOracle(AllAssetsInitialPrices, mockTokensAddress, fallbackOracle);
    const mockAggregators = await oracles_helpers_1.deployAllMockAggregators(AllAssetsInitialPrices, verify);
    const allTokenAddresses = mock_helpers_1.getAllTokenAddresses(mockTokens);
    const allAggregatorsAddresses = mock_helpers_1.getAllAggregatorsAddresses(mockAggregators);
    const [tokens, aggregators] = contracts_getters_1.getPairsTokenAggregator(allTokenAddresses, allAggregatorsAddresses);
    await contracts_deployments_1.deployAaveOracle([tokens, aggregators, fallbackOracle.address, await configuration_1.getWethAddress(poolConfig)], verify);
    await misc_utils_1.waitForTx(await addressesProvider.setPriceOracle(fallbackOracle.address));
    const lendingRateOracle = await contracts_deployments_1.deployLendingRateOracle(verify);
    await misc_utils_1.waitForTx(await addressesProvider.setLendingRateOracle(lendingRateOracle.address));
    const { USD, ...tokensAddressesWithoutUsd } = allTokenAddresses;
    const allReservesAddresses = {
        ...tokensAddressesWithoutUsd,
    };
    await oracles_helpers_1.setInitialMarketRatesInRatesOracleByHelper(LendingRateOracleRatesCommon, allReservesAddresses, lendingRateOracle, admin);
});
