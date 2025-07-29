import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  loadSwapsStorage,
  saveSwapsStorage,
  SwapsStorage,
} from "@/store/persist";
import { Swap } from "@/types/swap";

export type SwapsStore = {
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
    }),
    {
      name: "swaps-storage",
    },
  ),
);
