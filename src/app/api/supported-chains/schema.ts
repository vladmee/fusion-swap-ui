import { z } from "zod";

const nativeTokenSchema = z.object({
  chain_id: z.number(),
  address: z.string(),
  decimals: z.number(),
  symbol: z.string(),
  name: z.string(),
});

const chainSchema = z.object({
  chain_id: z.number(),
  chain_name: z.string(),
  chain_icon: z.string(),
  native_token: nativeTokenSchema,
});

export const supportedChainsResponseSchema = z.object({
  result: z.array(chainSchema),
});

export type SupportedChainsResponse = z.infer<
  typeof supportedChainsResponseSchema
>;
export type SupportedChain = z.infer<typeof chainSchema>;
