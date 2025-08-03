"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { NewSwapButton } from "./new-swap-button";
import { SwapListItem } from "./swap-list-item";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSwapsActions } from "@/store/swaps-actions";

export const SwapsList = () => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <NewSwapButton />
        <SidebarGroupLabel>
          <hr />
        </SidebarGroupLabel>
        <SwapsFromStore />
      </SidebarMenu>
    </SidebarGroup>
  );
};

const SwapsFromStore = () => {
  const pathname = usePathname();
  const { onPaginatedSwaps, onDeleteSwap } = useSwapsActions();

  const { data: swaps, isLoading } = onPaginatedSwaps();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      onDeleteSwap.mutate(deleteId);
      setShowDeleteDialog(false);
    }
  };

  if (isLoading) {
    return null;
  }

  const validSwaps = swaps?.items.filter(
    (swap) => swap && Object.values(swap).every((value) => value !== null),
  );

  console.log("Valid Swaps:", validSwaps);

  if (!validSwaps || validSwaps.length === 0) {
    return (
      <div className="text-muted-foreground overflow-hidden px-2 text-sm whitespace-nowrap group-data-[collapsible=icon]:hidden">
        No swaps yet.
      </div>
    );
  }

  return (
    <>
      <SidebarGroupLabel>Your Swaps</SidebarGroupLabel>
      {validSwaps.map((swap) => (
        <SwapListItem
          key={swap.id}
          swap={swap}
          isActive={pathname.includes(swap.id)}
          onDelete={() => {
            setDeleteId(swap.id);
            setShowDeleteDialog(true);
          }}
        />
      ))}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Delete swap data from your browser storage. <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
