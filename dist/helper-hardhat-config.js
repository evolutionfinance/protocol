"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NETWORKS_DEFAULT_GAS = exports.NETWORKS_RPC_URL = void 0;
// @ts-ignore
const types_1 = require("./helpers/types");
require('dotenv').config();
const INFURA_KEY = process.env.INFURA_KEY || '';
const ALCHEMY_KEY = process.env.ALCHEMY_KEY || '';
const TENDERLY_FORK_ID = process.env.TENDERLY_FORK_ID || '';
const GWEI = 1000 * 1000 * 1000;
exports.NETWORKS_RPC_URL = {
    [types_1.eEthereumNetwork.kovan]: ALCHEMY_KEY
        ? `https://eth-kovan.alchemyapi.io/v2/${ALCHEMY_KEY}`
        : `https://kovan.infura.io/v3/${INFURA_KEY}`,
    [types_1.eEthereumNetwork.ropsten]: ALCHEMY_KEY
        ? `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_KEY}`
        : `https://ropsten.infura.io/v3/${INFURA_KEY}`,
    [types_1.eEthereumNetwork.main]: ALCHEMY_KEY
        ? `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`
        : `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    [types_1.eEthereumNetwork.coverage]: 'http://localhost:8555',
    [types_1.eEthereumNetwork.hardhat]: 'http://localhost:8545',
    [types_1.eEthereumNetwork.buidlerevm]: 'http://localhost:8545',
    [types_1.eEthereumNetwork.tenderlyMain]: `https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}`,
    [types_1.ePolygonNetwork.mumbai]: 'https://rpc-mumbai.maticvigil.com',
    [types_1.ePolygonNetwork.matic]: 'https://rpc-mainnet.matic.network',
    [types_1.eXDaiNetwork.xdai]: 'https://rpc.xdaichain.com/',
};
exports.NETWORKS_DEFAULT_GAS = {
    [types_1.eEthereumNetwork.kovan]: 65 * GWEI,
    [types_1.eEthereumNetwork.ropsten]: 65 * GWEI,
    [types_1.eEthereumNetwork.main]: 65 * GWEI,
    [types_1.eEthereumNetwork.coverage]: 65 * GWEI,
    [types_1.eEthereumNetwork.hardhat]: 65 * GWEI,
    [types_1.eEthereumNetwork.buidlerevm]: 65 * GWEI,
    [types_1.eEthereumNetwork.tenderlyMain]: 0.01 * GWEI,
    [types_1.ePolygonNetwork.mumbai]: 1 * GWEI,
    [types_1.ePolygonNetwork.matic]: 2 * GWEI,
    [types_1.eXDaiNetwork.xdai]: 1 * GWEI,
};
