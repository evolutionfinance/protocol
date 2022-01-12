"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const configuration_1 = require("../../helpers/configuration");
const constants_1 = require("../../helpers/constants");
const contracts_getters_1 = require("../../helpers/contracts-getters");
const contracts_helpers_1 = require("../../helpers/contracts-helpers");
const etherscan_verification_1 = require("../../helpers/etherscan-verification");
const misc_utils_1 = require("../../helpers/misc-utils");
config_1.task('verify:general', 'Verify contracts at Etherscan')
    .addFlag('all', 'Verify all contracts at Etherscan')
    .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(configuration_1.ConfigNames)}`)
    .setAction(async ({ all, pool }, localDRE) => {
    await localDRE.run('set-DRE');
    const network = localDRE.network.name;
    const poolConfig = configuration_1.loadPoolConfig(pool);
    const { ReserveAssets, ReservesConfig, ProviderRegistry, MarketId, LendingPoolCollateralManager, LendingPoolConfigurator, LendingPool, WethGateway, } = poolConfig;
    const treasuryAddress = await configuration_1.getTreasuryAddress(poolConfig);
    const registryAddress = contracts_helpers_1.getParamPerNetwork(ProviderRegistry, network);
    const addressesProvider = await contracts_getters_1.getLendingPoolAddressesProvider();
    const addressesProviderRegistry = misc_utils_1.notFalsyOrZeroAddress(registryAddress)
        ? await contracts_getters_1.getLendingPoolAddressesProviderRegistry(registryAddress)
        : await contracts_getters_1.getLendingPoolAddressesProviderRegistry();
    const lendingPoolAddress = await addressesProvider.getLendingPool();
    const lendingPoolConfiguratorAddress = await addressesProvider.getLendingPoolConfigurator(); //getLendingPoolConfiguratorProxy();
    const lendingPoolCollateralManagerAddress = await addressesProvider.getLendingPoolCollateralManager();
    if (all) {
        const lendingPoolImplAddress = contracts_helpers_1.getParamPerNetwork(LendingPool, network);
        const lendingPoolImpl = misc_utils_1.notFalsyOrZeroAddress(lendingPoolImplAddress)
            ? await contracts_getters_1.getLendingPoolImpl(lendingPoolImplAddress)
            : await contracts_getters_1.getLendingPoolImpl();
        const lendingPoolConfiguratorImplAddress = contracts_helpers_1.getParamPerNetwork(LendingPoolConfigurator, network);
        const lendingPoolConfiguratorImpl = misc_utils_1.notFalsyOrZeroAddress(lendingPoolConfiguratorImplAddress)
            ? await contracts_getters_1.getLendingPoolConfiguratorImpl(lendingPoolConfiguratorImplAddress)
            : await contracts_getters_1.getLendingPoolConfiguratorImpl();
        const lendingPoolCollateralManagerImplAddress = contracts_helpers_1.getParamPerNetwork(LendingPoolCollateralManager, network);
        const lendingPoolCollateralManagerImpl = misc_utils_1.notFalsyOrZeroAddress(lendingPoolCollateralManagerImplAddress)
            ? await contracts_getters_1.getLendingPoolCollateralManagerImpl(lendingPoolCollateralManagerImplAddress)
            : await contracts_getters_1.getLendingPoolCollateralManagerImpl();
        const dataProvider = await contracts_getters_1.getAaveProtocolDataProvider();
        const walletProvider = await contracts_getters_1.getWalletProvider();
        const wethGatewayAddress = contracts_helpers_1.getParamPerNetwork(WethGateway, network);
        const wethGateway = misc_utils_1.notFalsyOrZeroAddress(wethGatewayAddress)
            ? await contracts_getters_1.getWETHGateway(wethGatewayAddress)
            : await contracts_getters_1.getWETHGateway();
        // Address Provider
        console.log('\n- Verifying address provider...\n');
        await etherscan_verification_1.verifyContract(addressesProvider.address, [MarketId]);
        // Address Provider Registry
        console.log('\n- Verifying address provider registry...\n');
        await etherscan_verification_1.verifyContract(addressesProviderRegistry.address, []);
        // Lending Pool implementation
        console.log('\n- Verifying LendingPool Implementation...\n');
        await etherscan_verification_1.verifyContract(lendingPoolImpl.address, []);
        // Lending Pool Configurator implementation
        console.log('\n- Verifying LendingPool Configurator Implementation...\n');
        await etherscan_verification_1.verifyContract(lendingPoolConfiguratorImpl.address, []);
        // Lending Pool Collateral Manager implementation
        console.log('\n- Verifying LendingPool Collateral Manager Implementation...\n');
        await etherscan_verification_1.verifyContract(lendingPoolCollateralManagerImpl.address, []);
        // Test helpers
        console.log('\n- Verifying  Aave  Provider Helpers...\n');
        await etherscan_verification_1.verifyContract(dataProvider.address, [addressesProvider.address]);
        // Wallet balance provider
        console.log('\n- Verifying  Wallet Balance Provider...\n');
        await etherscan_verification_1.verifyContract(walletProvider.address, []);
        // WETHGateway
        console.log('\n- Verifying  WETHGateway...\n');
        await etherscan_verification_1.verifyContract(wethGateway.address, [await configuration_1.getWethAddress(poolConfig)]);
    }
    // Lending Pool proxy
    console.log('\n- Verifying  Lending Pool Proxy...\n');
    await etherscan_verification_1.verifyContract(lendingPoolAddress, [addressesProvider.address]);
    // LendingPool Conf proxy
    console.log('\n- Verifying  Lending Pool Configurator Proxy...\n');
    await etherscan_verification_1.verifyContract(lendingPoolConfiguratorAddress, [addressesProvider.address]);
    // Proxy collateral manager
    console.log('\n- Verifying  Lending Pool Collateral Manager Proxy...\n');
    await etherscan_verification_1.verifyContract(lendingPoolCollateralManagerAddress, []);
    // DelegatedAwareAToken
    console.log('\n- Verifying DelegatedAwareAToken...\n');
    const UNI = contracts_helpers_1.getParamPerNetwork(ReserveAssets, network).UNI;
    const aUNI = await contracts_getters_1.getAddressById('aUNI');
    if (aUNI) {
        console.log('Verifying aUNI');
        await etherscan_verification_1.verifyContract(aUNI, [
            lendingPoolAddress,
            UNI,
            treasuryAddress,
            'Aave interest bearing UNI',
            'aUNI',
            constants_1.ZERO_ADDRESS,
        ]);
    }
    else {
        console.error('Missing aUNI address at JSON DB. Skipping...');
    }
    console.log('Finished verifications.');
});
