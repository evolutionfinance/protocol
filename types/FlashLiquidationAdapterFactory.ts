/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { FlashLiquidationAdapter } from "./FlashLiquidationAdapter";

export class FlashLiquidationAdapterFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    addressesProvider: string,
    uniswapRouter: string,
    wethAddress: string,
    overrides?: Overrides
  ): Promise<FlashLiquidationAdapter> {
    return super.deploy(
      addressesProvider,
      uniswapRouter,
      wethAddress,
      overrides || {}
    ) as Promise<FlashLiquidationAdapter>;
  }
  getDeployTransaction(
    addressesProvider: string,
    uniswapRouter: string,
    wethAddress: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      addressesProvider,
      uniswapRouter,
      wethAddress,
      overrides || {}
    );
  }
  attach(address: string): FlashLiquidationAdapter {
    return super.attach(address) as FlashLiquidationAdapter;
  }
  connect(signer: Signer): FlashLiquidationAdapterFactory {
    return super.connect(signer) as FlashLiquidationAdapterFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FlashLiquidationAdapter {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as FlashLiquidationAdapter;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ILendingPoolAddressesProvider",
        name: "addressesProvider",
        type: "address",
      },
      {
        internalType: "contract IUniswapV2Router02",
        name: "uniswapRouter",
        type: "address",
      },
      {
        internalType: "address",
        name: "wethAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
        indexed: false,
        internalType: "address",
        name: "fromAsset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "toAsset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fromAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "receivedAmount",
        type: "uint256",
      },
    ],
    name: "Swapped",
    type: "event",
  },
  {
    inputs: [],
    name: "ADDRESSES_PROVIDER",
    outputs: [
      {
        internalType: "contract ILendingPoolAddressesProvider",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "FLASHLOAN_PREMIUM_TOTAL",
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
    name: "LENDING_POOL",
    outputs: [
      {
        internalType: "contract ILendingPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_SLIPPAGE_PERCENT",
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
    name: "ORACLE",
    outputs: [
      {
        internalType: "contract IPriceOracleGetter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNISWAP_ROUTER",
    outputs: [
      {
        internalType: "contract IUniswapV2Router02",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USD_ADDRESS",
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
    name: "WETH_ADDRESS",
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
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "premiums",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "initiator",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "params",
        type: "bytes",
      },
    ],
    name: "executeOperation",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
        internalType: "address",
        name: "reserveIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "reserveOut",
        type: "address",
      },
    ],
    name: "getAmountsIn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
    ],
    name: "getAmountsOut",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
    ],
    name: "rescueTokens",
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

const _bytecode =
  "0x6101206040523480156200001257600080fd5b5060405162002ce938038062002ce98339810160408190526200003591620001fd565b82828282806001600160a01b03166080816001600160a01b031660601b81525050806001600160a01b0316630261bf8b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156200009057600080fd5b505afa158015620000a5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000cb9190620001d7565b60601b6001600160601b03191660a052506000620000e8620001d3565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350826001600160a01b031663fca513a86040518163ffffffff1660e01b815260040160206040518083038186803b1580156200016c57600080fd5b505afa15801562000181573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001a79190620001d7565b6001600160601b0319606091821b811660e05292811b8316610100521b1660c052506200026992505050565b3390565b600060208284031215620001e9578081fd5b8151620001f68162000250565b9392505050565b60008060006060848603121562000212578182fd5b83516200021f8162000250565b6020850151909350620002328162000250565b6040850151909250620002458162000250565b809150509250925092565b6001600160a01b03811681146200026657600080fd5b50565b60805160601c60a05160601c60c05160601c60e05160601c6101005160601c6129d262000317600039806106235280610f645280611058528061155a528061158f52806117235280611b605280611c515250806103845280611d9b5250806103315280610e3e5280610e7b5280610ee5528061160d5280611a3a5280611a775280611ae1525080610441528061059e52806108c352806109565280610b9652508061035552506129d26000f3fe608060405234801561001057600080fd5b50600436106100f45760003560e01c80638da5cb5b11610097578063baf7fa9911610066578063baf7fa9914610199578063cdf58cd6146101bd578063d8264920146101d0578063f2fde38b146101d8576100f4565b80638da5cb5b14610161578063920f5c84146101695780639d1211bf14610189578063b4dcfc7714610191576100f4565b8063074b2e43116100d3578063074b2e431461013457806332e4b2861461014957806338013f0214610151578063715018a614610159576100f4565b8062ae3bf8146100f9578063040141e51461010e5780630542975c1461012c575b600080fd5b61010c6101073660046121da565b6101eb565b005b61011661032f565b60405161012391906124e7565b60405180910390f35b610116610353565b61013c610377565b604051610123919061286f565b61013c61037c565b610116610382565b61010c6103a6565b610116610425565b61017c610177366004612260565b610434565b604051610123919061258b565b610116610584565b61011661059c565b6101ac6101a7366004612426565b6105c0565b6040516101239594939291906128cd565b6101ac6101cb366004612426565b610606565b610116610621565b61010c6101e63660046121da565b610645565b6101f36106fb565b6000546001600160a01b039081169116146102295760405162461bcd60e51b815260040161022090612736565b60405180910390fd5b806001600160a01b031663a9059cbb610240610425565b6040516370a0823160e01b81526001600160a01b038516906370a082319061026c9030906004016124e7565b60206040518083038186803b15801561028457600080fd5b505afa158015610298573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102bc919061240e565b6040518363ffffffff1660e01b81526004016102d9929190612572565b602060405180830381600087803b1580156102f357600080fd5b505af1158015610307573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032b91906123f2565b5050565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b600981565b610bb881565b7f000000000000000000000000000000000000000000000000000000000000000081565b6103ae6106fb565b6000546001600160a01b039081169116146103db5760405162461bcd60e51b815260040161022090612736565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b6000336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461047e5760405162461bcd60e51b8152600401610220906125c9565b6104866120ef565b6104c584848080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506106ff92505050565b905060018a14801561050d575080602001516001600160a01b03168b8b60008181106104ed57fe5b905060200201602081019061050291906121da565b6001600160a01b0316145b6105295760405162461bcd60e51b81526004016102209061276b565b610573816000015182602001518360400151846060015185608001518e8e600081811061055257fe5b905060200201358d8d600081811061056657fe5b905060200201358c610765565b5060019a9950505050505050505050565b7310f7fc1f91ba351f9c629c5947ad69bd03c05b9681565b7f000000000000000000000000000000000000000000000000000000000000000081565b60008060008060606105d061211d565b6105db88888b610cac565b8051602082015160408301516060840151608090940151929d919c509a509198509650945050505050565b600080600080606061061661211d565b6105db88888b611269565b7f000000000000000000000000000000000000000000000000000000000000000081565b61064d6106fb565b6000546001600160a01b0390811691161461067a5760405162461bcd60e51b815260040161022090612736565b6001600160a01b0381166106a05760405162461bcd60e51b815260040161022090612600565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b6107076120ef565b60008060008060008680602001905181019061072391906121f6565b6040805160a0810182526001600160a01b0396871681529486166020860152929094169183019190915260608201529015156080820152979650505050505050565b61076d61214c565b6040516370a0823160e01b81526001600160a01b038a16906370a08231906107999030906004016124e7565b60206040518083038186803b1580156107b157600080fd5b505afa1580156107c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e9919061240e565b60408201526001600160a01b0389811690891614610890576040516370a0823160e01b81526001600160a01b038916906370a082319061082d9030906004016124e7565b60206040518083038186803b15801561084557600080fd5b505afa158015610859573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061087d919061240e565b80825261088a9085611443565b60e08201525b61089a848461148e565b608082015260405163095ea7b360e01b81526001600160a01b0389169063095ea7b3906108ed907f0000000000000000000000000000000000000000000000000000000000000000908a90600401612572565b602060405180830381600087803b15801561090757600080fd5b505af115801561091b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061093f91906123f2565b5060405162a718a960e01b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169062a718a990610993908c908c908c908c90600090600401612515565b600060405180830381600087803b1580156109ad57600080fd5b505af11580156109c1573d6000803e3d6000fd5b50506040516370a0823160e01b8152600092506001600160a01b038c1691506370a08231906109f49030906004016124e7565b60206040518083038186803b158015610a0c57600080fd5b505afa158015610a20573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a44919061240e565b9050610a5d82604001518261144390919063ffffffff16565b60608301526001600160a01b038a8116908a1614610b58576040516370a0823160e01b81526000906001600160a01b038b16906370a0823190610aa49030906004016124e7565b60206040518083038186803b158015610abc57600080fd5b505afa158015610ad0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610af4919061240e565b9050610b0d8360e001518261144390919063ffffffff16565b6020840181905260608401516080850151610b38928e928e929091610b329190611443565b8b6114b3565b60a084018190526060840151610b4d91611443565b60c084015250610b6d565b6060820151610b679085611443565b60c08301525b608082015160405163095ea7b360e01b81526001600160a01b038b169163095ea7b391610bbe917f000000000000000000000000000000000000000000000000000000000000000091600401612572565b602060405180830381600087803b158015610bd857600080fd5b505af1158015610bec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c1091906123f2565b5060c082015115610ca05760c082015160405163a9059cbb60e01b81526001600160a01b038c169163a9059cbb91610c4c918791600401612572565b602060405180830381600087803b158015610c6657600080fd5b505af1158015610c7a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c9e91906123f2565b505b50505050505050505050565b610cb461211d565b6000610cd7610cd0612710610cca866009611847565b90611881565b8490611443565b9050836001600160a01b0316856001600160a01b03161415610da3576000610cfe866118c3565b60408051600180825281830190925291925060609190602080830190803683370190505090508681600081518110610d3257fe5b6001600160a01b039092166020928302919091018201526040805160a08101909152848152908101610d7087610cca87670de0b6b3a7640000611847565b8152602001610d8089888661193f565b8152602001610d9089868661193f565b8152602001828152509350505050611262565b60408051600280825260608083018452926020830190803683370190505090508581600081518110610dd157fe5b60200260200101906001600160a01b031690816001600160a01b0316815250508481600181518110610dff57fe5b6001600160a01b0392909216602092830291909101820152604080516003808252608082019092526060928392839291820183803683370190505090507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316896001600160a01b031614158015610eb057507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316886001600160a01b031614155b1561101c578881600081518110610ec357fe5b60200260200101906001600160a01b031690816001600160a01b0316815250507f000000000000000000000000000000000000000000000000000000000000000081600181518110610f1157fe5b60200260200101906001600160a01b031690816001600160a01b0316815250508781600281518110610f3f57fe5b6001600160a01b03928316602091820292909201015260405163d06ca61f60e01b81527f00000000000000000000000000000000000000000000000000000000000000009091169063d06ca61f90610f9d9088908590600401612878565b60006040518083038186803b158015610fb557600080fd5b505afa925050508015610fea57506040513d6000823e601f3d908101601f19168201604052610fe7919081019061235d565b60015b61101457604080516003808252608082019092529060208201606080368337019050509150611017565b91505b61103e565b6040805160038082526080820190925290602082016060803683370190505091505b60405163d06ca61f60e01b81526000906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063d06ca61f9061108f9089908990600401612878565b60006040518083038186803b1580156110a757600080fd5b505afa9250505080156110dc57506040513d6000823e601f3d908101601f191682016040526110d9919081019061235d565b60015b61111c5760408051600280825260608201835290916020830190803683370190505093508260028151811061110d57fe5b60200260200101519050611182565b8094508460018151811061112c57fe5b60200260200101518460028151811061114157fe5b602002602001015111611168578460018151811061115b57fe5b602002602001015161117e565b8360028151811061117557fe5b60200260200101515b9150505b600061118d8b6118c3565b9050600061119a8b6118c3565b905060006111cf6111af85600a86900a611847565b610cca600a85900a6111c98d670de0b6b3a7640000611847565b90611847565b90506040518060a001604052808581526020018281526020016111f38f8e8761193f565b81526020016112038e878661193f565b81526020018515611236578860018151811061121b57fe5b6020026020010151861461122f5786611231565b895b611254565b60408051600280825260608201835290916020830190803683375050505b905299505050505050505050505b9392505050565b61127161211d565b826001600160a01b0316846001600160a01b031614156113475760006112a86112a1612710610cca866009611847565b849061148e565b905060006112b5866118c3565b604080516001808252818301909252919250606091906020808301908036833701905050905086816000815181106112e957fe5b6001600160a01b039092166020928302919091018201526040805160a0810190915284815290810161132785610cca89670de0b6b3a7640000611847565b815260200161133789868661193f565b8152602001610d9089888661193f565b606080611355868686611998565b9150915060006113af61138c612710610cca60098760008151811061137657fe5b602002602001015161184790919063ffffffff16565b8460008151811061139957fe5b602002602001015161148e90919063ffffffff16565b905060006113bc886118c3565b905060006113c9886118c3565b905060006113f86113de85600a85900a611847565b610cca600a86900a6111c98c670de0b6b3a7640000611847565b90506040518060a0016040528085815260200182815260200161141c8c878761193f565b815260200161142c8b8b8661193f565b815260200195909552509298975050505050505050565b600061148583836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250611d55565b90505b92915050565b6000828201838110156114855760405162461bcd60e51b815260040161022090612646565b6000806114bf876118c3565b905060006114cc876118c3565b905060006114d989611d81565b905060006114e689611d81565b9050600061152a6114fb612710610bb861148e565b61152461150c86600a89900a611847565b610cca61151d87600a8c900a611847565b8d90611847565b90611e20565b905080891061154b5760405162461bcd60e51b8152600401610220906126b2565b6115806001600160a01b038c167f00000000000000000000000000000000000000000000000000000000000000006000611e92565b6115b46001600160a01b038c167f00000000000000000000000000000000000000000000000000000000000000008b611e92565b6060871561168c576040805160038082526080820190925290602082016060803683370190505090508b816000815181106115eb57fe5b60200260200101906001600160a01b031690816001600160a01b0316815250507f00000000000000000000000000000000000000000000000000000000000000008160018151811061163957fe5b60200260200101906001600160a01b031690816001600160a01b0316815250508a8160028151811061166757fe5b60200260200101906001600160a01b031690816001600160a01b031681525050611709565b60408051600280825260608201835290916020830190803683370190505090508b816000815181106116ba57fe5b60200260200101906001600160a01b031690816001600160a01b0316815250508a816001815181106116e857fe5b60200260200101906001600160a01b031690816001600160a01b0316815250505b604051634401edf760e11b81526060906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690638803dbee90611760908d908f90879030904290600401612891565b600060405180830381600087803b15801561177a57600080fd5b505af115801561178e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526117b6919081019061235d565b90507fa078c4190abe07940190effc1846be0ccf03ad6007bc9e93f9697d0b460befbb8d8d836000815181106117e857fe5b60200260200101518460018651038151811061180057fe5b60200260200101516040516118189493929190612549565b60405180910390a18060008151811061182d57fe5b602002602001015197505050505050505095945050505050565b60008261185657506000611488565b8282028284828161186357fe5b04146114855760405162461bcd60e51b8152600401610220906126f5565b600061148583836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250611f91565b6000816001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156118fe57600080fd5b505afa158015611912573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119369190612467565b60ff1692915050565b60008061195f7310f7fc1f91ba351f9c629c5947ad69bd03c05b96611d81565b9050600061196c86611d81565b905061198e670de0b6b3a7640000610cca846111c9600a89900a838b88611847565b9695505050505050565b60408051600280825260608281019093528291829181602001602082028036833701905050905085816000815181106119cd57fe5b60200260200101906001600160a01b031690816001600160a01b03168152505084816001815181106119fb57fe5b6001600160a01b0392909216602092830291909101820152604080516003808252608082019092526060928392839291820183803683370190505090507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316896001600160a01b031614158015611aac57507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316886001600160a01b031614155b15611c18578881600081518110611abf57fe5b60200260200101906001600160a01b031690816001600160a01b0316815250507f000000000000000000000000000000000000000000000000000000000000000081600181518110611b0d57fe5b60200260200101906001600160a01b031690816001600160a01b0316815250508781600281518110611b3b57fe5b6001600160a01b0392831660209182029290920101526040516307c0329d60e21b81527f000000000000000000000000000000000000000000000000000000000000000090911690631f00ca7490611b99908a908590600401612878565b60006040518083038186803b158015611bb157600080fd5b505afa925050508015611be657506040513d6000823e601f3d908101601f19168201604052611be3919081019061235d565b60015b611c1057604080516003808252608082019092529060208201606080368337019050509150611c13565b91505b611c3a565b6040805160038082526080820190925290602082016060803683370190505091505b6040516307c0329d60e21b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690631f00ca7490611c88908a908890600401612878565b60006040518083038186803b158015611ca057600080fd5b505afa925050508015611cd557506040513d6000823e601f3d908101601f19168201604052611cd2919081019061235d565b60015b611ce6579094509250611d4d915050565b80935083600081518110611cf657fe5b602002602001015183600081518110611d0b57fe5b6020026020010151108015611d35575082600081518110611d2857fe5b6020026020010151600014155b611d40578385611d43565b82825b9650965050505050505b935093915050565b60008184841115611d795760405162461bcd60e51b81526004016102209190612596565b505050900390565b60405163b3596f0760e01b81526000906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063b3596f0790611dd09085906004016124e7565b60206040518083038186803b158015611de857600080fd5b505afa158015611dfc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611488919061240e565b6000821580611e2d575081155b15611e3a57506000611488565b816113881981611e4657fe5b0483111560405180604001604052806002815260200161068760f31b81525090611e835760405162461bcd60e51b81526004016102209190612596565b50506127109102611388010490565b801580611f1a5750604051636eb1769f60e11b81526001600160a01b0384169063dd62ed3e90611ec890309086906004016124fb565b60206040518083038186803b158015611ee057600080fd5b505afa158015611ef4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f18919061240e565b155b611f365760405162461bcd60e51b8152600401610220906127e2565b611f8c8363095ea7b360e01b8484604051602401611f55929190612572565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152611fc8565b505050565b60008183611fb25760405162461bcd60e51b81526004016102209190612596565b506000838581611fbe57fe5b0495945050505050565b611fda826001600160a01b03166120b3565b611ff65760405162461bcd60e51b815260040161022090612838565b60006060836001600160a01b03168360405161201291906124cb565b6000604051808303816000865af19150503d806000811461204f576040519150601f19603f3d011682016040523d82523d6000602084013e612054565b606091505b5091509150816120765760405162461bcd60e51b81526004016102209061267d565b8051156120ad578080602001905181019061209191906123f2565b6120ad5760405162461bcd60e51b815260040161022090612798565b50505050565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4708181148015906120e757508115155b949350505050565b6040805160a08101825260008082526020820181905291810182905260608101829052608081019190915290565b6040518060a0016040528060008152602001600081526020016000815260200160008152602001606081525090565b60405180610100016040528060008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b60008083601f8401126121a2578182fd5b50813567ffffffffffffffff8111156121b9578182fd5b60208301915083602080830285010111156121d357600080fd5b9250929050565b6000602082840312156121eb578081fd5b813561148581612976565b600080600080600060a0868803121561220d578081fd5b855161221881612976565b602087015190955061222981612976565b604087015190945061223a81612976565b6060870151608088015191945092506122528161298e565b809150509295509295909350565b600080600080600080600080600060a08a8c03121561227d578384fd5b893567ffffffffffffffff80821115612294578586fd5b6122a08d838e01612191565b909b50995060208c01359150808211156122b8578586fd5b6122c48d838e01612191565b909950975060408c01359150808211156122dc578586fd5b6122e88d838e01612191565b909750955060608c013591506122fd82612976565b90935060808b01359080821115612312578384fd5b818c0191508c601f830112612325578384fd5b813581811115612333578485fd5b8d6020828501011115612344578485fd5b6020830194508093505050509295985092959850929598565b6000602080838503121561236f578182fd5b825167ffffffffffffffff811115612385578283fd5b8301601f81018513612395578283fd5b80516123a86123a38261292a565b612903565b81815283810190838501858402850186018910156123c4578687fd5b8694505b838510156123e65780518352600194909401939185019185016123c8565b50979650505050505050565b600060208284031215612403578081fd5b81516114858161298e565b60006020828403121561241f578081fd5b5051919050565b60008060006060848603121561243a578283fd5b83359250602084013561244c81612976565b9150604084013561245c81612976565b809150509250925092565b600060208284031215612478578081fd5b815160ff81168114611485578182fd5b6000815180845260208085019450808401835b838110156124c05781516001600160a01b03168752958201959082019060010161249b565b509495945050505050565b600082516124dd81846020870161294a565b9190910192915050565b6001600160a01b0391909116815260200190565b6001600160a01b0392831681529116602082015260400190565b6001600160a01b03958616815293851660208501529190931660408301526060820192909252901515608082015260a00190565b6001600160a01b0394851681529290931660208301526040820152606081019190915260800190565b6001600160a01b03929092168252602082015260400190565b901515815260200190565b60006020825282518060208401526125b581604085016020870161294a565b601f01601f19169190910160400192915050565b6020808252601b908201527f43414c4c45525f4d5553545f42455f4c454e44494e475f504f4f4c0000000000604082015260600190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b6020808252601b908201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604082015260600190565b6020808252818101527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564604082015260600190565b60208082526023908201527f6d6178416d6f756e74546f5377617020657863656564206d617820736c69707060408201526261676560e81b606082015260800190565b60208082526021908201527f536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f6040820152607760f81b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b602080825260139082015272494e434f4e53495354454e545f504152414d5360681b604082015260600190565b6020808252602a908201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6040820152691bdd081cdd58d8d9595960b21b606082015260800190565b60208082526036908201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60408201527520746f206e6f6e2d7a65726f20616c6c6f77616e636560501b606082015260800190565b6020808252601f908201527f5361666545524332303a2063616c6c20746f206e6f6e2d636f6e747261637400604082015260600190565b90815260200190565b6000838252604060208301526120e76040830184612488565b600086825285602083015260a060408301526128b060a0830186612488565b6001600160a01b0394909416606083015250608001529392505050565b600086825285602083015284604083015283606083015260a060808301526128f860a0830184612488565b979650505050505050565b60405181810167ffffffffffffffff8111828210171561292257600080fd5b604052919050565b600067ffffffffffffffff821115612940578081fd5b5060209081020190565b60005b8381101561296557818101518382015260200161294d565b838111156120ad5750506000910152565b6001600160a01b038116811461298b57600080fd5b50565b801515811461298b57600080fdfea2646970667358221220e261022a7f0287faa086648456ce7016cf6246a8714fb43de8c875914e31419d64736f6c634300060c0033";
