import { z } from "zod";

export const SwapSchema = z.object({
  id: z.string(),
  fromChainId: z.string().nullable(),
  fromTokenAddress: z.string().nullable(),
  toTokenAddress: z.string().nullable(),
  toChainId: z.string().nullable(),
});

export type Swap = z.infer<typeof SwapSchema>;
