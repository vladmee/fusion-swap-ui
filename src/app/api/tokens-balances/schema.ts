import { z } from "zod";

const walletBalanceSchema = z.object({
  balance: z.string(),
  allowance: z.string(),
});

const tokenWithBalanceSchema = z.object({
  decimals: z.number(),
  symbol: z.string(),
  tags: z.array(z.string()),
  address: z.string(),
  name: z.string(),
  logoURI: z.string().nullable(),
  eip2612: z.boolean().optional(),
  isFoT: z.boolean().optional(),
  isCustom: z.boolean(),
  wallets: z.record(z.string(), walletBalanceSchema),
  type: z.string(),
  tracked: z.boolean(),
});

export const tokensBalancesResponseSchema = z.array(tokenWithBalanceSchema);

export type TokensBalancesResponse = z.infer<
  typeof tokensBalancesResponseSchema
>;
export type TokenWithBalance = z.infer<typeof tokenWithBalanceSchema>;
