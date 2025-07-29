"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

import { useSwapsStore } from "@/store/swaps";
import { NewSwapButton } from "./new-swap-button";

export const SwapsList = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Swaps</SidebarGroupLabel>
      <SidebarMenu>
        <NewSwapButton />
        <SwapsFromStore />
      </SidebarMenu>
    </SidebarGroup>
  );
};

const SwapsFromStore = () => {
  const { swaps } = useSwapsStore();

  if (!swaps || swaps.length === 0) {
    return (
      <div className="text-muted-foreground overflow-hidden px-2 text-sm whitespace-nowrap group-data-[collapsible=icon]:hidden">
        No swaps yet.
      </div>
    );
  }

  return (
    <>
      {swaps.map((swap) => (
        <div key={swap.id}>{swap.id}</div>
      ))}
    </>
  );
};
