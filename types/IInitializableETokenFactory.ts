/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IInitializableEToken } from "./IInitializableEToken";

export class IInitializableETokenFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IInitializableEToken {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IInitializableEToken;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "underlyingAsset",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "treasury",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "incentivesController",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "eTokenDecimals",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "eTokenName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "eTokenSymbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "params",
        type: "bytes",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "contract ILendingPool",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "treasury",
        type: "address",
      },
      {
        internalType: "address",
        name: "underlyingAsset",
        type: "address",
      },
      {
        internalType: "contract IEaveIncentivesController",
        name: "incentivesController",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "eTokenDecimals",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "eTokenName",
        type: "string",
      },
      {
        internalType: "string",
        name: "eTokenSymbol",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "params",
        type: "bytes",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
