"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const configuration_1 = require("../../helpers/configuration");
const marketConfigs = __importStar(require("../../markets/aave"));
const reserveConfigs = __importStar(require("../../markets/aave/reservesConfigs"));
const init_helpers_1 = require("../../helpers/init-helpers");
const contracts_getters_1 = require("./../../helpers/contracts-getters");
const contracts_deployments_1 = require("./../../helpers/contracts-deployments");
const misc_utils_1 = require("../../helpers/misc-utils");
const constants_1 = require("./../../helpers/constants");
const LENDING_POOL_ADDRESS_PROVIDER = {
    main: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
    kovan: '0x652B2937Efd0B5beA1c8d54293FC1289672AFC6b',
};
const isSymbolValid = (symbol, network) => Object.keys(reserveConfigs).includes('strategy' + symbol) &&
    marketConfigs.AaveConfig.ReserveAssets[network][symbol] &&
    marketConfigs.AaveConfig.ReservesConfig[symbol] === reserveConfigs['strategy' + symbol];
config_1.task('external:deploy-new-asset', 'Deploy A token, Debt Tokens, Risk Parameters')
    .addParam('symbol', `Asset symbol, needs to have configuration ready`)
    .addFlag('verify', 'Verify contracts at Etherscan')
    .setAction(async ({ verify, symbol }, localBRE) => {
    const network = localBRE.network.name;
    if (!isSymbolValid(symbol, network)) {
        throw new Error(`
WRONG RESERVE ASSET SETUP:
        The symbol ${symbol} has no reserve Config and/or reserve Asset setup.
        update /markets/aave/index.ts and add the asset address for ${network} network
        update /markets/aave/reservesConfigs.ts and add parameters for ${symbol}
        `);
    }
    misc_utils_1.setDRE(localBRE);
    const strategyParams = reserveConfigs['strategy' + symbol];
    const reserveAssetAddress = marketConfigs.AaveConfig.ReserveAssets[localBRE.network.name][symbol];
    const deployCustomAToken = init_helpers_1.chooseATokenDeployment(strategyParams.aTokenImpl);
    const addressProvider = await contracts_getters_1.getLendingPoolAddressesProvider(LENDING_POOL_ADDRESS_PROVIDER[network]);
    const poolAddress = await addressProvider.getLendingPool();
    const treasuryAddress = await configuration_1.getTreasuryAddress(marketConfigs.AaveConfig);
    const aToken = await deployCustomAToken([
        poolAddress,
        reserveAssetAddress,
        treasuryAddress,
        constants_1.ZERO_ADDRESS,
        `Aave interest bearing ${symbol}`,
        `a${symbol}`,
    ], verify);
    const stableDebt = await contracts_deployments_1.deployStableDebtToken([
        poolAddress,
        reserveAssetAddress,
        constants_1.ZERO_ADDRESS,
        `Aave stable debt bearing ${symbol}`,
        `stableDebt${symbol}`,
    ], verify);
    const variableDebt = await contracts_deployments_1.deployVariableDebtToken([
        poolAddress,
        reserveAssetAddress,
        constants_1.ZERO_ADDRESS,
        `Aave variable debt bearing ${symbol}`,
        `variableDebt${symbol}`,
    ], verify);
    const rates = await contracts_deployments_1.deployDefaultReserveInterestRateStrategy([
        addressProvider.address,
        strategyParams.optimalUtilizationRate,
        strategyParams.baseVariableBorrowRate,
        strategyParams.variableRateSlope1,
        strategyParams.variableRateSlope2,
        strategyParams.stableRateSlope1,
        strategyParams.stableRateSlope2,
    ], verify);
    console.log(`
    New interest bearing asset deployed on ${network}:
    Interest bearing a${symbol} address: ${aToken.address}
    Variable Debt variableDebt${symbol} address: ${variableDebt.address}
    Stable Debt stableDebt${symbol} address: ${stableDebt.address}
    Strategy Implementation for ${symbol} address: ${rates.address}
    `);
});
