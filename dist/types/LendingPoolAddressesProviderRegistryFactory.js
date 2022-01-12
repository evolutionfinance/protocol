"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LendingPoolAddressesProviderRegistryFactory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class LendingPoolAddressesProviderRegistryFactory extends contracts_1.ContractFactory {
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
exports.LendingPoolAddressesProviderRegistryFactory = LendingPoolAddressesProviderRegistryFactory;
const _abi = [
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
        name: "AddressesProviderRegistered",
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
        name: "AddressesProviderUnregistered",
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
        inputs: [
            {
                internalType: "address",
                name: "addressesProvider",
                type: "address",
            },
        ],
        name: "getAddressesProviderIdByAddress",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getAddressesProvidersList",
        outputs: [
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
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
        inputs: [
            {
                internalType: "address",
                name: "provider",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "registerAddressesProvider",
        outputs: [],
        stateMutability: "nonpayable",
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
    {
        inputs: [
            {
                internalType: "address",
                name: "provider",
                type: "address",
            },
        ],
        name: "unregisterAddressesProvider",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50600061001b61006a565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006e565b3390565b6108698061007d6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80638da5cb5b1161005b5780638da5cb5b1461010a578063d0267be71461012e578063d258191e14610166578063f2fde38b146101925761007d565b80630de2670714610082578063365ccbbf146100aa578063715018a614610102575b600080fd5b6100a86004803603602081101561009857600080fd5b50356001600160a01b03166101b8565b005b6100b2610322565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156100ee5781810151838201526020016100d6565b505050509050019250505060405180910390f35b6100a861046b565b61011261050d565b604080516001600160a01b039092168252519081900360200190f35b6101546004803603602081101561014457600080fd5b50356001600160a01b031661051c565b60408051918252519081900360200190f35b6100a86004803603604081101561017c57600080fd5b506001600160a01b038135169060200135610537565b6100a8600480360360208110156101a857600080fd5b50356001600160a01b0316610651565b6101c0610749565b6000546001600160a01b03908116911614610210576040805162461bcd60e51b81526020600482018190526024820152600080516020610814833981519152604482015290519081900360640190fd5b600060016000836001600160a01b03166001600160a01b03168152602001908152602001600020541160405180604001604052806002815260200161343160f01b815250906102dd5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156102a257818101518382015260200161028a565b50505050905090810190601f1680156102cf5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506001600160a01b038116600081815260016020526040808220829055517f851e5971c053e6b76e3a1e0b8ffa81430df738007fad86e195c409a757faccd29190a250565b606080600280548060200260200160405190810160405280929190818152602001828054801561037b57602002820191906000526020600020905b81546001600160a01b0316815260019091019060200180831161035d575b5050505050905060008151905060608167ffffffffffffffff811180156103a157600080fd5b506040519080825280602002602001820160405280156103cb578160200160208202803683370190505b50905060005b82811015610463576000600160008684815181106103eb57fe5b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002054111561045b5783818151811061042657fe5b602002602001015182828151811061043a57fe5b60200260200101906001600160a01b031690816001600160a01b0316815250505b6001016103d1565b509250505090565b610473610749565b6000546001600160a01b039081169116146104c3576040805162461bcd60e51b81526020600482018190526024820152600080516020610814833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b6001600160a01b031660009081526001602052604090205490565b61053f610749565b6000546001600160a01b0390811691161461058f576040805162461bcd60e51b81526020600482018190526024820152600080516020610814833981519152604482015290519081900360640190fd5b6040805180820190915260028152611b9960f11b6020820152816105f45760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156102a257818101518382015260200161028a565b506001600160a01b03821660009081526001602052604090208190556106198261074d565b6040516001600160a01b038316907f2db38786c10176b033a1608361716b0ca992e3af55dc05b6dc710969790beeda90600090a25050565b610659610749565b6000546001600160a01b039081169116146106a9576040805162461bcd60e51b81526020600482018190526024820152600080516020610814833981519152604482015290519081900360640190fd5b6001600160a01b0381166106ee5760405162461bcd60e51b81526004018080602001828103825260268152602001806107ee6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b60025460005b8181101561079c57826001600160a01b03166002828154811061077257fe5b6000918252602090912001546001600160a01b031614156107945750506107ea565b600101610753565b5050600280546001810182556000919091527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace0180546001600160a01b0319166001600160a01b0383161790555b5056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a264697066735822122028449229e270c38757cefd266a37ac596d145eb7cb558ecc94f768be6eafe61f64736f6c634300060c0033";
