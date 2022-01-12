"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const contracts_helpers_1 = require("../../helpers/contracts-helpers");
const configuration_1 = require("../../helpers/configuration");
const types_1 = require("../../helpers/types");
const misc_utils_1 = require("../../helpers/misc-utils");
const init_helpers_1 = require("../../helpers/init-helpers");
const process_1 = require("process");
const contracts_getters_1 = require("../../helpers/contracts-getters");
const utils_1 = require("ethers/lib/utils");
config_1.task('full:initialize-tokens', 'Initialize lending pool configuration.')
    .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(configuration_1.ConfigNames)}`)
    .addParam('ratesDeployer', `RatesHelper address `)
    .addParam('dataProvider', `Data provider address`)
    .addFlag('verify')
    .setAction(async ({ verify, pool, dataProvider, ratesDeployer }, DRE) => {
    try {
        await DRE.run('set-DRE');
        let signer;
        const network = process.env.MAINNET_FORK === 'true' ? types_1.eEthereumNetwork.main : DRE.network.name;
        const poolConfig = configuration_1.loadPoolConfig(pool);
        const { ReserveAssets, ReservesConfig } = poolConfig;
        const reserveAssets = await contracts_helpers_1.getParamPerNetwork(ReserveAssets, network);
        const treasuryAddress = await configuration_1.getTreasuryAddress(poolConfig);
        const providerRegistryAddress = contracts_helpers_1.getParamPerNetwork(poolConfig.ProviderRegistry, network);
        const providerRegistryOwner = contracts_helpers_1.getParamPerNetwork(poolConfig.ProviderRegistryOwner, network);
        const providerRegistry = await contracts_getters_1.getLendingPoolAddressesProviderRegistry(providerRegistryAddress);
        const providers = await providerRegistry.getAddressesProvidersList();
        const addressesProvider = await contracts_getters_1.getLendingPoolAddressesProvider(providers[0]); // Checks first provider
        const admin = await addressesProvider.getPoolAdmin();
        if (!reserveAssets) {
            throw 'Reserve assets is undefined. Check ReserveAssets configuration at config directory';
        }
        if (process.env.MAINNET_FORK === 'true') {
            await DRE.network.provider.request({
                method: 'hardhat_impersonateAccount',
                params: [providerRegistryOwner],
            });
            signer = DRE.ethers.provider.getSigner(providerRegistryOwner);
            const user = await contracts_getters_1.getFirstSigner();
            await misc_utils_1.waitForTx(await user.sendTransaction({ to: await signer.getAddress(), value: utils_1.parseEther('10') }));
            const balance = await signer.getBalance();
            console.log('signer balance', utils_1.formatEther(balance));
        }
        else {
            signer = DRE.ethers.provider.getSigner(providerRegistryOwner);
        }
        // Init unitilialized reserves
        await init_helpers_1.initTokenReservesByHelper(ReservesConfig, reserveAssets, admin, addressesProvider.address, ratesDeployer, dataProvider, signer, treasuryAddress, verify);
        // Show contracts state
        await DRE.run('print-config', {
            pool: 'Aave',
            dataProvider,
        });
    }
    catch (err) {
        console.error(err);
        process_1.exit(1);
    }
});
