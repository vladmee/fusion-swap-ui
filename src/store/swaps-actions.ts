import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useSwapsStore } from "./swaps";
import { useCallback } from "react";
import { generateUUID } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Swap } from "@/types/swap";

export function useSwapsActions(): {
  onCreateNewSwap: () => void;
  onPaginatedSwaps: (
    limit: number,
    cursor: string,
  ) => ReturnType<typeof useQuery>;
  onSwapById: (id?: string) => UseQueryResult<Swap, Error>;
} {
  const router = useRouter();
  const { swaps, setActiveSwap, createSwap } = useSwapsStore();

  const onCreateNewSwap = useCallback(() => {
    const newSwapId = generateUUID();
    createSwap(newSwapId);
    setActiveSwap(newSwapId);
    router.push(`/${newSwapId}`);
  }, [createSwap, setActiveSwap]);

  const onPaginatedSwaps = (limit = 10, cursor: string | null = null) =>
    useQuery({
      queryKey: ["paginated-swaps", limit, cursor],
      queryFn: async ({ queryKey }) => {
        const [, rawLimit, cursor] = queryKey;
        const limit = typeof rawLimit === "number" ? rawLimit : 10;

        const startIndex = cursor
          ? swaps.findIndex((swap) => swap.id === cursor) + 1
          : 0;

        const paginatedSwaps = swaps.slice(
          startIndex,
          startIndex + Number(limit),
        );
        const nextCursor =
          startIndex + Number(limit) < swaps.length
            ? paginatedSwaps[paginatedSwaps.length - 1]?.id
            : null;

        return {
          items: paginatedSwaps,
          hasMore: paginatedSwaps.length > limit,
          nextCursor,
        };
      },
    });

  const onSwapById = (id?: string) =>
    useQuery({
      queryKey: ["swap", id],
      queryFn: async ({ queryKey }) => {
        const [, id] = queryKey;

        const swap = swaps.find((s) => s.id === id);
        if (!swap) {
          throw new Error(`Swap with id ${id} not found`);
        }

        return swap;
      },
      enabled: !!id,
    });

  return {
    onCreateNewSwap,
    onPaginatedSwaps,
    onSwapById,
  };
}
