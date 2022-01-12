"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateStrategyStable = exports.rateStrategyBaseOne = exports.rateStrategyAmmBase = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const constants_1 = require("../../helpers/constants");
// DAIWETH WBTCWETH AAVEWETH BATWETH DAIUSDC CRVWETH LINKWETH MKRWETH RENWETH SNXWETH UNIWETH USDCWETH WBTCUSDC YFIWETH
exports.rateStrategyAmmBase = {
    name: "rateStrategyAmmBase",
    optimalUtilizationRate: new bignumber_js_1.default(0.45).multipliedBy(constants_1.oneRay).toFixed(),
    baseVariableBorrowRate: new bignumber_js_1.default(0.03).multipliedBy(constants_1.oneRay).toFixed(),
    variableRateSlope1: new bignumber_js_1.default(0.10).multipliedBy(constants_1.oneRay).toFixed(),
    variableRateSlope2: new bignumber_js_1.default(3.00).multipliedBy(constants_1.oneRay).toFixed(),
    stableRateSlope1: new bignumber_js_1.default(0.1).multipliedBy(constants_1.oneRay).toFixed(),
    stableRateSlope2: new bignumber_js_1.default(3).multipliedBy(constants_1.oneRay).toFixed(),
};
// WETH WBTC
exports.rateStrategyBaseOne = {
    name: "rateStrategyBaseOne",
    optimalUtilizationRate: new bignumber_js_1.default(0.65).multipliedBy(constants_1.oneRay).toFixed(),
    baseVariableBorrowRate: new bignumber_js_1.default(0).multipliedBy(constants_1.oneRay).toFixed(),
    variableRateSlope1: new bignumber_js_1.default(0.08).multipliedBy(constants_1.oneRay).toFixed(),
    variableRateSlope2: new bignumber_js_1.default(1).multipliedBy(constants_1.oneRay).toFixed(),
    stableRateSlope1: new bignumber_js_1.default(0.1).multipliedBy(constants_1.oneRay).toFixed(),
    stableRateSlope2: new bignumber_js_1.default(1).multipliedBy(constants_1.oneRay).toFixed(),
};
// DAI USDC USDT
exports.rateStrategyStable = {
    name: "rateStrategyStable",
    optimalUtilizationRate: new bignumber_js_1.default(0.8).multipliedBy(constants_1.oneRay).toFixed(),
    baseVariableBorrowRate: new bignumber_js_1.default(0).multipliedBy(constants_1.oneRay).toFixed(),
    variableRateSlope1: new bignumber_js_1.default(0.04).multipliedBy(constants_1.oneRay).toFixed(),
    variableRateSlope2: new bignumber_js_1.default(0.75).multipliedBy(constants_1.oneRay).toFixed(),
    stableRateSlope1: new bignumber_js_1.default(0.02).multipliedBy(constants_1.oneRay).toFixed(),
    stableRateSlope2: new bignumber_js_1.default(0.60).multipliedBy(constants_1.oneRay).toFixed(),
};
