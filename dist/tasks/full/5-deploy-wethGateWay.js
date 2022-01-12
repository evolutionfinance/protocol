"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const contracts_helpers_1 = require("../../helpers/contracts-helpers");
const configuration_1 = require("../../helpers/configuration");
const contracts_deployments_1 = require("../../helpers/contracts-deployments");
const CONTRACT_NAME = 'WETHGateway';
config_1.task(`full-deploy-weth-gateway`, `Deploys the ${CONTRACT_NAME} contract`)
    .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(configuration_1.ConfigNames)}`)
    .addFlag('verify', `Verify ${CONTRACT_NAME} contract via Etherscan API.`)
    .setAction(async ({ verify, pool }, localBRE) => {
    await localBRE.run('set-DRE');
    const network = localBRE.network.name;
    const poolConfig = configuration_1.loadPoolConfig(pool);
    const Weth = await configuration_1.getWethAddress(poolConfig);
    const { WethGateway } = poolConfig;
    if (!localBRE.network.config.chainId) {
        throw new Error('INVALID_CHAIN_ID');
    }
    let gateWay = contracts_helpers_1.getParamPerNetwork(WethGateway, network);
    if (gateWay === '') {
        const wethGateWay = await contracts_deployments_1.deployWETHGateway([Weth], verify);
        console.log(`${CONTRACT_NAME}.address`, wethGateWay.address);
        console.log(`\tFinished ${CONTRACT_NAME} deployment`);
    }
    else {
        console.log(`Weth gateway already deployed. Address: ${gateWay}`);
    }
});
