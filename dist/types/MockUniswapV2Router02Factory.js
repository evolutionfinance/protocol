"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockUniswapV2Router02Factory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class MockUniswapV2Router02Factory extends contracts_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
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
exports.MockUniswapV2Router02Factory = MockUniswapV2Router02Factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
            },
            {
                internalType: "address[]",
                name: "path",
                type: "address[]",
            },
        ],
        name: "getAmountsIn",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
            },
            {
                internalType: "address[]",
                name: "path",
                type: "address[]",
            },
        ],
        name: "getAmountsOut",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "reserveIn",
                type: "address",
            },
            {
                internalType: "address",
                name: "reserveOut",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
            },
        ],
        name: "setAmountIn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "reserveIn",
                type: "address",
            },
            {
                internalType: "address",
                name: "reserveOut",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
            },
        ],
        name: "setAmountOut",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "reserve",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "setAmountToReturn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "reserve",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "setAmountToSwap",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "setDefaultMockValue",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "address[]",
                name: "path",
                type: "address[]",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "swapExactTokensForTokens",
        outputs: [
            {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "address[]",
                name: "path",
                type: "address[]",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "swapTokensForExactTokens",
        outputs: [
            {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50610ddd806100206000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80638803dbee116100665780638803dbee146102505780639da23949146102d9578063d06ca61f14610315578063ee92b8591461038a578063fcaf206c146103a757610093565b80631f00ca741461009857806338ed17391461015d5780635186725f146101e65780635fdcafc814610214575b600080fd5b61010d600480360360408110156100ae57600080fd5b81359190810190604081016020820135600160201b8111156100cf57600080fd5b8201836020820111156100e157600080fd5b803590602001918460208302840111600160201b8311171561010257600080fd5b5090925090506103d3565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610149578181015183820152602001610131565b505050509050019250505060405180910390f35b61010d600480360360a081101561017357600080fd5b813591602081013591810190606081016040820135600160201b81111561019957600080fd5b8201836020820111156101ab57600080fd5b803590602001918460208302840111600160201b831117156101cc57600080fd5b91935091506001600160a01b038135169060200135610588565b610212600480360360408110156101fc57600080fd5b506001600160a01b038135169060200135610890565b005b6102126004803603608081101561022a57600080fd5b508035906001600160a01b036020820135811691604081013590911690606001356108ac565b61010d600480360360a081101561026657600080fd5b813591602081013591810190606081016040820135600160201b81111561028c57600080fd5b82018360208201111561029e57600080fd5b803590602001918460208302840111600160201b831117156102bf57600080fd5b91935091506001600160a01b0381351690602001356108e0565b610212600480360360808110156102ef57600080fd5b508035906001600160a01b03602082013581169160408101359091169060600135610bb0565b61010d6004803603604081101561032b57600080fd5b81359190810190604081016020820135600160201b81111561034c57600080fd5b82018360208201111561035e57600080fd5b803590602001918460208302840111600160201b8311171561037f57600080fd5b509092509050610be4565b610212600480360360208110156103a057600080fd5b5035610d86565b610212600480360360408110156103bd57600080fd5b506001600160a01b038135169060200135610d8b565b6060808267ffffffffffffffff811180156103ed57600080fd5b50604051908082528060200260200182016040528015610417578160200160208202803683370190505b5090506000600260008686600081811061042d57fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b0316815260200190815260200160002060008686600181811061046c57fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b03168152602001908152602001600020600087815260200190815260200160002054116104bb5760045461054e565b60026000858560008181106104cc57fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b0316815260200190815260200160002060008585600181811061050b57fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b031681526020019081526020016000206000868152602001908152602001600020545b8160008151811061055b57fe5b602002602001018181525050848160018151811061057557fe5b6020908102919091010152949350505050565b60608484600081811061059757fe5b604080516323b872dd60e01b8152336004820152306024820152604481018c90529051602092830294909401356001600160a01b0316936323b872dd9350606480830193928290030181600087803b1580156105f257600080fd5b505af1158015610606573d6000803e3d6000fd5b505050506040513d602081101561061c57600080fd5b5085905084600181811061062c57fe5b905060200201356001600160a01b03166001600160a01b031663a0712d686000808888600081811061065a57fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b03168152602001908152602001600020546040518263ffffffff1660e01b815260040180828152602001915050602060405180830381600087803b1580156106c157600080fd5b505af11580156106d5573d6000803e3d6000fd5b505050506040513d60208110156106eb57600080fd5b508590508460018181106106fb57fe5b905060200201356001600160a01b03166001600160a01b031663a9059cbb846000808989600081811061072a57fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b03168152602001908152602001600020546040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b1580156107a157600080fd5b505af11580156107b5573d6000803e3d6000fd5b505050506040513d60208110156107cb57600080fd5b5084905067ffffffffffffffff811180156107e557600080fd5b5060405190808252806020026020018201604052801561080f578160200160208202803683370190505b509050868160008151811061082057fe5b6020026020010181815250506000808686600081811061083c57fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b03168152602001908152602001600020548160018151811061087a57fe5b6020026020010181815250509695505050505050565b6001600160a01b03909116600090815260208190526040902055565b6001600160a01b03928316600090815260036020908152604080832094909516825292835283812094815293909152912055565b6060848460008181106108ef57fe5b905060200201356001600160a01b03166001600160a01b03166323b872dd3330600160008a8a600081811061092057fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b03168152602001908152602001600020546040518463ffffffff1660e01b815260040180846001600160a01b03168152602001836001600160a01b031681526020018281526020019350505050602060405180830381600087803b1580156109a757600080fd5b505af11580156109bb573d6000803e3d6000fd5b505050506040513d60208110156109d157600080fd5b508590508460018181106109e157fe5b905060200201356001600160a01b03166001600160a01b031663a0712d68886040518263ffffffff1660e01b815260040180828152602001915050602060405180830381600087803b158015610a3657600080fd5b505af1158015610a4a573d6000803e3d6000fd5b505050506040513d6020811015610a6057600080fd5b50859050846001818110610a7057fe5b905060200201356001600160a01b03166001600160a01b031663a9059cbb84896040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b158015610ad657600080fd5b505af1158015610aea573d6000803e3d6000fd5b505050506040513d6020811015610b0057600080fd5b5084905067ffffffffffffffff81118015610b1a57600080fd5b50604051908082528060200260200182016040528015610b44578160200160208202803683370190505b5090506001600086866000818110610b5857fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b031681526020019081526020016000205481600081518110610b9657fe5b602002602001018181525050868160018151811061087a57fe5b6001600160a01b03928316600090815260026020908152604080832094909516825292835283812094815293909152912055565b6060808267ffffffffffffffff81118015610bfe57600080fd5b50604051908082528060200260200182016040528015610c28578160200160208202803683370190505b5090508481600081518110610c3957fe5b60200260200101818152505060006003600086866000818110610c5857fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b03168152602001908152602001600020600086866001818110610c9757fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b0316815260200190815260200160002060008781526020019081526020016000205411610ce657600454610d79565b6003600085856000818110610cf757fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b03168152602001908152602001600020600085856001818110610d3657fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b031681526020019081526020016000206000868152602001908152602001600020545b8160018151811061057557fe5b600455565b6001600160a01b0390911660009081526001602052604090205556fea264697066735822122038405d2d1a37a9007719713f9f7e934c32843988a0396ccdf492817ac7cd2c0664736f6c634300060c0033";
