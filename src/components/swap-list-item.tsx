"use client";

import { memo } from "react";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { Swap } from "@/types/swap";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { HStack } from "./ui/stack";
import { useSupportedChains } from "@/hooks/use-supported-chains";
import { useTokensByChain } from "@/hooks/use-tokens-by-chain";

const PureSwapListItem = ({
  swap,
  isActive,
  onDelete,
}: {
  swap: Swap;
  isActive: boolean;
  onDelete: (swapId: string) => void;
}) => {
  const { data: supportedChains } = useSupportedChains();
  const { data: tokensByToChain } = useTokensByChain(swap?.toChainId);
  const { data: tokensByFromChain } = useTokensByChain(swap?.fromChainId);

  const fromChain = supportedChains?.find(
    (chain) => String(chain.chain_id) === swap.fromChainId,
  );
  const fromToken = tokensByFromChain?.find(
    (token) => token.address === swap.fromTokenAddress,
  );
  const toToken = tokensByToChain?.find(
    (token) => token.address === swap.toTokenAddress,
  );
  const toChain = supportedChains?.find(
    (chain) => String(chain.chain_id) === swap.toChainId,
  );

  if (!fromChain || !toChain || !fromToken || !toToken) {
    return null;
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <HStack className="justify-between">
          <Link href={`/${swap.id}`}>
            <div className="flex min-w-0 items-center gap-2">
              {fromChain && (
                <img
                  src={fromChain.chain_icon}
                  alt={fromChain.chain_name}
                  width={24}
                  height={24}
                />
              )}
              {fromToken && fromToken.logoURI && (
                <img
                  src={fromToken.logoURI}
                  alt={fromToken.name}
                  width={24}
                  height={24}
                />
              )}
              {"<>"}
              {toChain && (
                <img
                  src={toChain.chain_icon}
                  alt={toChain.chain_name}
                  width={24}
                  height={24}
                />
              )}
              {toToken && toToken.logoURI && (
                <img
                  src={toToken.logoURI}
                  alt={toToken.name}
                  width={24}
                  height={24}
                />
              )}
            </div>
          </Link>
          <div
            className="text-destructive focus:bg-destructive/15 focus:text-destructive hove:font-bold cursor-pointer"
            onClick={() => onDelete(swap.id)}
          >
            <Trash className="text-destructive size-4 opacity-70" />
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
