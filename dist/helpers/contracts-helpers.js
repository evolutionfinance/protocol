"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFlashLiquidationAdapterParams = exports.buildRepayAdapterParams = exports.buildLiquiditySwapParams = exports.getSignatureFromTypedData = exports.buildPermitParams = exports.convertToCurrencyUnits = exports.convertToCurrencyDecimals = exports.getParamPerPool = exports.getParamPerNetwork = exports.linkBytecode = exports.getContract = exports.withSaveAndVerify = exports.deployContract = exports.decodeAbiNumber = exports.getCurrentBlock = exports.getEthersSignersAddresses = exports.getEthersSigners = exports.rawInsertContractAddressInDb = exports.insertContractAddressInDb = exports.registerContractInJsonDb = void 0;
const ethers_1 = require("ethers");
const eth_sig_util_1 = require("eth-sig-util");
const ethereumjs_util_1 = require("ethereumjs-util");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const misc_utils_1 = require("./misc-utils");
const types_1 = require("./types");
const etherscan_verification_1 = require("./etherscan-verification");
const contracts_getters_1 = require("./contracts-getters");
const tenderly_utils_1 = require("./tenderly-utils");
exports.registerContractInJsonDb = async (contractId, contractInstance) => {
    const currentNetwork = misc_utils_1.DRE.network.name;
    const MAINNET_FORK = process.env.MAINNET_FORK === 'true';
    if (MAINNET_FORK || (currentNetwork !== 'hardhat' && !currentNetwork.includes('coverage'))) {
        console.log(`*** ${contractId} ***\n`);
        console.log(`Network: ${currentNetwork}`);
        console.log(`tx: ${contractInstance.deployTransaction.hash}`);
        console.log(`contract address: ${contractInstance.address}`);
        console.log(`deployer address: ${contractInstance.deployTransaction.from}`);
        console.log(`gas price: ${contractInstance.deployTransaction.gasPrice}`);
        console.log(`gas used: ${contractInstance.deployTransaction.gasLimit}`);
        console.log(`\n******`);
        console.log();
    }
    await misc_utils_1.getDb()
        .set(`${contractId}.${currentNetwork}`, {
        address: contractInstance.address,
        deployer: contractInstance.deployTransaction.from,
    })
        .write();
};
exports.insertContractAddressInDb = async (id, address) => await misc_utils_1.getDb()
    .set(`${id}.${misc_utils_1.DRE.network.name}`, {
    address,
})
    .write();
exports.rawInsertContractAddressInDb = async (id, address) => await misc_utils_1.getDb()
    .set(`${id}.${misc_utils_1.DRE.network.name}`, {
    address,
})
    .write();
