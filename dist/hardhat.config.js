"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// @ts-ignore
const test_wallets_js_1 = require("./test-wallets.js");
const types_1 = require("./helpers/types");
const buidler_constants_1 = require("./helpers/buidler-constants");
const helper_hardhat_config_1 = require("./helper-hardhat-config");
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("temp-hardhat-etherscan");
require("hardhat-gas-reporter");
require("hardhat-typechain");
require("@tenderly/hardhat-tenderly");
const SKIP_LOAD = process.env.SKIP_LOAD === 'true';
const DEFAULT_BLOCK_GAS_LIMIT = 12450000;
const DEFAULT_GAS_MUL = 5;
const HARDFORK = 'istanbul';
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY || '';
const MNEMONIC_PATH = "m/44'/60'/0'/0";
const MNEMONIC = process.env.MNEMONIC || '';
const MAINNET_FORK = process.env.MAINNET_FORK === 'true';
// Prevent to load scripts before compilation and typechain
if (!SKIP_LOAD) {
    ['misc', 'migrations', 'dev', 'full', 'verifications', 'deployments', 'helpers'].forEach((folder) => {
        const tasksPath = path_1.default.join(__dirname, 'tasks', folder);
        fs_1.default.readdirSync(tasksPath)
            .filter((pth) => pth.includes('.ts'))
            .forEach((task) => {
            require(`${tasksPath}/${task}`);
        });
    });
}
require(`${path_1.default.join(__dirname, 'tasks/misc')}/set-bre.ts`);
const getCommonNetworkConfig = (networkName, networkId) => ({
    url: helper_hardhat_config_1.NETWORKS_RPC_URL[networkName],
    hardfork: HARDFORK,
    blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
    gasMultiplier: DEFAULT_GAS_MUL,
    gasPrice: helper_hardhat_config_1.NETWORKS_DEFAULT_GAS[networkName],
    chainId: networkId,
    accounts: {
        mnemonic: MNEMONIC,
        path: MNEMONIC_PATH,
        initialIndex: 0,
        count: 20,
    },
});
const mainnetFork = MAINNET_FORK
    ? {
        blockNumber: 11739065,
        url: helper_hardhat_config_1.NETWORKS_RPC_URL['main'],
    }
    : undefined;
const buidlerConfig = {
    solidity: {
        version: '0.6.12',
        settings: {
            optimizer: { enabled: true, runs: 200 },
            evmVersion: 'istanbul',
        },
    },
    typechain: {
        outDir: 'types',
        target: 'ethers-v5',
    },
    etherscan: {
        apiKey: ETHERSCAN_KEY,
    },
    mocha: {
        timeout: 0,
    },
    tenderly: {
        project: process.env.TENDERLY_PROJECT || '',
        username: process.env.TENDERLY_USERNAME || '',
        forkNetwork: '1',
    },
    networks: {
        coverage: {
            url: 'http://localhost:8555',
            chainId: buidler_constants_1.COVERAGE_CHAINID,
        },
        kovan: getCommonNetworkConfig(types_1.eEthereumNetwork.kovan, 42),
        ropsten: getCommonNetworkConfig(types_1.eEthereumNetwork.ropsten, 3),
        main: getCommonNetworkConfig(types_1.eEthereumNetwork.main, 1),
        tenderlyMain: getCommonNetworkConfig(types_1.eEthereumNetwork.tenderlyMain, 3030),
        matic: getCommonNetworkConfig(types_1.ePolygonNetwork.matic, 137),
        mumbai: getCommonNetworkConfig(types_1.ePolygonNetwork.mumbai, 80001),
        xdai: getCommonNetworkConfig(types_1.eXDaiNetwork.xdai, 100),
        hardhat: {
            hardfork: 'istanbul',
            blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
            gas: DEFAULT_BLOCK_GAS_LIMIT,
            gasPrice: 8000000000,
            chainId: buidler_constants_1.BUIDLEREVM_CHAINID,
            throwOnTransactionFailures: true,
            throwOnCallFailures: true,
            accounts: test_wallets_js_1.accounts.map(({ secretKey, balance }) => ({
                privateKey: secretKey,
                balance,
            })),
            forking: mainnetFork,
        },
        buidlerevm_docker: {
            hardfork: 'istanbul',
            blockGasLimit: 9500000,
            gas: 9500000,
            gasPrice: 8000000000,
            chainId: buidler_constants_1.BUIDLEREVM_CHAINID,
            throwOnTransactionFailures: true,
            throwOnCallFailures: true,
            url: 'http://localhost:8545',
        },
        ganache: {
            url: 'http://ganache:8545',
            accounts: {
                mnemonic: 'fox sight canyon orphan hotel grow hedgehog build bless august weather swarm',
                path: "m/44'/60'/0'/0",
                initialIndex: 0,
                count: 20,
            },
        },
    },
};
exports.default = buidlerConfig;
