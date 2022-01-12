"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategyMATIC = exports.strategyWBTC = exports.strategyWETH = exports.strategyUSDT = exports.strategyUSDC = exports.strategyDAI = void 0;
// import BigNumber from 'bignumber.js';
// import { oneRay } from '../../helpers/constants';
const types_1 = require("../../helpers/types");
const rateStrategies_1 = require("./rateStrategies");
exports.strategyDAI = {
    strategy: rateStrategies_1.rateStrategyStableTwo,
    baseLTVAsCollateral: '7500',
    liquidationThreshold: '8000',
    liquidationBonus: '10500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: true,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1000'
};
exports.strategyUSDC = {
    strategy: rateStrategies_1.rateStrategyStableThree,
    baseLTVAsCollateral: '8000',
    liquidationThreshold: '8500',
    liquidationBonus: '10500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: true,
    reserveDecimals: '6',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1000'
};
exports.strategyUSDT = {
    strategy: rateStrategies_1.rateStrategyStableThree,
    baseLTVAsCollateral: '8000',
    liquidationThreshold: '8500',
    liquidationBonus: '10500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: true,
    reserveDecimals: '6',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1000'
};
exports.strategyWETH = {
    strategy: rateStrategies_1.rateStrategyWETH,
    baseLTVAsCollateral: '8000',
    liquidationThreshold: '8250',
    liquidationBonus: '10500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: true,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1000'
};
exports.strategyWBTC = {
    strategy: rateStrategies_1.rateStrategyVolatileTwo,
    baseLTVAsCollateral: '7000',
    liquidationThreshold: '7500',
    liquidationBonus: '11000',
    borrowingEnabled: true,
    stableBorrowRateEnabled: true,
    reserveDecimals: '8',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '2000'
};
exports.strategyMATIC = {
    strategy: rateStrategies_1.rateStrategyVolatileOne,
    baseLTVAsCollateral: '5000',
    liquidationThreshold: '6500',
    liquidationBonus: '11000',
    borrowingEnabled: true,
    stableBorrowRateEnabled: true,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '2000'
};
