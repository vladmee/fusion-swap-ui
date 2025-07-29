import { SwapSchema } from "@/types/swap";
import { z } from "zod";

const safeRemoveItem = (key: string): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {}
};

/**
 * =================================================================
 *                      SWAP STORAGE
 * =================================================================
 **/
const SwapsStorageSchema = z.object({
  activeSwap: z.string().nullable(),
  swaps: z.array(SwapSchema),
});
export type SwapsStorage = z.infer<typeof SwapsStorageSchema>;

const SWAPS_STORAGE_KEY = "swaps-storage";

export const saveSwapsStorage = (storage: SwapsStorage): void => {
  if (typeof window === "undefined") return;
  const validated = SwapsStorageSchema.parse(storage);
  localStorage.setItem(SWAPS_STORAGE_KEY, JSON.stringify(validated));
};

export const loadSwapsStorage = (): SwapsStorage => {
  if (typeof window === "undefined")
    return {
      activeSwap: null,
      swaps: [],
    };
  const stored = localStorage.getItem(SWAPS_STORAGE_KEY);
  if (!stored) {
    return {
      activeSwap: null,
      swaps: [],
    };
  }

  try {
    const parsed = JSON.parse(stored);
    return SwapsStorageSchema.parse(parsed);
  } catch {
    safeRemoveItem(SWAPS_STORAGE_KEY);
    return {
      activeSwap: null,
      swaps: [],
    };
  }
};
