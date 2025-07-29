import { z } from "zod";

export const SwapSchema = z.object({
  id: z.string(),
  fromTokenAddress: z.string(),
  toTokenAddress: z.string(),
});

export type Swap = z.infer<typeof SwapSchema>;
