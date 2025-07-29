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
};

const initialStorage = loadSwapsStorage();

const persistStorage = (swaps: Swap[], activeSwap: string | null) => {
  const storage: SwapsStorage = { activeSwap, swaps };
  saveSwapsStorage(storage);
};

export const useSwapsStore = create<SwapsStore>()(
  persist(
    (set, get) => ({
      activeSwap: initialStorage.activeSwap,
      swaps: initialStorage.swaps,
      setSwaps: (swaps) => {
        set({ swaps });
        persistStorage(swaps, get().activeSwap);
      },
      setActiveSwap: (swapId) => {
        set({ activeSwap: swapId });
        persistStorage(get().swaps, swapId);
      },
      createSwap: (swapId) => {
        const newSwap = {
          id: swapId,
          fromTokenAddress: null,
          toTokenAddress: null,
        };
        const newSwaps = [...get().swaps, newSwap];
        set({
          swaps: newSwaps,
          activeSwap: swapId,
        });
        persistStorage(newSwaps, swapId);
      },
      deleteSwap: (swapId) => {
        const remainingSwaps = get().swaps.filter((swap) => swap.id !== swapId);
        const newActiveSwap =
          get().activeSwap === swapId
            ? remainingSwaps.length > 0
              ? remainingSwaps[0].id
              : null
            : get().activeSwap;

        set({
          swaps: remainingSwaps,
          activeSwap: newActiveSwap,
        });
        persistStorage(remainingSwaps, newActiveSwap);
      },
    }),
    {
      name: "swaps-storage",
    },
  ),
);
