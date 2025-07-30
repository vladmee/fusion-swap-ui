import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { useSwapsStore } from "./swaps";
import { useCallback } from "react";
import { generateUUID } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Swap } from "@/types/swap";

export function useSwapsActions(): {
  onCreateNewSwap: UseMutationResult<{ id: string }, Error, void, unknown>;
  onPaginatedSwaps: (
    limit?: number,
    cursor?: string,
  ) => UseQueryResult<{
    items: Swap[];
    hasMore: boolean;
    nextCursor: string | null;
  }>;
  onSwapById: (id?: string | null) => UseQueryResult<Swap, Error>;
  onDeleteSwap: UseMutationResult<{ id: string }, Error, string, unknown>;
  onUpdateActiveSwap: (
    key: "fromChainId" | "fromTokenAddress" | "toTokenAddress" | "toChainId",
    value: string,
  ) => void;
} {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const {
    swaps,
    setActiveSwap,
    createSwap,
    deleteSwap,
    updateSwap,
    activeSwap,
  } = useSwapsStore();

  const onCreateNewSwap = useMutation({
    mutationFn: async () => {
      const newSwapId = generateUUID();
      createSwap(newSwapId);
      return { id: newSwapId };
    },
    onSuccess: ({ id }) => {
      setActiveSwap(id);
      queryClient.invalidateQueries({ queryKey: ["paginated-swaps"] });
      router.push(`/${id}`);
    },
  });

  const onPaginatedSwaps = (limit = 10, cursor: string | null = null) =>
    useQuery({
      queryKey: ["paginated-swaps", limit, cursor, swaps],
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

        console.log({ paginatedSwaps, swaps });

        return {
          items: paginatedSwaps,
          hasMore: paginatedSwaps.length > limit,
          nextCursor,
        };
      },
    });

  const onSwapById = (id?: string | null) =>
    useQuery({
      queryKey: ["swap", id],
      queryFn: async ({ queryKey }) => {
        const [, id] = queryKey;

        const swap = swaps.find((s) => s.id === id);

        console.log("Fetching swap by id:", id, "Found:", swap);
        if (!swap) {
          throw new Error(`Swap with id ${id} not found`);
        }

        return swap;
      },
      enabled: !!id,
    });

  const onDeleteSwap = useMutation({
    mutationFn: async (id: string) => {
      deleteSwap(id);
      return { id };
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["paginated-swaps"] });
      if (pathname.includes(id)) {
        router.push("/");
      }
    },
  });

  const onUpdateActiveSwap = useCallback(
    (
      key: "fromChainId" | "fromTokenAddress" | "toTokenAddress" | "toChainId",
      value: string,
    ) => {
      if (!activeSwap) return;
      updateSwap(activeSwap, key, value);
      queryClient.invalidateQueries({ queryKey: ["swap", activeSwap] });
    },
    [activeSwap, updateSwap],
  );

  return {
    onCreateNewSwap,
    onPaginatedSwaps,
    onSwapById,
    onDeleteSwap,
    onUpdateActiveSwap,
  };
}
