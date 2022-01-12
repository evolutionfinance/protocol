"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const contracts_deployments_1 = require("../../helpers/contracts-deployments");
const types_1 = require("../../helpers/types");
const misc_utils_1 = require("../../helpers/misc-utils");
const contracts_getters_1 = require("../../helpers/contracts-getters");
const contracts_helpers_1 = require("../../helpers/contracts-helpers");
config_1.task('dev:deploy-lending-pool', 'Deploy lending pool for dev enviroment')
    .addFlag('verify', 'Verify contracts at Etherscan')
    .setAction(async ({ verify }, localBRE) => {
    await localBRE.run('set-DRE');
    const addressesProvider = await contracts_getters_1.getLendingPoolAddressesProvider();
    const lendingPoolImpl = await contracts_deployments_1.deployLendingPool(verify);
    // Set lending pool impl to Address Provider
    await misc_utils_1.waitForTx(await addressesProvider.setLendingPoolImpl(lendingPoolImpl.address));
    const address = await addressesProvider.getLendingPool();
    const lendingPoolProxy = await contracts_getters_1.getLendingPool(address);
    await contracts_helpers_1.insertContractAddressInDb(types_1.eContractid.LendingPool, lendingPoolProxy.address);
    const lendingPoolConfiguratorImpl = await contracts_deployments_1.deployLendingPoolConfigurator(verify);
    // Set lending pool conf impl to Address Provider
    await misc_utils_1.waitForTx(await addressesProvider.setLendingPoolConfiguratorImpl(lendingPoolConfiguratorImpl.address));
    const lendingPoolConfiguratorProxy = await contracts_getters_1.getLendingPoolConfiguratorProxy(await addressesProvider.getLendingPoolConfigurator());
    await contracts_helpers_1.insertContractAddressInDb(types_1.eContractid.LendingPoolConfigurator, lendingPoolConfiguratorProxy.address);
    // Deploy deployment helpers
    await contracts_deployments_1.deployStableAndVariableTokensHelper([lendingPoolProxy.address, addressesProvider.address], verify);
    await contracts_deployments_1.deployATokensAndRatesHelper([lendingPoolProxy.address, addressesProvider.address, lendingPoolConfiguratorProxy.address], verify);
});
