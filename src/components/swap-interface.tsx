"uee client";

import { useSupportedChains } from "@/hooks/use-supported-chains";
import { useState } from "react";
import { ChainSelector } from "./chain-selector";
import { useSwapsStore } from "@/store/swaps";
import { useSwapsActions } from "@/store/swaps-actions";
import { useParams } from "next/navigation";

export const SwapInterface = () => {
  const { id } = useParams();
  const { swaps, updateSwap } = useSwapsStore();
  const { data: supportedChains } = useSupportedChains();

  const swap = swaps.find((s) => s.id === id);

  if (!swap) return <div>No swap found.</div>;

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">Swap Interface</h1>
      <ChainSelector
        chains={supportedChains}
        value={swap.toChainId || "1"}
        onChange={(v) => updateSwap(swap.id, "toChainId", v)}
      />
    </div>
  );
};
