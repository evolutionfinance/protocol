"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const contracts_helpers_1 = require("../../helpers/contracts-helpers");
const contracts_deployments_1 = require("../../helpers/contracts-deployments");
const misc_utils_1 = require("../../helpers/misc-utils");
const configuration_1 = require("../../helpers/configuration");
const contracts_getters_1 = require("../../helpers/contracts-getters");
const utils_1 = require("ethers/lib/utils");
const ethereumjs_util_1 = require("ethereumjs-util");
//import BigNumber from 'bignumber.js';
config_1.task('full:deploy-address-provider', 'Deploy address provider, registry and fee provider for dev enviroment')
    .addFlag('verify', 'Verify contracts at Etherscan')
    .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(configuration_1.ConfigNames)}`)
    .setAction(async ({ verify, pool }, DRE) => {
    await DRE.run('set-DRE');
    let signer;
    const network = DRE.network.name;
    const poolConfig = configuration_1.loadPoolConfig(pool);
    const { ProviderId, MarketId } = poolConfig;
    const providerRegistryAddress = contracts_helpers_1.getParamPerNetwork(poolConfig.ProviderRegistry, network);
    const providerRegistryOwner = contracts_helpers_1.getParamPerNetwork(poolConfig.ProviderRegistryOwner, network);
    if (!providerRegistryAddress ||
        !utils_1.isAddress(providerRegistryAddress) ||
        ethereumjs_util_1.isZeroAddress(providerRegistryAddress)) {
        throw Error('config.ProviderRegistry is missing or is not an address.');
    }
    if (!providerRegistryOwner ||
        !utils_1.isAddress(providerRegistryOwner) ||
        ethereumjs_util_1.isZeroAddress(providerRegistryOwner)) {
        throw Error('config.ProviderRegistryOwner is missing or is not an address.');
    }
    // Checks if deployer address is registry owner
    if (process.env.MAINNET_FORK === 'true') {
        await DRE.network.provider.request({
            method: 'hardhat_impersonateAccount',
            params: [providerRegistryOwner],
        });
        signer = DRE.ethers.provider.getSigner(providerRegistryOwner);
        const firstAccount = await contracts_getters_1.getFirstSigner();
        await firstAccount.sendTransaction({ value: utils_1.parseEther('10'), to: providerRegistryOwner });
    }
    else {
        signer = DRE.ethers.provider.getSigner(providerRegistryOwner);
    }
    // 1. Address Provider Registry instance
    const addressesProviderRegistry = (await contracts_getters_1.getLendingPoolAddressesProviderRegistry(providerRegistryAddress)).connect(signer);
    console.log('Registry Address', addressesProviderRegistry.address);
    // 2. Deploy address provider and set genesis manager
    const addressesProvider = await contracts_deployments_1.deployLendingPoolAddressesProvider(MarketId, verify);
    // DISABLE SEC. 3 FOR GOVERNANCE USE!
    // 3. Set the provider at the Registry
    await misc_utils_1.waitForTx(await addressesProviderRegistry.registerAddressesProvider(addressesProvider.address, ProviderId));
    // 4. Set pool admins
    await misc_utils_1.waitForTx(await addressesProvider.setPoolAdmin(await configuration_1.getGenesisPoolAdmin(poolConfig)));
    await misc_utils_1.waitForTx(await addressesProvider.setEmergencyAdmin(await configuration_1.getEmergencyAdmin(poolConfig)));
    console.log('Pool Admin', await addressesProvider.getPoolAdmin());
    console.log('Emergency Admin', await addressesProvider.getEmergencyAdmin());
});
