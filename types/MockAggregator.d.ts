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
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface MockAggregatorInterface extends ethers.utils.Interface {
  functions: {
    "getTokenType()": FunctionFragment;
    "latestAnswer()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getTokenType",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "latestAnswer",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "getTokenType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "latestAnswer",
    data: BytesLike
  ): Result;

  events: {
    "AnswerUpdated(int256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AnswerUpdated"): EventFragment;
}

export class MockAggregator extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: MockAggregatorInterface;

  functions: {
    getTokenType(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "getTokenType()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    latestAnswer(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "latestAnswer()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;
  };

  getTokenType(overrides?: CallOverrides): Promise<BigNumber>;

  "getTokenType()"(overrides?: CallOverrides): Promise<BigNumber>;

  latestAnswer(overrides?: CallOverrides): Promise<BigNumber>;

  "latestAnswer()"(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    getTokenType(overrides?: CallOverrides): Promise<BigNumber>;

    "getTokenType()"(overrides?: CallOverrides): Promise<BigNumber>;

    latestAnswer(overrides?: CallOverrides): Promise<BigNumber>;

    "latestAnswer()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    AnswerUpdated(
      current: BigNumberish | null,
      roundId: BigNumberish | null,
      timestamp: null
    ): EventFilter;
  };

  estimateGas: {
    getTokenType(overrides?: CallOverrides): Promise<BigNumber>;

    "getTokenType()"(overrides?: CallOverrides): Promise<BigNumber>;

    latestAnswer(overrides?: CallOverrides): Promise<BigNumber>;

    "latestAnswer()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getTokenType(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getTokenType()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    latestAnswer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "latestAnswer()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
