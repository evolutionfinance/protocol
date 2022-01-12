"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlashLiquidationAdapter = exports.getUniswapRepayAdapter = exports.getUniswapLiquiditySwapAdapter = exports.getMockUniswapRouter = exports.getAaveOracle = exports.getAddressById = exports.getLendingPoolCollateralManager = exports.getWalletProvider = exports.getLendingPoolCollateralManagerImpl = exports.getLendingPoolConfiguratorImpl = exports.getLendingPoolImpl = exports.getProxy = exports.getSelfdestructTransferMock = exports.getMockStableDebtToken = exports.getMockVariableDebtToken = exports.getMockAToken = exports.getWETHMocked = exports.getWETHGateway = exports.getATokensAndRatesHelper = exports.getStableAndVariableTokensHelper = exports.getGenericLogic = exports.getReserveLogic = exports.getLendingPoolAddressesProviderRegistry = exports.getPairsTokenAggregator = exports.getAllMockedTokens = exports.getMockedTokens = exports.getLendingRateOracle = exports.getMockFlashLoanReceiver = exports.getInterestRateStrategy = exports.getAaveProtocolDataProvider = exports.getIErc20Detailed = exports.getMintableERC20 = exports.getVariableDebtToken = exports.getStableDebtToken = exports.getAToken = exports.getPriceOracle = exports.getLendingPool = exports.getLendingPoolConfiguratorProxy = exports.getLendingPoolAddressesProvider = exports.getFirstSigner = void 0;
const types_1 = require("../types");
const IERC20DetailedFactory_1 = require("../types/IERC20DetailedFactory");
const misc_utils_1 = require("./misc-utils");
const types_2 = require("./types");
exports.getFirstSigner = async () => (await misc_utils_1.DRE.ethers.getSigners())[0];
exports.getLendingPoolAddressesProvider = async (address) => await types_1.LendingPoolAddressesProviderFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.LendingPoolAddressesProvider}.${misc_utils_1.DRE.network.name}`).value())
        .address, await exports.getFirstSigner());
exports.getLendingPoolConfiguratorProxy = async (address) => {
    return await types_1.LendingPoolConfiguratorFactory.connect(address ||
        (await misc_utils_1.getDb().get(`${types_2.eContractid.LendingPoolConfigurator}.${misc_utils_1.DRE.network.name}`).value())
            .address, await exports.getFirstSigner());
};
exports.getLendingPool = async (address) => await types_1.LendingPoolFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.LendingPool}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getPriceOracle = async (address) => await types_1.PriceOracleFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.PriceOracle}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getAToken = async (address) => await types_1.ATokenFactory.connect(address || (await misc_utils_1.getDb().get(`${types_2.eContractid.AToken}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getStableDebtToken = async (address) => await types_1.StableDebtTokenFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.StableDebtToken}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getVariableDebtToken = async (address) => await types_1.VariableDebtTokenFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.VariableDebtToken}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getMintableERC20 = async (address) => await types_1.MintableERC20Factory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.MintableERC20}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getIErc20Detailed = async (address) => await IERC20DetailedFactory_1.IERC20DetailedFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.IERC20Detailed}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getAaveProtocolDataProvider = async (address) => await types_1.AaveProtocolDataProviderFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.AaveProtocolDataProvider}.${misc_utils_1.DRE.network.name}`).value())
        .address, await exports.getFirstSigner());
exports.getInterestRateStrategy = async (address) => await types_1.DefaultReserveInterestRateStrategyFactory.connect(address ||
    (await misc_utils_1.getDb()
        .get(`${types_2.eContractid.DefaultReserveInterestRateStrategy}.${misc_utils_1.DRE.network.name}`)
        .value()).address, await exports.getFirstSigner());
exports.getMockFlashLoanReceiver = async (address) => await types_1.MockFlashLoanReceiverFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.MockFlashLoanReceiver}.${misc_utils_1.DRE.network.name}`).value())
        .address, await exports.getFirstSigner());
exports.getLendingRateOracle = async (address) => await types_1.LendingRateOracleFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.LendingRateOracle}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getMockedTokens = async (config) => {
    const tokenSymbols = Object.keys(config.ReservesConfig);
    const db = misc_utils_1.getDb();
    const tokens = await tokenSymbols.reduce(async (acc, tokenSymbol) => {
        const accumulator = await acc;
        const address = db.get(`${tokenSymbol.toUpperCase()}.${misc_utils_1.DRE.network.name}`).value().address;
        accumulator[tokenSymbol] = await exports.getMintableERC20(address);
        return Promise.resolve(acc);
    }, Promise.resolve({}));
    return tokens;
};
exports.getAllMockedTokens = async () => {
    const db = misc_utils_1.getDb();
    const tokens = await Object.keys(types_2.TokenContractId).reduce(async (acc, tokenSymbol) => {
        const accumulator = await acc;
        const address = db.get(`${tokenSymbol.toUpperCase()}.${misc_utils_1.DRE.network.name}`).value().address;
        accumulator[tokenSymbol] = await exports.getMintableERC20(address);
        return Promise.resolve(acc);
    }, Promise.resolve({}));
    return tokens;
};
exports.getPairsTokenAggregator = (allAssetsAddresses, aggregatorsAddresses) => {
    const { ETH, USD, WETH, ...assetsAddressesWithoutEth } = allAssetsAddresses;
    const pairs = Object.entries(assetsAddressesWithoutEth).map(([tokenSymbol, tokenAddress]) => {
        //if (true/*tokenSymbol !== 'WETH' && tokenSymbol !== 'ETH' && tokenSymbol !== 'LpWETH'*/) {
        const aggregatorAddressIndex = Object.keys(aggregatorsAddresses).findIndex((value) => value === tokenSymbol);
        const [, aggregatorAddress] = Object.entries(aggregatorsAddresses)[aggregatorAddressIndex];
        return [tokenAddress, aggregatorAddress];
        //}
    });
    const mappedPairs = pairs.map(([asset]) => asset);
    const mappedAggregators = pairs.map(([, source]) => source);
    return [mappedPairs, mappedAggregators];
};
exports.getLendingPoolAddressesProviderRegistry = async (address) => await types_1.LendingPoolAddressesProviderRegistryFactory.connect(address ||
    (await misc_utils_1.getDb()
        .get(`${types_2.eContractid.LendingPoolAddressesProviderRegistry}.${misc_utils_1.DRE.network.name}`)
        .value()).address, await exports.getFirstSigner());
