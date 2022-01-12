"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LendingPoolAddressesProviderFactory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class LendingPoolAddressesProviderFactory extends contracts_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(marketId, overrides) {
        return super.deploy(marketId, overrides || {});
    }
    getDeployTransaction(marketId, overrides) {
        return super.getDeployTransaction(marketId, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static connect(address, signerOrProvider) {
        return new contracts_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.LendingPoolAddressesProviderFactory = LendingPoolAddressesProviderFactory;
const _abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "marketId",
                type: "string",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "hasProxy",
                type: "bool",
            },
        ],
        name: "AddressSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newAddress",
                type: "address",
            },
        ],
        name: "ConfigurationAdminUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newAddress",
                type: "address",
            },
        ],
        name: "EmergencyAdminUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newAddress",
                type: "address",
            },
        ],
        name: "LendingPoolCollateralManagerUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newAddress",
                type: "address",
            },
        ],
        name: "LendingPoolConfiguratorUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newAddress",
                type: "address",
            },
        ],
        name: "LendingPoolUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newAddress",
                type: "address",
            },
        ],
        name: "LendingRateOracleUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "newMarketId",
                type: "string",
            },
        ],
        name: "MarketIdSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newAddress",
                type: "address",
            },
        ],
        name: "PriceOracleUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newAddress",
                type: "address",
            },
        ],
        name: "ProxyCreated",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
        ],
        name: "getAddress",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getEmergencyAdmin",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getLendingPool",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getLendingPoolCollateralManager",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getLendingPoolConfigurator",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getLendingRateOracle",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getMarketId",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getPoolAdmin",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getPriceOracle",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "newAddress",
                type: "address",
            },
        ],
        name: "setAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "implementationAddress",
                type: "address",
            },
        ],
        name: "setAddressAsProxy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "emergencyAdmin",
                type: "address",
            },
        ],
        name: "setEmergencyAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "manager",
                type: "address",
            },
        ],
        name: "setLendingPoolCollateralManager",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "configurator",
                type: "address",
            },
        ],
        name: "setLendingPoolConfiguratorImpl",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "pool",
                type: "address",
            },
        ],
        name: "setLendingPoolImpl",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "lendingRateOracle",
                type: "address",
            },
        ],
        name: "setLendingRateOracle",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "marketId",
                type: "string",
            },
        ],
        name: "setMarketId",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "admin",
                type: "address",
            },
        ],
        name: "setPoolAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "priceOracle",
                type: "address",
            },
        ],
        name: "setPriceOracle",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60806040523480156200001157600080fd5b5060405162001dca38038062001dca833981810160405260208110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b506040525050506000620000ff6200015b60201b60201c565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35062000154816200015f565b50620002b0565b3390565b80516200017490600190602084019062000214565b507f5e667c32fd847cf8bce48ab3400175cbf107bdc82b2dea62e3364909dfaee799816040518080602001828103825283818151815260200191508051906020019080838360005b83811015620001d6578181015183820152602001620001bc565b50505050905090810190601f168015620002045780820380516001836020036101000a031916815260200191505b509250505060405180910390a150565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200025757805160ff191683800117855562000287565b8280016001018555821562000287579182015b82811115620002875782518255916020019190600101906200026a565b506200029592915062000299565b5090565b5b808211156200029557600081556001016200029a565b611b0a80620002c06000396000f3fe608060405234801561001057600080fd5b50600436106101425760003560e01c8063715018a6116100b8578063c12542df1161007c578063c12542df14610347578063ca446dd91461036d578063ddcaa9ea14610399578063f2fde38b146103a1578063f67b1847146103c7578063fca513a81461046d57610142565b8063715018a614610301578063820d12741461030957806385c858b11461032f5780638da5cb5b14610337578063aecda3781461033f57610142565b8063398e55531161010a578063398e5553146101de578063530e784f14610204578063568ef4701461022a5780635aef021f146102a75780635dcc528c146102cd578063712d9171146102f957610142565b80630261bf8b1461014757806321f8a7211461016b578063283d62ad1461018857806335da3394146101b05780633618abba146101d6575b600080fd5b61014f610475565b604080516001600160a01b039092168252519081900360200190f35b61014f6004803603602081101561018157600080fd5b5035610494565b6101ae6004803603602081101561019e57600080fd5b50356001600160a01b03166104af565b005b6101ae600480360360208110156101c657600080fd5b50356001600160a01b0316610587565b61014f610664565b6101ae600480360360208110156101f457600080fd5b50356001600160a01b0316610685565b6101ae6004803603602081101561021a57600080fd5b50356001600160a01b0316610765565b61023261083f565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561026c578181015183820152602001610254565b50505050905090810190601f1680156102995780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101ae600480360360208110156102bd57600080fd5b50356001600160a01b03166108d4565b6101ae600480360360408110156102e357600080fd5b50803590602001356001600160a01b031661097c565b61014f610a25565b6101ae610a45565b6101ae6004803603602081101561031f57600080fd5b50356001600160a01b0316610ae7565b61014f610bc8565b61014f610bef565b61014f610bfe565b6101ae6004803603602081101561035d57600080fd5b50356001600160a01b0316610c16565b6101ae6004803603604081101561038357600080fd5b50803590602001356001600160a01b0316610ccb565b61014f610d8c565b6101ae600480360360208110156103b757600080fd5b50356001600160a01b0316610da9565b6101ae600480360360208110156103dd57600080fd5b8101906020810181356401000000008111156103f857600080fd5b82018360208201111561040a57600080fd5b8035906020019184600183028401116401000000008311171561042c57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610ea1945050505050565b61014f610f05565b600061048f6b13115391125391d7d413d3d360a21b610494565b905090565b6000908152600260205260409020546001600160a01b031690565b6104b7610f1f565b6000546001600160a01b03908116911614610507576040805162461bcd60e51b81526020600482018190526024820152600080516020611ab5833981519152604482015290519081900360640190fd5b692827a7a62fa0a226a4a760b11b600090815260026020527f8625fbc469bac10fd11de1d783dcd446542784dbcc535ef64a1da61860fda74c80546001600160a01b0319166001600160a01b03841690811790915560405190917fc20a317155a9e7d84e06b716b4b355d47742ab9f8c5d630e7f556553f582430d91a250565b61058f610f1f565b6000546001600160a01b039081169116146105df576040805162461bcd60e51b81526020600482018190526024820152600080516020611ab5833981519152604482015290519081900360640190fd5b6e22a6a2a923a2a721acafa0a226a4a760891b600090815260026020527f767aa9c986e1d88108b2558f00fbd21b689a0397581446e2e868cd70421026cc80546001600160a01b0319166001600160a01b03841690811790915560405190917fe19673fc861bfeb894cf2d6b7662505497ef31c0f489b742db24ee331082691691a250565b600061048f724c454e44494e475f524154455f4f5241434c4560681b610494565b61068d610f1f565b6000546001600160a01b039081169116146106dd576040805162461bcd60e51b81526020600482018190526024820152600080516020611ab5833981519152604482015290519081900360640190fd5b7121a7a62620aa22a920a62fa6a0a720a3a2a960711b600090815260026020527f65e3f3080e9127c1765503a54b8dbb495249e66169f096dfc87ee63bed17e22c80546001600160a01b0319166001600160a01b03841690811790915560405190917f991888326f0eab3df6084aadb82bee6781b5c9aa75379e8bc50ae8693454163891a250565b61076d610f1f565b6000546001600160a01b039081169116146107bd576040805162461bcd60e51b81526020600482018190526024820152600080516020611ab5833981519152604482015290519081900360640190fd5b6b50524943455f4f5241434c4560a01b600090815260026020527f740f710666bd7a12af42df98311e541e47f7fd33d382d11602457a6d540cbd6380546001600160a01b0319166001600160a01b03841690811790915560405190917fefe8ab924ca486283a79dc604baa67add51afb82af1db8ac386ebbba643cdffd91a250565b60018054604080516020601f600260001961010087891615020190951694909404938401819004810282018101909252828152606093909290918301828280156108ca5780601f1061089f576101008083540402835291602001916108ca565b820191906000526020600020905b8154815290600101906020018083116108ad57829003601f168201915b5050505050905090565b6108dc610f1f565b6000546001600160a01b0390811691161461092c576040805162461bcd60e51b81526020600482018190526024820152600080516020611ab5833981519152604482015290519081900360640190fd5b6109456b13115391125391d7d413d3d360a21b82610f23565b6040516001600160a01b038216907fc4e6c6cdf28d0edbd8bcf071d724d33cc2e7a30be7d06443925656e9cb492aa490600090a250565b610984610f1f565b6000546001600160a01b039081169116146109d4576040805162461bcd60e51b81526020600482018190526024820152600080516020611ab5833981519152604482015290519081900360640190fd5b6109de8282610f23565b604080518381526001602082015281516001600160a01b038416927ff2689d5d5cd0c639e137642cae5d40afced201a1a0327e7ac9358461dc9fff31928290030190a25050565b600061048f7121a7a62620aa22a920a62fa6a0a720a3a2a960711b610494565b610a4d610f1f565b6000546001600160a01b03908116911614610a9d576040805162461bcd60e51b81526020600482018190526024820152600080516020611ab5833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b610aef610f1f565b6000546001600160a01b03908116911614610b3f576040805162461bcd60e51b81526020600482018190526024820152600080516020611ab5833981519152604482015290519081900360640190fd5b724c454e44494e475f524154455f4f5241434c4560681b600090815260026020527f10f0e20294ece4bd93e7a467dbf22ab9ab1740ebd0a532cc53066601e880c0cf80546001600160a01b0319166001600160a01b03841690811790915560405190917f5c29179aba6942020a8a2d38f65de02fb6b7f784e7f049ed3a3cab97621859b591a250565b600061048f782622a72224a723afa827a7a62fa1a7a72324a3aaa920aa27a960391b610494565b6000546001600160a01b031690565b600061048f692827a7a62fa0a226a4a760b11b610494565b610c1e610f1f565b6000546001600160a01b03908116911614610c6e576040805162461bcd60e51b81526020600482018190526024820152600080516020611ab5833981519152604482015290519081900360640190fd5b610c94782622a72224a723afa827a7a62fa1a7a72324a3aaa920aa27a960391b82610f23565b6040516001600160a01b038216907fdfabe479bad36782fb1e77fbfddd4e382671713527e4786cfc93a022ae76372990600090a250565b610cd3610f1f565b6000546001600160a01b03908116911614610d23576040805162461bcd60e51b81526020600482018190526024820152600080516020611ab5833981519152604482015290519081900360640190fd5b600082815260026020908152604080832080546001600160a01b0319166001600160a01b03861690811790915581518681529283019390935280517ff2689d5d5cd0c639e137642cae5d40afced201a1a0327e7ac9358461dc9fff319281900390910190a25050565b600061048f6e22a6a2a923a2a721acafa0a226a4a760891b610494565b610db1610f1f565b6000546001600160a01b03908116911614610e01576040805162461bcd60e51b81526020600482018190526024820152600080516020611ab5833981519152604482015290519081900360640190fd5b6001600160a01b038116610e465760405162461bcd60e51b8152600401808060200182810382526026815260200180611a8f6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b610ea9610f1f565b6000546001600160a01b03908116911614610ef9576040805162461bcd60e51b81526020600482018190526024820152600080516020611ab5833981519152604482015290519081900360640190fd5b610f02816111cb565b50565b600061048f6b50524943455f4f5241434c4560a01b610494565b3390565b6000828152600260209081526040918290205482513060248083019190915284518083039091018152604490910190935290820180516001600160e01b031663189acdbd60e31b1790526001600160a01b0316908190816110f25730604051610f8b9061127b565b6001600160a01b03909116815260405190819003602001906000f080158015610fb8573d6000803e3d6000fd5b509150816001600160a01b031663d1f5789485836040518363ffffffff1660e01b815260040180836001600160a01b0316815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561102757818101518382015260200161100f565b50505050905090810190601f1680156110545780820380516001836020036101000a031916815260200191505b509350505050600060405180830381600087803b15801561107457600080fd5b505af1158015611088573d6000803e3d6000fd5b50505060008681526002602090815260409182902080546001600160a01b0319166001600160a01b038716908117909155825189815292519093507f1eb35cb4b5bbb23d152f3b4016a5a46c37a07ae930ed0956aba951e2311424389281900390910190a26111c4565b816001600160a01b0316634f1ef28685836040518363ffffffff1660e01b815260040180836001600160a01b0316815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561115e578181015183820152602001611146565b50505050905090810190601f16801561118b5780820380516001836020036101000a031916815260200191505b509350505050600060405180830381600087803b1580156111ab57600080fd5b505af11580156111bf573d6000803e3d6000fd5b505050505b5050505050565b80516111de906001906020840190611288565b507f5e667c32fd847cf8bce48ab3400175cbf107bdc82b2dea62e3364909dfaee799816040518080602001828103825283818151815260200191508051906020019080838360005b8381101561123e578181015183820152602001611226565b50505050905090810190601f16801561126b5780820380516001836020036101000a031916815260200191505b509250505060405180910390a150565b6107738061131c83390190565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106112c957805160ff19168380011785556112f6565b828001600101855582156112f6579182015b828111156112f65782518255916020019190600101906112db565b50611302929150611306565b5090565b5b80821115611302576000815560010161130756fe60a060405234801561001057600080fd5b506040516107733803806107738339818101604052602081101561003357600080fd5b5051606081901b6001600160601b0319166080526001600160a01b03166106f36100806000398061022852806102725280610331528061045e528061048752806105af52506106f36000f3fe60806040526004361061004a5760003560e01c80633659cfe6146100545780634f1ef286146100875780635c60da1b14610107578063d1f5789414610138578063f851a440146101ee575b610052610203565b005b34801561006057600080fd5b506100526004803603602081101561007757600080fd5b50356001600160a01b031661021d565b6100526004803603604081101561009d57600080fd5b6001600160a01b0382351691908101906040810160208201356401000000008111156100c857600080fd5b8201836020820111156100da57600080fd5b803590602001918460018302840111640100000000831117156100fc57600080fd5b509092509050610267565b34801561011357600080fd5b5061011c610324565b604080516001600160a01b039092168252519081900360200190f35b6100526004803603604081101561014e57600080fd5b6001600160a01b03823516919081019060408101602082013564010000000081111561017957600080fd5b82018360208201111561018b57600080fd5b803590602001918460018302840111640100000000831117156101ad57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610371945050505050565b3480156101fa57600080fd5b5061011c610451565b61020b6104ab565b61021b6102166104b3565b6104d8565b565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016141561025c57610257816104fc565b610264565b610264610203565b50565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161415610317576102a1836104fc565b6000836001600160a01b031683836040518083838082843760405192019450600093509091505080830381855af49150503d80600081146102fe576040519150601f19603f3d011682016040523d82523d6000602084013e610303565b606091505b505090508061031157600080fd5b5061031f565b61031f610203565b505050565b6000336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156103665761035f6104b3565b905061036e565b61036e610203565b90565b600061037b6104b3565b6001600160a01b03161461038e57600080fd5b6103978261053c565b80511561044d576000826001600160a01b0316826040518082805190602001908083835b602083106103da5780518252601f1990920191602091820191016103bb565b6001836020036101000a038019825116818451168082178552505050505050905001915050600060405180830381855af49150503d806000811461043a576040519150601f19603f3d011682016040523d82523d6000602084013e61043f565b606091505b505090508061031f57600080fd5b5050565b6000336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016141561036657507f000000000000000000000000000000000000000000000000000000000000000061036e565b61021b6105a4565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b3660008037600080366000845af43d6000803e8080156104f7573d6000f35b3d6000fd5b6105058161053c565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b61054581610614565b6105805760405162461bcd60e51b815260040180806020018281038252603b815260200180610683603b913960400191505060405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc55565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016141561060c5760405162461bcd60e51b81526004018080602001828103825260328152602001806106516032913960400191505060405180910390fd5b61021b61021b565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47081811480159061064857508115155b94935050505056fe43616e6e6f742063616c6c2066616c6c6261636b2066756e6374696f6e2066726f6d207468652070726f78792061646d696e43616e6e6f742073657420612070726f787920696d706c656d656e746174696f6e20746f2061206e6f6e2d636f6e74726163742061646472657373a26469706673582212203801682b75a74ce25ca5dbe58739c5b62298b707b9119c9413881c56f29bcfa864736f6c634300060c00334f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a2646970667358221220f13a46c313fb355d6a9419920c6e2fd982efdc1f9b41ed61f3e408eb17ac382764736f6c634300060c0033";
