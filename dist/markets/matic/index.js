"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaticConfig = void 0;
const types_1 = require("../../helpers/types");
const commons_1 = require("./commons");
const reservesConfigs_1 = require("./reservesConfigs");
// ----------------
// POOL--SPECIFIC PARAMS
// ----------------
exports.MaticConfig = {
    ...commons_1.CommonsConfig,
    MarketId: 'Matic Market',
    ProviderId: 3,
    ReservesConfig: {
        DAI: reservesConfigs_1.strategyDAI,
        USDC: reservesConfigs_1.strategyUSDC,
        USDT: reservesConfigs_1.strategyUSDT,
        WBTC: reservesConfigs_1.strategyWBTC,
        WETH: reservesConfigs_1.strategyWETH,
        WMATIC: reservesConfigs_1.strategyMATIC,
    },
    ReserveAssets: {
        [types_1.ePolygonNetwork.matic]: {
            DAI: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
            USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
            USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
            WBTC: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
            WETH: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
            WMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        },
        [types_1.ePolygonNetwork.mumbai]: {
            DAI: '0x13b3fda609C1eeb23b4F4b69257840760dCa6C4a',
            USDC: '0x52b63223994433FdE2F1350Ba69Dfd2779f06ABA',
            USDT: '0xB3abd1912F586fDFFa13606882c28E27913853d2',
            WBTC: '0x393E3512d45a956A628124665672312ea86930Ba',
            WETH: '0x53CDb16B8C031B779e996406546614E5F05BC4Bf',
            WMATIC: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
        },
    },
};
exports.default = exports.MaticConfig;
