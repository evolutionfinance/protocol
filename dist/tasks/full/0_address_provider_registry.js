"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const contracts_deployments_1 = require("../../helpers/contracts-deployments");
config_1.task('full:deploy-address-provider-registry', 'Deploy address provider registry')
    .addFlag('verify', 'Verify contracts at Etherscan')
    .setAction(async ({ verify }, DRE) => {
    await DRE.run('set-DRE');
    const contract = await contracts_deployments_1.deployLendingPoolAddressesProviderRegistry(verify);
    console.log('Registry Address:', contract.address);
});
