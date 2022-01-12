"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const configuration_1 = require("../../helpers/configuration");
const contracts_getters_1 = require("../../helpers/contracts-getters");
const contracts_helpers_1 = require("../../helpers/contracts-helpers");
const types_1 = require("../../helpers/types");
config_1.task('print-config', 'Inits the DRE, to have access to all the plugins')
    .addParam('dataProvider', 'Address of AaveProtocolDataProvider')
    .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(configuration_1.ConfigNames)}`)
    .setAction(async ({ pool, dataProvider }, localBRE) => {
    await localBRE.run('set-DRE');
    const network = process.env.MAINNET_FORK === 'true'
        ? types_1.eEthereumNetwork.main
        : localBRE.network.name;
    const poolConfig = configuration_1.loadPoolConfig(pool);
    const providerRegistryAddress = contracts_helpers_1.getParamPerNetwork(poolConfig.ProviderRegistry, network);
    const providerRegistry = await contracts_getters_1.getLendingPoolAddressesProviderRegistry(providerRegistryAddress);
    const providers = await providerRegistry.getAddressesProvidersList();
    const addressesProvider = await contracts_getters_1.getLendingPoolAddressesProvider(providers[0]); // Checks first provider
    console.log('Addresses Providers', providers.join(', '));
    console.log('Market Id: ', await addressesProvider.getMarketId());
    console.log('LendingPool Proxy:', await addressesProvider.getLendingPool());
    console.log('Lending Pool Collateral Manager', await addressesProvider.getLendingPoolCollateralManager());
    console.log('Lending Pool Configurator proxy', await addressesProvider.getLendingPoolConfigurator());
    console.log('Pool admin', await addressesProvider.getPoolAdmin());
    console.log('Emergency admin', await addressesProvider.getEmergencyAdmin());
    console.log('Price Oracle', await addressesProvider.getPriceOracle());
    console.log('Lending Rate Oracle', await addressesProvider.getLendingRateOracle());
    console.log('Lending Pool Data Provider', dataProvider);
    const protocolDataProvider = await contracts_getters_1.getAaveProtocolDataProvider(dataProvider);
    const fields = [
        'decimals',
        'ltv',
        'liquidationThreshold',
        'liquidationBonus',
        'reserveFactor',
        'usageAsCollateralEnabled',
        'borrowingEnabled',
        'stableBorrowRateEnabled',
        'isActive',
        'isFrozen',
    ];
    const tokensFields = ['aToken', 'stableDebtToken', 'variableDebtToken'];
    for (const [symbol, address] of Object.entries(contracts_helpers_1.getParamPerNetwork(poolConfig.ReserveAssets, network))) {
        console.log(`- ${symbol} asset config`);
        console.log(`  - reserve address: ${address}`);
        const reserveData = await protocolDataProvider.getReserveConfigurationData(address);
        const tokensAddresses = await protocolDataProvider.getReserveTokensAddresses(address);
        fields.forEach((field, index) => {
            console.log(`  - ${field}:`, reserveData[field].toString());
        });
        tokensFields.forEach((field, index) => {
            console.log(`  - ${field}:`, tokensAddresses[index]);
        });
    }
});
