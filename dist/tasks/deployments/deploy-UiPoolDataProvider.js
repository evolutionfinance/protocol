"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const types_1 = require("../../types");
const etherscan_verification_1 = require("../../helpers/etherscan-verification");
const types_2 = require("../../helpers/types");
config_1.task(`deploy-${types_2.eContractid.UiPoolDataProvider}`, `Deploys the UiPoolDataProvider contract`)
    .addFlag('verify', 'Verify UiPoolDataProvider contract via Etherscan API.')
    .setAction(async ({ verify }, localBRE) => {
    await localBRE.run('set-DRE');
    if (!localBRE.network.config.chainId) {
        throw new Error('INVALID_CHAIN_ID');
    }
    console.log(`\n- UiPoolDataProvider deployment`);
    console.log(`\tDeploying UiPoolDataProvider implementation ...`);
    const uiPoolDataProvider = await new types_1.UiPoolDataProviderFactory(await localBRE.ethers.provider.getSigner()).deploy();
    await uiPoolDataProvider.deployTransaction.wait();
    console.log('uiPoolDataProvider.address', uiPoolDataProvider.address);
    await etherscan_verification_1.verifyContract(uiPoolDataProvider.address, []);
    console.log(`\tFinished UiPoolDataProvider proxy and implementation deployment`);
});
