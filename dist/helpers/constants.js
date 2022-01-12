"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOCK_CHAINLINK_AGGREGATORS_PRICES = exports.AAVE_REFERRAL = exports.USD_ADDRESS = exports.MOCK_USD_PRICE_IN_WEI = exports.TOKEN_DISTRIBUTOR_PERCENTAGE_BASE = exports.APPROVAL_AMOUNT_LENDING_POOL = exports.EXCESS_UTILIZATION_RATE = exports.OPTIMAL_UTILIZATION_RATE = exports.ONE_ADDRESS = exports.ZERO_ADDRESS = exports.ONE_YEAR = exports.MAX_UINT_AMOUNT = exports.oneRay = exports.oneEther = exports.WAD_RAY_RATIO = exports.HALF_RAY = exports.RAY = exports.HALF_WAD = exports.WAD = exports.HALF_PERCENTAGE = exports.PERCENTAGE_FACTOR = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
// ----------------
// MATH
// ----------------
exports.PERCENTAGE_FACTOR = '10000';
exports.HALF_PERCENTAGE = '5000';
exports.WAD = Math.pow(10, 18).toString();
exports.HALF_WAD = new bignumber_js_1.default(exports.WAD).multipliedBy(0.5).toString();
exports.RAY = new bignumber_js_1.default(10).exponentiatedBy(27).toFixed();
exports.HALF_RAY = new bignumber_js_1.default(exports.RAY).multipliedBy(0.5).toFixed();
exports.WAD_RAY_RATIO = Math.pow(10, 9).toString();
exports.oneEther = new bignumber_js_1.default(Math.pow(10, 18));
exports.oneRay = new bignumber_js_1.default(Math.pow(10, 27));
exports.MAX_UINT_AMOUNT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
exports.ONE_YEAR = '31536000';
exports.ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
exports.ONE_ADDRESS = '0x0000000000000000000000000000000000000001';
// ----------------
// PROTOCOL GLOBAL PARAMS
// ----------------
exports.OPTIMAL_UTILIZATION_RATE = new bignumber_js_1.default(0.8).times(exports.RAY);
exports.EXCESS_UTILIZATION_RATE = new bignumber_js_1.default(0.2).times(exports.RAY);
exports.APPROVAL_AMOUNT_LENDING_POOL = '1000000000000000000000000000';
exports.TOKEN_DISTRIBUTOR_PERCENTAGE_BASE = '10000';
exports.MOCK_USD_PRICE_IN_WEI = '5848466240000000';
exports.USD_ADDRESS = '0x10F7Fc1F91Ba351f9C629c5947AD69bD03C05b96';
exports.AAVE_REFERRAL = '0';
exports.MOCK_CHAINLINK_AGGREGATORS_PRICES = {
    AAVE: exports.oneEther.multipliedBy('0.003620948469').toFixed(),
    BAT: exports.oneEther.multipliedBy('0.00137893825230').toFixed(),
    BUSD: exports.oneEther.multipliedBy('0.00736484').toFixed(),
    DAI: exports.oneEther.multipliedBy('0.00369068412860').toFixed(),
    ENJ: exports.oneEther.multipliedBy('0.00029560').toFixed(),
    KNC: exports.oneEther.multipliedBy('0.001072').toFixed(),
    LINK: exports.oneEther.multipliedBy('0.009955').toFixed(),
    MANA: exports.oneEther.multipliedBy('0.000158').toFixed(),
    MKR: exports.oneEther.multipliedBy('2.508581').toFixed(),
    REN: exports.oneEther.multipliedBy('0.00065133').toFixed(),
    SNX: exports.oneEther.multipliedBy('0.00442616').toFixed(),
    SUSD: exports.oneEther.multipliedBy('0.00364714136416').toFixed(),
    TUSD: exports.oneEther.multipliedBy('0.00364714136416').toFixed(),
    UNI: exports.oneEther.multipliedBy('0.00536479').toFixed(),
    USDC: exports.oneEther.multipliedBy('0.00367714136416').toFixed(),
    USDT: exports.oneEther.multipliedBy('0.00369068412860').toFixed(),
    WETH: exports.oneEther.toFixed(),
    WBTC: exports.oneEther.multipliedBy('47.332685').toFixed(),
    YFI: exports.oneEther.multipliedBy('22.407436').toFixed(),
    ZRX: exports.oneEther.multipliedBy('0.001151').toFixed(),
    UniDAIWETH: exports.oneEther.multipliedBy('22.407436').toFixed(),
    UniWBTCWETH: exports.oneEther.multipliedBy('22.407436').toFixed(),
    UniAAVEWETH: exports.oneEther.multipliedBy('0.003620948469').toFixed(),
    UniBATWETH: exports.oneEther.multipliedBy('22.407436').toFixed(),
    UniDAIUSDC: exports.oneEther.multipliedBy('22.407436').toFixed(),
    UniCRVWETH: exports.oneEther.multipliedBy('22.407436').toFixed(),
    UniLINKWETH: exports.oneEther.multipliedBy('0.009955').toFixed(),
    UniMKRWETH: exports.oneEther.multipliedBy('22.407436').toFixed(),
    UniRENWETH: exports.oneEther.multipliedBy('22.407436').toFixed(),
    UniSNXWETH: exports.oneEther.multipliedBy('22.407436').toFixed(),
    UniUNIWETH: exports.oneEther.multipliedBy('22.407436').toFixed(),
    UniUSDCWETH: exports.oneEther.multipliedBy('22.407436').toFixed(),
    UniWBTCUSDC: exports.oneEther.multipliedBy('22.407436').toFixed(),
    UniYFIWETH: exports.oneEther.multipliedBy('22.407436').toFixed(),
    BptWBTCWETH: exports.oneEther.multipliedBy('22.407436').toFixed(),
    BptBALWETH: exports.oneEther.multipliedBy('22.407436').toFixed(),
    WMATIC: exports.oneEther.multipliedBy('0.003620948469').toFixed(),
    STAKE: exports.oneEther.multipliedBy('0.003620948469').toFixed(),
    xSUSHI: exports.oneEther.multipliedBy('0.00913428586').toFixed(),
    USD: '5848466240000000',
};
