/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface EvolutionOracleInterface extends ethers.utils.Interface {
  functions: {
    "WETH()": FunctionFragment;
    "getAssetPrice(address)": FunctionFragment;
    "getAssetsPrices(address[])": FunctionFragment;
    "getFallbackOracle()": FunctionFragment;
    "getSourceOfAsset(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setAssetSources(address[],address[])": FunctionFragment;
    "setFallbackOracle(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "WETH", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getAssetPrice",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getAssetsPrices",
    values: [string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getFallbackOracle",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getSourceOfAsset",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAssetSources",
    values: [string[], string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setFallbackOracle",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "WETH", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAssetPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAssetsPrices",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFallbackOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSourceOfAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAssetSources",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFallbackOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "AssetSourceUpdated(address,address)": EventFragment;
    "FallbackOracleUpdated(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "WethSet(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AssetSourceUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FallbackOracleUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WethSet"): EventFragment;
}

export class EvolutionOracle extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: EvolutionOracleInterface;

  functions: {
    WETH(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "WETH()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    getAssetPrice(
      asset: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "getAssetPrice(address)"(
      asset: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    getAssetsPrices(
      assets: string[],
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber[];
    }>;

    "getAssetsPrices(address[])"(
      assets: string[],
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber[];
    }>;

    getFallbackOracle(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "getFallbackOracle()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    getSourceOfAsset(
      asset: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "getSourceOfAsset(address)"(
      asset: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    owner(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "owner()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    setAssetSources(
      assets: string[],
      sources: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setAssetSources(address[],address[])"(
      assets: string[],
      sources: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setFallbackOracle(
      fallbackOracle: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setFallbackOracle(address)"(
      fallbackOracle: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  WETH(overrides?: CallOverrides): Promise<string>;

  "WETH()"(overrides?: CallOverrides): Promise<string>;

  getAssetPrice(asset: string, overrides?: CallOverrides): Promise<BigNumber>;

  "getAssetPrice(address)"(
    asset: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAssetsPrices(
    assets: string[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "getAssetsPrices(address[])"(
    assets: string[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getFallbackOracle(overrides?: CallOverrides): Promise<string>;

  "getFallbackOracle()"(overrides?: CallOverrides): Promise<string>;

  getSourceOfAsset(asset: string, overrides?: CallOverrides): Promise<string>;

  "getSourceOfAsset(address)"(
    asset: string,
    overrides?: CallOverrides
  ): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  setAssetSources(
    assets: string[],
    sources: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setAssetSources(address[],address[])"(
    assets: string[],
    sources: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setFallbackOracle(
    fallbackOracle: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setFallbackOracle(address)"(
    fallbackOracle: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    WETH(overrides?: CallOverrides): Promise<string>;

    "WETH()"(overrides?: CallOverrides): Promise<string>;

    getAssetPrice(asset: string, overrides?: CallOverrides): Promise<BigNumber>;

    "getAssetPrice(address)"(
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAssetsPrices(
      assets: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "getAssetsPrices(address[])"(
      assets: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getFallbackOracle(overrides?: CallOverrides): Promise<string>;

    "getFallbackOracle()"(overrides?: CallOverrides): Promise<string>;

    getSourceOfAsset(asset: string, overrides?: CallOverrides): Promise<string>;

    "getSourceOfAsset(address)"(
      asset: string,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    setAssetSources(
      assets: string[],
      sources: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    "setAssetSources(address[],address[])"(
      assets: string[],
      sources: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    setFallbackOracle(
      fallbackOracle: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setFallbackOracle(address)"(
      fallbackOracle: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    AssetSourceUpdated(
      asset: string | null,
      source: string | null
    ): EventFilter;

    FallbackOracleUpdated(fallbackOracle: string | null): EventFilter;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;

    WethSet(weth: string | null): EventFilter;
  };

  estimateGas: {
    WETH(overrides?: CallOverrides): Promise<BigNumber>;

    "WETH()"(overrides?: CallOverrides): Promise<BigNumber>;

    getAssetPrice(asset: string, overrides?: CallOverrides): Promise<BigNumber>;

    "getAssetPrice(address)"(
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAssetsPrices(
      assets: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getAssetsPrices(address[])"(
      assets: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFallbackOracle(overrides?: CallOverrides): Promise<BigNumber>;

    "getFallbackOracle()"(overrides?: CallOverrides): Promise<BigNumber>;

    getSourceOfAsset(
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getSourceOfAsset(address)"(
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    setAssetSources(
      assets: string[],
      sources: string[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setAssetSources(address[],address[])"(
      assets: string[],
      sources: string[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    setFallbackOracle(
      fallbackOracle: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setFallbackOracle(address)"(
      fallbackOracle: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    WETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "WETH()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAssetPrice(
      asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getAssetPrice(address)"(
      asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAssetsPrices(
      assets: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getAssetsPrices(address[])"(
      assets: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFallbackOracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getFallbackOracle()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSourceOfAsset(
      asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getSourceOfAsset(address)"(
      asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    setAssetSources(
      assets: string[],
      sources: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setAssetSources(address[],address[])"(
      assets: string[],
      sources: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setFallbackOracle(
      fallbackOracle: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setFallbackOracle(address)"(
      fallbackOracle: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
