"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const types_1 = require("../../types");
const etherscan_verification_1 = require("../../helpers/etherscan-verification");
const contracts_getters_1 = require("../../helpers/contracts-getters");
const CONTRACT_NAME = 'UniswapLiquiditySwapAdapter';
config_1.task(`deploy-${CONTRACT_NAME}`, `Deploys the ${CONTRACT_NAME} contract`)
    .addParam('provider', 'Address of the LendingPoolAddressesProvider')
    .addParam('router', 'Address of the uniswap router')
    .addParam('weth', 'Address of the weth token')
    .addFlag('verify', `Verify ${CONTRACT_NAME} contract via Etherscan API.`)
    .setAction(async ({ provider, router, weth, verify }, localBRE) => {
    await localBRE.run('set-DRE');
    if (!localBRE.network.config.chainId) {
        throw new Error('INVALID_CHAIN_ID');
    }
    console.log(`\n- ${CONTRACT_NAME} deployment`);
    /*const args = [
      '0x88757f2f99175387aB4C6a4b3067c77A695b0349', // lending  provider kovan address
      '0xfcd87315f0e4067070ade8682fcdbc3006631441', // uniswap router address
    ];
    */
    const uniswapRepayAdapter = await new types_1.UniswapLiquiditySwapAdapterFactory(await contracts_getters_1.getFirstSigner()).deploy(provider, router, weth);
    await uniswapRepayAdapter.deployTransaction.wait();
    console.log(`${CONTRACT_NAME}.address`, uniswapRepayAdapter.address);
    await etherscan_verification_1.verifyContract(uniswapRepayAdapter.address, [provider, router, weth]);
    console.log(`\tFinished ${CONTRACT_NAME} proxy and implementation deployment`);
});
