"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import { useSwapsStore } from "@/store/swaps";

export const SwapsList = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Swaps</SidebarGroupLabel>
      <SidebarMenu>
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
        <>{swap.id}</>
        // <ChatItem
        //   key={chat.id}
        //   chat={chat}
        //   isActive={pathname.includes(chat.id)}
        //   onDelete={() => {
        //     setDeleteId(swap.id);
        //     setShowDeleteDialog(true);
        //   }}
        //   setOpenMobile={setOpenMobile}
        // />
      ))}
    </>
  );
};
