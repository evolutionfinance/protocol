"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployAllMockAggregators = exports.deployMockAggregators = exports.setAssetPricesInOracle = exports.setInitialAssetPricesInOracle = exports.setInitialMarketRatesInRatesOracleByHelper = void 0;
const contracts_deployments_1 = require("./contracts-deployments");
const misc_utils_1 = require("./misc-utils");
const contracts_getters_1 = require("./contracts-getters");
exports.setInitialMarketRatesInRatesOracleByHelper = async (marketRates, assetsAddresses, lendingRateOracleInstance, admin) => {
    const stableAndVariableTokenHelper = await contracts_getters_1.getStableAndVariableTokensHelper();
    const assetAddresses = [];
    const borrowRates = [];
    const symbols = [];
    for (const [assetSymbol, { borrowRate }] of Object.entries(marketRates)) {
        const assetAddressIndex = Object.keys(assetsAddresses).findIndex((value) => value === assetSymbol);
        const [, assetAddress] = Object.entries(assetsAddresses)[assetAddressIndex];
        assetAddresses.push(assetAddress);
        borrowRates.push(borrowRate);
        symbols.push(assetSymbol);
    }
    // Set borrow rates per chunks
    const ratesChunks = 20;
    const chunkedTokens = misc_utils_1.chunk(assetAddresses, ratesChunks);
    const chunkedRates = misc_utils_1.chunk(borrowRates, ratesChunks);
    const chunkedSymbols = misc_utils_1.chunk(symbols, ratesChunks);
    // Set helper as owner
    await misc_utils_1.waitForTx(await lendingRateOracleInstance.transferOwnership(stableAndVariableTokenHelper.address));
    console.log(`- Oracle borrow initalization in ${chunkedTokens.length} txs`);
    for (let chunkIndex = 0; chunkIndex < chunkedTokens.length; chunkIndex++) {
        const tx3 = await misc_utils_1.waitForTx(await stableAndVariableTokenHelper.setOracleBorrowRates(chunkedTokens[chunkIndex], chunkedRates[chunkIndex], lendingRateOracleInstance.address));
        console.log(`  - Setted Oracle Borrow Rates for: ${chunkedSymbols[chunkIndex].join(', ')}`);
    }
    // Set back ownership
    await misc_utils_1.waitForTx(await stableAndVariableTokenHelper.setOracleOwnership(lendingRateOracleInstance.address, admin));
};
exports.setInitialAssetPricesInOracle = async (prices, assetsAddresses, priceOracleInstance) => {
    for (const [assetSymbol, price] of Object.entries(prices)) {
        console.log("Trying for ", assetsAddresses, assetSymbol);
        const assetAddressIndex = Object.keys(assetsAddresses).findIndex((value) => value === assetSymbol);
        const [, assetAddress] = Object.entries(assetsAddresses)[assetAddressIndex];
        await misc_utils_1.waitForTx(await priceOracleInstance.setAssetPrice(assetAddress, price));
    }
};
exports.setAssetPricesInOracle = async (prices, assetsAddresses, priceOracleInstance) => {
    for (const [assetSymbol, price] of Object.entries(prices)) {
        const assetAddressIndex = Object.keys(assetsAddresses).findIndex((value) => value === assetSymbol);
        const [, assetAddress] = Object.entries(assetsAddresses)[assetAddressIndex];
        await misc_utils_1.waitForTx(await priceOracleInstance.setAssetPrice(assetAddress, price));
    }
};
exports.deployMockAggregators = async (initialPrices, verify) => {
    const aggregators = {};
    for (const tokenContractName of Object.keys(initialPrices)) {
        if (tokenContractName !== 'ETH') {
            const priceIndex = Object.keys(initialPrices).findIndex((value) => value === tokenContractName);
            const [, price] = Object.entries(initialPrices)[priceIndex];
            aggregators[tokenContractName] = await contracts_deployments_1.deployMockAggregator(price, verify);
        }
    }
    return aggregators;
};
exports.deployAllMockAggregators = async (initialPrices, verify) => {
    const aggregators = {};
    for (const tokenContractName of Object.keys(initialPrices)) {
        if (tokenContractName !== 'ETH') {
            const priceIndex = Object.keys(initialPrices).findIndex((value) => value === tokenContractName);
            const [, price] = Object.entries(initialPrices)[priceIndex];
            aggregators[tokenContractName] = await contracts_deployments_1.deployMockAggregator(price, verify);
        }
    }
    return aggregators;
};