exports.getEthersSigners = async () => await Promise.all(await misc_utils_1.DRE.ethers.getSigners());
exports.getEthersSignersAddresses = async () => await Promise.all((await misc_utils_1.DRE.ethers.getSigners()).map((signer) => signer.getAddress()));
exports.getCurrentBlock = async () => {
    return misc_utils_1.DRE.ethers.provider.getBlockNumber();
};
exports.decodeAbiNumber = (data) => parseInt(ethers_1.utils.defaultAbiCoder.decode(['uint256'], data).toString());
exports.deployContract = async (contractName, args) => {
    const contract = (await (await misc_utils_1.DRE.ethers.getContractFactory(contractName)).deploy(...args));
    await misc_utils_1.waitForTx(contract.deployTransaction);
    await exports.registerContractInJsonDb(contractName, contract);
    return contract;
};
exports.withSaveAndVerify = async (instance, id, args, verify) => {
    await misc_utils_1.waitForTx(instance.deployTransaction);
    await exports.registerContractInJsonDb(id, instance);
    if (tenderly_utils_1.usingTenderly()) {
        console.log();
        console.log('Doing Tenderly contract verification of', id);
        await misc_utils_1.DRE.tenderlyRPC.verify({
            name: id,
            address: instance.address,
        });
        console.log(`Verified ${id} at Tenderly!`);
        console.log();
    }
    if (verify) {
        await etherscan_verification_1.verifyContract(instance.address, args);
    }
    return instance;
};
exports.getContract = async (contractName, address) => (await misc_utils_1.DRE.ethers.getContractAt(contractName, address));
exports.linkBytecode = (artifact, libraries) => {
    let bytecode = artifact.bytecode;
    for (const [fileName, fileReferences] of Object.entries(artifact.linkReferences)) {
        for (const [libName, fixups] of Object.entries(fileReferences)) {
            const addr = libraries[libName];
            if (addr === undefined) {
                continue;
            }
            for (const fixup of fixups) {
                bytecode =
                    bytecode.substr(0, 2 + fixup.start * 2) +
                        addr.substr(2) +
                        bytecode.substr(2 + (fixup.start + fixup.length) * 2);
            }
        }
    }
    return bytecode;
};
exports.getParamPerNetwork = (param, network) => {
    const { main, ropsten, kovan, coverage, buidlerevm, tenderlyMain, } = param;
    const { matic, mumbai } = param;
    const { xdai } = param;
    const MAINNET_FORK = process.env.MAINNET_FORK === 'true';
    if (MAINNET_FORK) {
        return main;
    }
    switch (network) {
        case types_1.eEthereumNetwork.coverage:
            return coverage;
        case types_1.eEthereumNetwork.buidlerevm:
            return buidlerevm;
        case types_1.eEthereumNetwork.hardhat:
            return buidlerevm;
        case types_1.eEthereumNetwork.kovan:
            return kovan;
        case types_1.eEthereumNetwork.ropsten:
            return ropsten;
        case types_1.eEthereumNetwork.main:
            return main;
        case types_1.eEthereumNetwork.tenderlyMain:
            return tenderlyMain;
        case types_1.ePolygonNetwork.matic:
            return matic;
        case types_1.ePolygonNetwork.mumbai:
            return mumbai;
        case types_1.eXDaiNetwork.xdai:
            return xdai;
    }
};
exports.getParamPerPool = ({ proto, amm, matic }, pool) => {
    switch (pool) {
        case types_1.AavePools.proto:
            return proto;
        case types_1.AavePools.amm:
            return amm;
        case types_1.AavePools.matic:
            return matic;
        default:
            return proto;
    }
};
exports.convertToCurrencyDecimals = async (tokenAddress, amount) => {
    const token = await contracts_getters_1.getIErc20Detailed(tokenAddress);
    let decimals = (await token.decimals()).toString();
    return ethers_1.ethers.utils.parseUnits(amount, decimals);
};
exports.convertToCurrencyUnits = async (tokenAddress, amount) => {
    const token = await contracts_getters_1.getIErc20Detailed(tokenAddress);
    let decimals = new bignumber_js_1.default(await token.decimals());
    const currencyUnit = new bignumber_js_1.default(10).pow(decimals);
    const amountInCurrencyUnits = new bignumber_js_1.default(amount).div(currencyUnit);
    return amountInCurrencyUnits.toFixed();
};
exports.buildPermitParams = (chainId, token, revision, tokenName, owner, spender, nonce, deadline, value) => ({
    types: {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
        ],
        Permit: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' },
        ],
    },
    primaryType: 'Permit',
    domain: {
        name: tokenName,
        version: revision,
        chainId: chainId,
        verifyingContract: token,
    },
    message: {
        owner,
        spender,
        value,
        nonce,
        deadline,
    },
});
exports.getSignatureFromTypedData = (privateKey, typedData // TODO: should be TypedData, from eth-sig-utils, but TS doesn't accept it
) => {
    const signature = eth_sig_util_1.signTypedData_v4(Buffer.from(privateKey.substring(2, 66), 'hex'), {
        data: typedData,
    });
    return ethereumjs_util_1.fromRpcSig(signature);
};
exports.buildLiquiditySwapParams = (assetToSwapToList, minAmountsToReceive, swapAllBalances, permitAmounts, deadlines, v, r, s, useEthPath) => {
    return ethers_1.ethers.utils.defaultAbiCoder.encode([
        'address[]',
        'uint256[]',
        'bool[]',
        'uint256[]',
        'uint256[]',
        'uint8[]',
        'bytes32[]',
        'bytes32[]',
        'bool[]',
    ], [
        assetToSwapToList,
        minAmountsToReceive,
        swapAllBalances,
        permitAmounts,
        deadlines,
        v,
        r,
        s,
        useEthPath,
    ]);
};
exports.buildRepayAdapterParams = (collateralAsset, collateralAmount, rateMode, permitAmount, deadline, v, r, s, useEthPath) => {
    return ethers_1.ethers.utils.defaultAbiCoder.encode(['address', 'uint256', 'uint256', 'uint256', 'uint256', 'uint8', 'bytes32', 'bytes32', 'bool'], [collateralAsset, collateralAmount, rateMode, permitAmount, deadline, v, r, s, useEthPath]);
};
exports.buildFlashLiquidationAdapterParams = (collateralAsset, debtAsset, user, debtToCover, useEthPath) => {
    return ethers_1.ethers.utils.defaultAbiCoder.encode(['address', 'address', 'address', 'uint256', 'bool'], [collateralAsset, debtAsset, user, debtToCover, useEthPath]);
};
