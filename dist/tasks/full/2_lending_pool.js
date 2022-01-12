"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const contracts_helpers_1 = require("../../helpers/contracts-helpers");
const contracts_deployments_1 = require("../../helpers/contracts-deployments");
const types_1 = require("../../helpers/types");
const misc_utils_1 = require("../../helpers/misc-utils");
const contracts_getters_1 = require("../../helpers/contracts-getters");
const configuration_1 = require("../../helpers/configuration");
config_1.task('full:deploy-lending-pool', 'Deploy lending pool for dev enviroment')
    .addFlag('verify', 'Verify contracts at Etherscan')
    .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(configuration_1.ConfigNames)}`)
    .setAction(async ({ verify, pool }, DRE) => {
    try {
        await DRE.run('set-DRE');
        const network = DRE.network.name;
        const poolConfig = configuration_1.loadPoolConfig(pool);
        const addressesProvider = await contracts_getters_1.getLendingPoolAddressesProvider();
        const { LendingPool, LendingPoolConfigurator } = poolConfig;
        // Reuse/deploy lending pool implementation
        let lendingPoolImplAddress = contracts_helpers_1.getParamPerNetwork(LendingPool, network);
        if (!misc_utils_1.notFalsyOrZeroAddress(lendingPoolImplAddress)) {
            console.log('\tDeploying new lending pool implementation & libraries...');
            const lendingPoolImpl = await contracts_deployments_1.deployLendingPool(verify);
            lendingPoolImplAddress = lendingPoolImpl.address;
        }
        console.log('\tSetting lending pool implementation with address:', lendingPoolImplAddress);
        // Set lending pool impl to Address provider
        await misc_utils_1.waitForTx(await addressesProvider.setLendingPoolImpl(lendingPoolImplAddress));
        const address = await addressesProvider.getLendingPool();
        const lendingPoolProxy = await contracts_getters_1.getLendingPool(address);
        await contracts_helpers_1.insertContractAddressInDb(types_1.eContractid.LendingPool, lendingPoolProxy.address);
        // Reuse/deploy lending pool configurator
        let lendingPoolConfiguratorImplAddress = contracts_helpers_1.getParamPerNetwork(LendingPoolConfigurator, network); //await deployLendingPoolConfigurator(verify);
        if (!misc_utils_1.notFalsyOrZeroAddress(lendingPoolConfiguratorImplAddress)) {
            console.log('\tDeploying new configurator implementation...');
            const lendingPoolConfiguratorImpl = await contracts_deployments_1.deployLendingPoolConfigurator(verify);
            lendingPoolConfiguratorImplAddress = lendingPoolConfiguratorImpl.address;
        }
        console.log('\tSetting lending pool configurator implementation with address:', lendingPoolConfiguratorImplAddress);
        // Set lending pool conf impl to Address Provider
        await misc_utils_1.waitForTx(await addressesProvider.setLendingPoolConfiguratorImpl(lendingPoolConfiguratorImplAddress));
        const lendingPoolConfiguratorProxy = await contracts_getters_1.getLendingPoolConfiguratorProxy(await addressesProvider.getLendingPoolConfigurator());
        await contracts_helpers_1.insertContractAddressInDb(types_1.eContractid.LendingPoolConfigurator, lendingPoolConfiguratorProxy.address);
        // Deploy deployment helpers
        await contracts_deployments_1.deployStableAndVariableTokensHelper([lendingPoolProxy.address, addressesProvider.address], verify);
        await contracts_deployments_1.deployATokensAndRatesHelper([lendingPoolProxy.address, addressesProvider.address, lendingPoolConfiguratorProxy.address], verify);
    }
    catch (error) {
        if (DRE.network.name.includes('tenderly')) {
            const transactionLink = `https://dashboard.tenderly.co/${DRE.config.tenderly.username}/${DRE.config.tenderly.project}/fork/${DRE.tenderlyRPC.getFork()}/simulation/${DRE.tenderlyRPC.getHead()}`;
            console.error('Check tx error:', transactionLink);
        }
        throw error;
    }
});
