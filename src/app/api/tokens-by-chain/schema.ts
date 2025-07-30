import { z } from "zod";

const tokenSchema = z.object({
  chainId: z.number(),
  symbol: z.string(),
  name: z.string(),
  address: z.string(),
  decimals: z.number(),
  logoURI: z.string().nullable(),
  providers: z.array(z.string()).optional(),
  eip2612: z.boolean().optional(),
  isFoT: z.boolean().optional(),
  tags: z.array(z.string()),
});

export const tokensByChainResponseSchema = z.record(z.string(), tokenSchema);

export type TokensByChainResponse = z.infer<typeof tokensByChainResponseSchema>;
export type Token = z.infer<typeof tokenSchema>;
