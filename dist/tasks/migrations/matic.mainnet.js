"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const etherscan_verification_1 = require("../../helpers/etherscan-verification");
const configuration_1 = require("../../helpers/configuration");
const misc_utils_1 = require("../../helpers/misc-utils");
const tenderly_utils_1 = require("../../helpers/tenderly-utils");
config_1.task('matic:mainnet', 'Deploy development enviroment')
    .addFlag('verify', 'Verify contracts at Etherscan')
    .setAction(async ({ verify }, DRE) => {
    const POOL_NAME = configuration_1.ConfigNames.Matic;
    await DRE.run('set-DRE');
    // Prevent loss of gas verifying all the needed ENVs for Etherscan verification
    if (verify) {
        etherscan_verification_1.checkVerification();
    }
    console.log('Migration started\n');
    console.log('1. Deploy address provider');
    await DRE.run('full:deploy-address-provider', { pool: POOL_NAME });
    console.log('2. Deploy lending pool');
    await DRE.run('full:deploy-lending-pool', { pool: POOL_NAME });
    console.log('3. Deploy oracles');
    await DRE.run('full:deploy-oracles', { pool: POOL_NAME });
    console.log('4. Deploy Data Provider');
    await DRE.run('full:data-provider', { pool: POOL_NAME });
    console.log('5. Initialize lending pool');
    await DRE.run('full:initialize-lending-pool', { pool: POOL_NAME });
    if (verify) {
        misc_utils_1.printContracts();
        console.log('4. Veryfing contracts');
        await DRE.run('verify:general', { all: true, pool: POOL_NAME });
        console.log('5. Veryfing aTokens and debtTokens');
        await DRE.run('verify:tokens', { pool: POOL_NAME });
    }
    if (tenderly_utils_1.usingTenderly()) {
        const postDeployHead = DRE.tenderlyRPC.getHead();
        const postDeployFork = DRE.tenderlyRPC.getFork();
        console.log('Tenderly Info');
        console.log('- Head', postDeployHead);
        console.log('- Fork', postDeployFork);
    }
    console.log('\nFinished migrations');
    misc_utils_1.printContracts();
});
