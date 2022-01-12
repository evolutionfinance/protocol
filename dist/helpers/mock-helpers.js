"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAggregatorsAddresses = exports.getAllTokenAddresses = void 0;
exports.getAllTokenAddresses = (mockTokens) => Object.entries(mockTokens).reduce((accum, [tokenSymbol, tokenContract]) => ({
    ...accum,
    [tokenSymbol]: tokenContract.address,
}), {});
exports.getAllAggregatorsAddresses = (mockAggregators) => Object.entries(mockAggregators).reduce((accum, [tokenSymbol, aggregator]) => ({
    ...accum,
    [tokenSymbol]: aggregator.address,
}), {});
