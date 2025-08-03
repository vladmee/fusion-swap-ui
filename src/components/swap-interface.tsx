"uee client";

import { useSupportedChains } from "@/hooks/use-supported-chains";
import { useState } from "react";
import { ChainSelector } from "./chain-selector";
import { useSwapsStore } from "@/store/swaps";
import { useSwapsActions } from "@/store/swaps-actions";
import { useParams } from "next/navigation";
import { useTokensByChain } from "@/hooks/use-tokens-by-chain";
import { TokenSelector } from "./token-selector";
import { useTokensBalances } from "@/hooks/use-tokens-balances";
import { GuideInterface } from "./guide-interface";
import { isCompleteSwap } from "@/lib/utils";

export const SwapInterface = () => {
  const { id } = useParams();
  const { swaps, updateSwap } = useSwapsStore();
  const { data: supportedChains } = useSupportedChains();

  const swap = swaps.find((s) => s.id === id);

  const { data: tokensByChain } = useTokensByChain(swap?.toChainId);
  const { data: tokensBalances } = useTokensBalances(swap?.fromChainId);

  const firstTokenAddress = tokensByChain?.[0]?.address;
  const firstTokenWithBalanceAddress = tokensBalances?.[0]?.address;

  if (!swap) return <div>No swap found.</div>;

  const isComplete = isCompleteSwap(swap);

  return (
    <div className="flex h-screen w-full flex-col overflow-clip">
      <div className="flex w-full items-center justify-center">
        <div
          className={`flex ${
            isComplete ? "w-1/3" : "w-1/2"
          } items-center justify-center border-r border-r-neutral-200 px-4 py-10 text-3xl font-semibold`}
        >
          From Network & Token
        </div>
        {isComplete && (
          <div className="flex w-1/3 items-center justify-center border-r border-r-neutral-200 px-4 py-10 text-3xl font-semibold">
            Guide
          </div>
        )}
        <div
          className={`flex ${
            isComplete ? "w-1/3" : "w-1/2"
          } items-center justify-center px-4 py-10 text-3xl font-semibold`}
        >
          To Network & Token
        </div>
      </div>
      <div className="flex h-full w-full items-start justify-start">
        <div
          className={`flex h-full ${
            isComplete ? "w-1/3" : "w-1/2"
          } flex-col justify-start border-r border-r-neutral-200`}
        >
          <ChainSelector
            chains={supportedChains}
            value={swap.fromChainId || "1"}
            onChange={(v) => updateSwap(swap.id, "fromChainId", v)}
          />
          {swap.fromChainId && firstTokenWithBalanceAddress ? (
            <TokenSelector
              tokens={tokensBalances}
              value={swap.fromTokenAddress || firstTokenWithBalanceAddress}
              onChange={(v) => updateSwap(swap.id, "fromTokenAddress", v)}
            />
          ) : (
            <div className="flex h-[200px] w-full items-center justify-center px-1">
              Select the network first
            </div>
          )}
        </div>
        {isComplete && (
          <div className="max-h-full w-1/3 border-r border-r-neutral-200 px-4">
            <GuideInterface />
          </div>
        )}
        <div
          className={`flex h-full ${isComplete ? "w-1/3" : "w-1/2"} flex-col justify-start`}
        >
          <ChainSelector
            chains={supportedChains}
            value={swap.toChainId || "1"}
            onChange={(v) => updateSwap(swap.id, "toChainId", v)}
          />
          {swap.toChainId && firstTokenAddress ? (
            <TokenSelector
              tokens={tokensByChain}
              value={swap.toTokenAddress || firstTokenAddress}
              onChange={(v) => updateSwap(swap.id, "toTokenAddress", v)}
            />
          ) : (
            <div className="flex h-[200px] w-full items-center justify-center px-1">
              Select the network first
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
