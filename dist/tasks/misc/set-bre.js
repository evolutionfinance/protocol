"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const misc_utils_1 = require("../../helpers/misc-utils");
const utils_1 = require("ethers/lib/utils");
config_1.task(`set-DRE`, `Inits the DRE, to have access to all the plugins' objects`).setAction(async (_, _DRE) => {
    if (misc_utils_1.DRE) {
        return;
    }
    if (_DRE.network.name.includes('tenderly') ||
        process.env.TENDERLY === 'true') {
        console.log('- Setting up Tenderly provider');
        if (process.env.TENDERLY_FORK_ID && process.env.TENDERLY_HEAD_ID) {
            console.log('- Connecting to a Tenderly Fork');
            _DRE.tenderlyRPC.setFork(process.env.TENDERLY_FORK_ID);
            _DRE.tenderlyRPC.setHead(process.env.TENDERLY_HEAD_ID);
        }
        else {
            console.log('- Creating a new Tenderly Fork');
            await _DRE.tenderlyRPC.initializeFork();
        }
        const provider = new _DRE.ethers.providers.Web3Provider(_DRE.tenderlyRPC);
        _DRE.ethers.provider = provider;
        console.log('- Initialized Tenderly fork:');
        console.log('  - Fork: ', _DRE.tenderlyRPC.getFork());
        console.log('  - Head: ', _DRE.tenderlyRPC.getHead());
        console.log('  - First account:', await (await _DRE.ethers.getSigners())[0].getAddress());
        console.log('  - Balance:', utils_1.formatEther(await (await _DRE.ethers.getSigners())[0].getBalance()));
    }
    misc_utils_1.setDRE(_DRE);
    return _DRE;
});
