import { z } from "zod";

export const SwapSchema = z.object({
  id: z.string(),
  fromTokenAddress: z.string().nullable(),
  toTokenAddress: z.string().nullable(),
});

export type Swap = z.infer<typeof SwapSchema>;
