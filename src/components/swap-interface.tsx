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

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-full w-1/3 flex-col justify-center">
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
          <div className="flex h-[200px] w-full items-center justify-center rounded-lg border border-zinc-200 bg-white px-1 shadow-xs dark:border-zinc-700/80 dark:bg-zinc-900">
            Loading...
          </div>
        )}
      </div>
      <GuideInterface />
      <div className="flex h-full w-1/3 flex-col justify-center">
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
          <div className="flex h-[200px] w-full items-center justify-center rounded-lg border border-zinc-200 bg-white px-1 shadow-xs dark:border-zinc-700/80 dark:bg-zinc-900">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};
