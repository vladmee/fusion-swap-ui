import { memo } from "react";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { Swap } from "@/types/swap";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { HStack } from "./ui/stack";

const PureSwapListItem = ({
  swap,
  isActive,
  onDelete,
}: {
  swap: Swap;
  isActive: boolean;
  onDelete: (swapId: string) => void;
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <HStack>
          <Link href={`/${swap.id}`}>
            <div className="flex min-w-0 items-center gap-2">
              <span className={cn("truncate", { "font-bold": isActive })}>
                {swap.id.substring(0, 6)}
              </span>
            </div>
          </Link>
          <div
            className="text-destructive focus:bg-destructive/15 focus:text-destructive hove:font-bold cursor-pointer"
            onClick={() => onDelete(swap.id)}
          >
            <Trash className="text-destructive size-4" />
          </div>
        </HStack>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const SwapListItem = memo(PureSwapListItem, (prevProps, nextProps) => {
  if (prevProps.isActive !== nextProps.isActive) return false;
  return true;
});
