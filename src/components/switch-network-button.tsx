"use client";

import {
  useActiveWallet,
  useChainMetadata,
  useConnectModal,
} from "thirdweb/react";
import { Button } from "./ui/button";
import { client } from "@/lib/thirdweb-client";
import { useParams } from "next/navigation";
import { useSwapsStore } from "@/store/swaps";
import { defineChain } from "thirdweb/chains";

export const SwitchNetworkButton = ({ isActive }: { isActive: boolean }) => {
  const { id } = useParams();
  const { swaps, updateSwap } = useSwapsStore();
  const wallet = useActiveWallet();

  const swap = swaps.find((s) => s.id === id);

  const target = defineChain({ id: Number(swap?.fromChainId) });

  const { data: chainMetadata } = useChainMetadata(target);

  async function handleSwitch() {
    if (swap?.fromChainId) {
      await wallet?.switchChain(target);
      updateSwap(swap.id, "isCorrectChain", true);
    }
  }

  return (
    <Button onClick={handleSwitch} className="w-full" disabled={!isActive}>
      Switch to {chainMetadata?.name}
    </Button>
  );
};