exports.getReserveLogic = async (address) => await types_1.ReserveLogicFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.ReserveLogic}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getGenericLogic = async (address) => await types_1.GenericLogicFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.GenericLogic}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getStableAndVariableTokensHelper = async (address) => await types_1.StableAndVariableTokensHelperFactory.connect(address ||
    (await misc_utils_1.getDb()
        .get(`${types_2.eContractid.StableAndVariableTokensHelper}.${misc_utils_1.DRE.network.name}`)
        .value()).address, await exports.getFirstSigner());
exports.getATokensAndRatesHelper = async (address) => await types_1.ATokensAndRatesHelperFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.ATokensAndRatesHelper}.${misc_utils_1.DRE.network.name}`).value())
        .address, await exports.getFirstSigner());
exports.getWETHGateway = async (address) => await types_1.WETHGatewayFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.WETHGateway}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getWETHMocked = async (address) => await types_1.WETH9MockedFactory.connect(address || (await misc_utils_1.getDb().get(`${types_2.eContractid.WETHMocked}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getMockAToken = async (address) => await types_1.MockATokenFactory.connect(address || (await misc_utils_1.getDb().get(`${types_2.eContractid.MockAToken}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getMockVariableDebtToken = async (address) => await types_1.MockVariableDebtTokenFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.MockVariableDebtToken}.${misc_utils_1.DRE.network.name}`).value())
        .address, await exports.getFirstSigner());
exports.getMockStableDebtToken = async (address) => await types_1.MockStableDebtTokenFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.MockStableDebtToken}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getSelfdestructTransferMock = async (address) => await types_1.SelfdestructTransferFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.SelfdestructTransferMock}.${misc_utils_1.DRE.network.name}`).value())
        .address, await exports.getFirstSigner());
exports.getProxy = async (address) => await types_1.InitializableAdminUpgradeabilityProxyFactory.connect(address, await exports.getFirstSigner());
exports.getLendingPoolImpl = async (address) => await types_1.LendingPoolFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.LendingPoolImpl}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getLendingPoolConfiguratorImpl = async (address) => await types_1.LendingPoolConfiguratorFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.LendingPoolConfiguratorImpl}.${misc_utils_1.DRE.network.name}`).value())
        .address, await exports.getFirstSigner());
exports.getLendingPoolCollateralManagerImpl = async (address) => await types_1.LendingPoolCollateralManagerFactory.connect(address ||
    (await misc_utils_1.getDb()
        .get(`${types_2.eContractid.LendingPoolCollateralManagerImpl}.${misc_utils_1.DRE.network.name}`)
        .value()).address, await exports.getFirstSigner());
exports.getWalletProvider = async (address) => await types_1.WalletBalanceProviderFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.WalletBalanceProvider}.${misc_utils_1.DRE.network.name}`).value())
        .address, await exports.getFirstSigner());
exports.getLendingPoolCollateralManager = async (address) => await types_1.LendingPoolCollateralManagerFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.LendingPoolCollateralManager}.${misc_utils_1.DRE.network.name}`).value())
        .address, await exports.getFirstSigner());
exports.getAddressById = async (id) => { var _a; return ((_a = (await misc_utils_1.getDb().get(`${id}.${misc_utils_1.DRE.network.name}`).value())) === null || _a === void 0 ? void 0 : _a.address) || undefined; };
exports.getAaveOracle = async (address) => await types_1.AaveOracleFactory.connect(address || (await misc_utils_1.getDb().get(`${types_2.eContractid.AaveOracle}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getMockUniswapRouter = async (address) => await types_1.MockUniswapV2Router02Factory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.MockUniswapV2Router02}.${misc_utils_1.DRE.network.name}`).value())
        .address, await exports.getFirstSigner());
exports.getUniswapLiquiditySwapAdapter = async (address) => await types_1.UniswapLiquiditySwapAdapterFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.UniswapLiquiditySwapAdapter}.${misc_utils_1.DRE.network.name}`).value())
        .address, await exports.getFirstSigner());
exports.getUniswapRepayAdapter = async (address) => await types_1.UniswapRepayAdapterFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.UniswapRepayAdapter}.${misc_utils_1.DRE.network.name}`).value()).address, await exports.getFirstSigner());
exports.getFlashLiquidationAdapter = async (address) => await types_1.FlashLiquidationAdapterFactory.connect(address ||
    (await misc_utils_1.getDb().get(`${types_2.eContractid.FlashLiquidationAdapter}.${misc_utils_1.DRE.network.name}`).value())
        .address, await exports.getFirstSigner());
