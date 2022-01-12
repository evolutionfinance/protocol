"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategyBALWETH = exports.strategyYFIWETH = exports.strategyWBTCUSDC = exports.strategyUSDCWETH = exports.strategyUNIWETH = exports.strategySNXWETH = exports.strategyRENWETH = exports.strategyMKRWETH = exports.strategyLINKWETH = exports.strategyCRVWETH = exports.strategyDAIUSDC = exports.strategyBATWETH = exports.strategyAAVEWETH = exports.strategyWBTCWETH = exports.strategyDAIWETH = exports.strategyUSDT = exports.strategyUSDC = exports.strategyDAI = exports.strategyWBTC = exports.strategyWETH = void 0;
const types_1 = require("../../helpers/types");
const rateStrategies_1 = require("./rateStrategies");
exports.strategyWETH = {
    strategy: rateStrategies_1.rateStrategyBaseOne,
    baseLTVAsCollateral: '8000',
    liquidationThreshold: '8250',
    liquidationBonus: '10500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1000'
};
exports.strategyWBTC = {
    strategy: rateStrategies_1.rateStrategyBaseOne,
    baseLTVAsCollateral: '7000',
    liquidationThreshold: '7500',
    liquidationBonus: '11000',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '8',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '2000'
};
exports.strategyDAI = {
    strategy: rateStrategies_1.rateStrategyStable,
    baseLTVAsCollateral: '7500',
    liquidationThreshold: '8000',
    liquidationBonus: '10500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1000'
};
exports.strategyUSDC = {
    strategy: rateStrategies_1.rateStrategyStable,
    baseLTVAsCollateral: '8000',
    liquidationThreshold: '8500',
    liquidationBonus: '10500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '6',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1000'
};
exports.strategyUSDT = {
    strategy: rateStrategies_1.rateStrategyStable,
    baseLTVAsCollateral: '-1',
    liquidationThreshold: '8500',
    liquidationBonus: '10500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '6',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1000'
};
exports.strategyDAIWETH = {
    strategy: rateStrategies_1.rateStrategyAmmBase,
    baseLTVAsCollateral: '6000',
    liquidationThreshold: '7000',
    liquidationBonus: '11500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1000'
};
exports.strategyWBTCWETH = {
    strategy: rateStrategies_1.rateStrategyAmmBase,
    baseLTVAsCollateral: '6000',
    liquidationThreshold: '7000',
    liquidationBonus: '11500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1500'
};
exports.strategyAAVEWETH = {
    strategy: rateStrategies_1.rateStrategyAmmBase,
    baseLTVAsCollateral: '6000',
    liquidationThreshold: '7000',
    liquidationBonus: '11500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '500'
};
exports.strategyBATWETH = {
    strategy: rateStrategies_1.rateStrategyAmmBase,
    baseLTVAsCollateral: '6000',
    liquidationThreshold: '7000',
    liquidationBonus: '11500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1500'
};
exports.strategyDAIUSDC = {
    strategy: rateStrategies_1.rateStrategyAmmBase,
    baseLTVAsCollateral: '6000',
    liquidationThreshold: '7000',
    liquidationBonus: '11500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1000'
};
exports.strategyCRVWETH = {
    strategy: rateStrategies_1.rateStrategyAmmBase,
    baseLTVAsCollateral: '5000',
    liquidationThreshold: '6000',
    liquidationBonus: '11500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1500'
};
exports.strategyLINKWETH = {
    strategy: rateStrategies_1.rateStrategyAmmBase,
    baseLTVAsCollateral: '6000',
    liquidationThreshold: '7000',
    liquidationBonus: '11500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1500'
};
exports.strategyMKRWETH = {
    strategy: rateStrategies_1.rateStrategyAmmBase,
    baseLTVAsCollateral: '6000',
    liquidationThreshold: '7000',
    liquidationBonus: '11500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1500'
};
exports.strategyRENWETH = {
    strategy: rateStrategies_1.rateStrategyAmmBase,
    baseLTVAsCollateral: '6000',
    liquidationThreshold: '7000',
    liquidationBonus: '11500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1500'
};
exports.strategySNXWETH = {
    strategy: rateStrategies_1.rateStrategyAmmBase,
    baseLTVAsCollateral: '4000',
    liquidationThreshold: '6000',
    liquidationBonus: '11500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '2000'
};
exports.strategyUNIWETH = {
    strategy: rateStrategies_1.rateStrategyAmmBase,
    baseLTVAsCollateral: '6000',
    liquidationThreshold: '7000',
    liquidationBonus: '11500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1500'
};
exports.strategyUSDCWETH = {
    strategy: rateStrategies_1.rateStrategyAmmBase,
    baseLTVAsCollateral: '6000',
    liquidationThreshold: '7000',
    liquidationBonus: '11500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1000'
};
exports.strategyWBTCUSDC = {
    strategy: rateStrategies_1.rateStrategyAmmBase,
    baseLTVAsCollateral: '6000',
    liquidationThreshold: '7000',
    liquidationBonus: '11500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1500'
};
exports.strategyYFIWETH = {
    strategy: rateStrategies_1.rateStrategyAmmBase,
    baseLTVAsCollateral: '5000',
    liquidationThreshold: '6000',
    liquidationBonus: '11500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1500'
};
exports.strategyBALWETH = {
    strategy: rateStrategies_1.rateStrategyAmmBase,
    baseLTVAsCollateral: '6000',
    liquidationThreshold: '7000',
    liquidationBonus: '11500',
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    reserveDecimals: '18',
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: '1500'
};
