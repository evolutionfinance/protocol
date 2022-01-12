"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLendingRateOracles = exports.getWethAddress = exports.getATokenDomainSeparatorPerNetwork = exports.getTreasuryAddress = exports.getEmergencyAdmin = exports.getGenesisPoolAdmin = exports.getReservesConfigByPool = exports.loadPoolConfig = exports.ConfigNames = void 0;
const types_1 = require("./types");
const contracts_helpers_1 = require("./contracts-helpers");
const aave_1 = __importDefault(require("../markets/aave"));
const matic_1 = __importDefault(require("../markets/matic"));
const amm_1 = __importDefault(require("../markets/amm"));
const commons_1 = require("../markets/aave/commons");
const misc_utils_1 = require("./misc-utils");
const contracts_helpers_2 = require("./contracts-helpers");
const contracts_deployments_1 = require("./contracts-deployments");
var ConfigNames;
(function (ConfigNames) {
    ConfigNames["Commons"] = "Commons";
    ConfigNames["Aave"] = "Aave";
    ConfigNames["Matic"] = "Matic";
    ConfigNames["Amm"] = "Amm";
})(ConfigNames = exports.ConfigNames || (exports.ConfigNames = {}));
exports.loadPoolConfig = (configName) => {
    switch (configName) {
        case ConfigNames.Aave:
            return aave_1.default;
        case ConfigNames.Matic:
            return matic_1.default;
        case ConfigNames.Amm:
            return amm_1.default;
        case ConfigNames.Commons:
            return commons_1.CommonsConfig;
        default:
            throw new Error(`Unsupported pool configuration: ${Object.values(ConfigNames)}`);
    }
};
// ----------------
// PROTOCOL PARAMS PER POOL
// ----------------
exports.getReservesConfigByPool = (pool) => contracts_helpers_1.getParamPerPool({
    [types_1.AavePools.proto]: {
        ...aave_1.default.ReservesConfig,
    },
    [types_1.AavePools.amm]: {
        ...amm_1.default.ReservesConfig,
    },
    [types_1.AavePools.matic]: {
        ...matic_1.default.ReservesConfig,
    },
}, pool);
exports.getGenesisPoolAdmin = async (config) => {
    const currentNetwork = process.env.MAINNET_FORK === 'true' ? 'main' : misc_utils_1.DRE.network.name;
    const targetAddress = contracts_helpers_2.getParamPerNetwork(config.PoolAdmin, currentNetwork);
    if (targetAddress) {
        return targetAddress;
    }
    const addressList = await Promise.all((await misc_utils_1.DRE.ethers.getSigners()).map((signer) => signer.getAddress()));
    const addressIndex = config.PoolAdminIndex;
    return addressList[addressIndex];
};
exports.getEmergencyAdmin = async (config) => {
    const currentNetwork = process.env.MAINNET_FORK === 'true' ? 'main' : misc_utils_1.DRE.network.name;
    const targetAddress = contracts_helpers_2.getParamPerNetwork(config.EmergencyAdmin, currentNetwork);
    if (targetAddress) {
        return targetAddress;
    }
    const addressList = await Promise.all((await misc_utils_1.DRE.ethers.getSigners()).map((signer) => signer.getAddress()));
    const addressIndex = config.EmergencyAdminIndex;
    return addressList[addressIndex];
};
exports.getTreasuryAddress = async (config) => {
    const currentNetwork = process.env.MAINNET_FORK === 'true' ? 'main' : misc_utils_1.DRE.network.name;
    return contracts_helpers_2.getParamPerNetwork(config.ReserveFactorTreasuryAddress, currentNetwork);
};
exports.getATokenDomainSeparatorPerNetwork = (network, config) => contracts_helpers_2.getParamPerNetwork(config.ATokenDomainSeparator, network);
exports.getWethAddress = async (config) => {
    const currentNetwork = process.env.MAINNET_FORK === 'true' ? 'main' : misc_utils_1.DRE.network.name;
    const wethAddress = contracts_helpers_2.getParamPerNetwork(config.WETH, currentNetwork);
    if (wethAddress) {
        return wethAddress;
    }
    if (currentNetwork.includes('main')) {
        throw new Error('WETH not set at mainnet configuration.');
    }
    const weth = await contracts_deployments_1.deployWETHMocked();
    return weth.address;
};
exports.getLendingRateOracles = (poolConfig) => {
    const { ProtocolGlobalParams: { UsdAddress }, LendingRateOracleRatesCommon, ReserveAssets, } = poolConfig;
    const MAINNET_FORK = process.env.MAINNET_FORK === 'true';
    const network = MAINNET_FORK ? 'main' : misc_utils_1.DRE.network.name;
    return misc_utils_1.filterMapBy(LendingRateOracleRatesCommon, (key) => Object.keys(ReserveAssets[network]).includes(key));
};
