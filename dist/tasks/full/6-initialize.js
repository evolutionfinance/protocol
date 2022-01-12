"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const contracts_helpers_1 = require("../../helpers/contracts-helpers");
const contracts_deployments_1 = require("../../helpers/contracts-deployments");
const configuration_1 = require("../../helpers/configuration");
const contracts_getters_1 = require("../../helpers/contracts-getters");
const misc_utils_1 = require("../../helpers/misc-utils");
const init_helpers_1 = require("../../helpers/init-helpers");
const process_1 = require("process");
const contracts_getters_2 = require("../../helpers/contracts-getters");
const constants_1 = require("../../helpers/constants");
config_1.task('full:initialize-lending-pool', 'Initialize lending pool configuration.')
    .addFlag('verify', 'Verify contracts at Etherscan')
    .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(configuration_1.ConfigNames)}`)
    .setAction(async ({ verify, pool }, localBRE) => {
    try {
        await localBRE.run('set-DRE');
        const network = localBRE.network.name;
        const poolConfig = configuration_1.loadPoolConfig(pool);
        const { ATokenNamePrefix, StableDebtTokenNamePrefix, VariableDebtTokenNamePrefix, SymbolPrefix, ReserveAssets, ReservesConfig, LendingPoolCollateralManager, WethGateway, } = poolConfig;
        const reserveAssets = await contracts_helpers_1.getParamPerNetwork(ReserveAssets, network);
        const addressesProvider = await contracts_getters_2.getLendingPoolAddressesProvider();
        const testHelpers = await contracts_getters_2.getAaveProtocolDataProvider();
        const admin = await addressesProvider.getPoolAdmin();
        if (!reserveAssets) {
            throw 'Reserve assets is undefined. Check ReserveAssets configuration at config directory';
        }
        const treasuryAddress = await configuration_1.getTreasuryAddress(poolConfig);
        await init_helpers_1.initReservesByHelper(ReservesConfig, reserveAssets, ATokenNamePrefix, StableDebtTokenNamePrefix, VariableDebtTokenNamePrefix, SymbolPrefix, admin, treasuryAddress, constants_1.ZERO_ADDRESS, verify);
        await init_helpers_1.configureReservesByHelper(ReservesConfig, reserveAssets, testHelpers, admin);
        let collateralManagerAddress = await contracts_helpers_1.getParamPerNetwork(LendingPoolCollateralManager, network);
        if (!misc_utils_1.notFalsyOrZeroAddress(collateralManagerAddress)) {
            const collateralManager = await contracts_deployments_1.deployLendingPoolCollateralManager(verify);
            collateralManagerAddress = collateralManager.address;
        }
        // Seems unnecessary to register the collateral manager in the JSON db
        console.log('\tSetting lending pool collateral manager implementation with address', collateralManagerAddress);
        await misc_utils_1.waitForTx(await addressesProvider.setLendingPoolCollateralManager(collateralManagerAddress));
        await contracts_deployments_1.deployWalletBalancerProvider(verify);
        const lendingPoolAddress = await addressesProvider.getLendingPool();
        let gateWay = contracts_helpers_1.getParamPerNetwork(WethGateway, network);
        if (!misc_utils_1.notFalsyOrZeroAddress(gateWay)) {
            gateWay = (await contracts_getters_1.getWETHGateway()).address;
        }
        await contracts_deployments_1.authorizeWETHGateway(gateWay, lendingPoolAddress);
    }
    catch (err) {
        console.error(err);
        process_1.exit(1);
    }
});
