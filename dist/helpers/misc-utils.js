"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFalsyOrZeroAddress = exports.printContracts = exports.chunk = exports.filterMapBy = exports.waitForTx = exports.advanceTimeAndBlock = exports.increaseTime = exports.advanceBlock = exports.timeLatest = exports.evmRevert = exports.evmSnapshot = exports.createRandomAddress = exports.sleep = exports.setDRE = exports.DRE = exports.getDb = exports.stringToBigNumber = exports.bnToBigNumber = exports.toWad = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const lowdb_1 = __importDefault(require("lowdb"));
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
const constants_1 = require("./constants");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const ethereumjs_util_1 = require("ethereumjs-util");
exports.toWad = (value) => new bignumber_js_1.default(value).times(constants_1.WAD).toFixed();
exports.bnToBigNumber = (amount) => new bignumber_js_1.default(amount);
exports.stringToBigNumber = (amount) => new bignumber_js_1.default(amount);
exports.getDb = () => lowdb_1.default(new FileSync_1.default('./deployed-contracts.json'));
exports.setDRE = (_DRE) => {
    exports.DRE = _DRE;
};
exports.sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
exports.createRandomAddress = () => ethers_1.Wallet.createRandom().address;
exports.evmSnapshot = async () => await exports.DRE.ethers.provider.send('evm_snapshot', []);
exports.evmRevert = async (id) => exports.DRE.ethers.provider.send('evm_revert', [id]);
exports.timeLatest = async () => {
    const block = await exports.DRE.ethers.provider.getBlock('latest');
    return new bignumber_js_1.default(block.timestamp);
};
exports.advanceBlock = async (timestamp) => await exports.DRE.ethers.provider.send('evm_mine', [timestamp]);
exports.increaseTime = async (secondsToIncrease) => {
    await exports.DRE.ethers.provider.send('evm_increaseTime', [secondsToIncrease]);
    await exports.DRE.ethers.provider.send('evm_mine', []);
};
// Workaround for time travel tests bug: https://github.com/Tonyhaenn/hh-time-travel/blob/0161d993065a0b7585ec5a043af2eb4b654498b8/test/test.js#L12
exports.advanceTimeAndBlock = async function (forwardTime) {
    const currentBlockNumber = await exports.DRE.ethers.provider.getBlockNumber();
    const currentBlock = await exports.DRE.ethers.provider.getBlock(currentBlockNumber);
    if (currentBlock === null) {
        /* Workaround for https://github.com/nomiclabs/hardhat/issues/1183
         */
        await exports.DRE.ethers.provider.send('evm_increaseTime', [forwardTime]);
        await exports.DRE.ethers.provider.send('evm_mine', []);
        //Set the next blocktime back to 15 seconds
        await exports.DRE.ethers.provider.send('evm_increaseTime', [15]);
        return;
    }
    const currentTime = currentBlock.timestamp;
    const futureTime = currentTime + forwardTime;
    await exports.DRE.ethers.provider.send('evm_setNextBlockTimestamp', [futureTime]);
    await exports.DRE.ethers.provider.send('evm_mine', []);
};
exports.waitForTx = async (tx) => await tx.wait(1);
exports.filterMapBy = (raw, fn) => Object.keys(raw)
    .filter(fn)
    .reduce((obj, key) => {
    obj[key] = raw[key];
    return obj;
}, {});
exports.chunk = (arr, chunkSize) => {
    return arr.reduce((prevVal, currVal, currIndx, array) => !(currIndx % chunkSize)
        ? prevVal.concat([array.slice(currIndx, currIndx + chunkSize)])
        : prevVal, []);
};
exports.printContracts = () => {
    const network = exports.DRE.network.name;
    const db = exports.getDb();
    console.log('Contracts deployed at', network);
    console.log('---------------------------------');
    const entries = Object.entries(db.getState()).filter(([_k, value]) => !!value[network]);
    const contractsPrint = entries.map(([key, value]) => `${key}: ${value[network].address}`);
    console.log('N# Contracts:', entries.length);
    console.log(contractsPrint.join('\n'), '\n');
};
exports.notFalsyOrZeroAddress = (address) => {
    if (!address) {
        return false;
    }
    return utils_1.isAddress(address) && !ethereumjs_util_1.isZeroAddress(address);
};
