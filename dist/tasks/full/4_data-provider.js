"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const contracts_deployments_1 = require("../../helpers/contracts-deployments");
const process_1 = require("process");
const contracts_getters_1 = require("../../helpers/contracts-getters");
config_1.task('full:data-provider', 'Initialize lending pool configuration.')
    .addFlag('verify', 'Verify contracts at Etherscan')
    .setAction(async ({ verify }, localBRE) => {
    try {
        await localBRE.run('set-DRE');
        const addressesProvider = await contracts_getters_1.getLendingPoolAddressesProvider();
        await contracts_deployments_1.deployAaveProtocolDataProvider(addressesProvider.address, verify);
    }
    catch (err) {
        console.error(err);
        process_1.exit(1);
    }
});
