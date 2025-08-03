import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  loadSwapsStorage,
  saveSwapsStorage,
  SwapsStorage,
} from "@/store/persist";
import { Swap } from "@/types/swap";

export type SwapsStore = {
  createSwap: (swapId: string) => void;
  deleteSwap: (swapId: string) => void;
  swaps: Swap[];
  setSwaps: (swaps: Swap[]) => void;
  activeSwap: string | null;
  setActiveSwap: (swapId: string | null) => void;
  updateSwap: <K extends keyof Omit<Swap, "id">>(
    swapId: string,
    key: K,
    value: Swap[K],
  ) => void;
};

export const useSwapsStore = create<SwapsStore>()(
  persist(
    (set, get) => ({
      activeSwap: null,
      swaps: [],
      setSwaps: (swaps) => set({ swaps }),
      setActiveSwap: (swapId) => set({ activeSwap: swapId }),
      createSwap: (swapId) => {
        const newSwap: Swap = {
          id: swapId,
          fromTokenAddress: null,
          toTokenAddress: null,
          fromChainId: null,
          toChainId: null,
          isCorrectChain: false,
        };
        set((state) => ({
          swaps: [...state.swaps, newSwap],
          activeSwap: swapId,
        }));
      },
      deleteSwap: (swapId) => {
        set((state) => {
          const remainingSwaps = state.swaps.filter(
            (swap) => swap.id !== swapId,
          );
          const newActiveSwap =
            state.activeSwap === swapId
              ? remainingSwaps.length > 0
                ? remainingSwaps[0].id
                : null
              : state.activeSwap;
          return { swaps: remainingSwaps, activeSwap: newActiveSwap };
        });
      },
      updateSwap: (swapId, key, value) => {
        set((state) => ({
          swaps: state.swaps.map((swap) =>
            swap.id === swapId ? { ...swap, [key]: value } : swap,
          ),
        }));
      },
    }),
    { name: "swaps-storage" },
  ),
);
