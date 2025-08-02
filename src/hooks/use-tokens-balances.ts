import { Token } from "@/app/api/tokens-by-chain/schema";
import { getSpenderByChain } from "@/lib/spender-addresses";
import { skipToken, useQuery } from "@tanstack/react-query";

const fetchTokensBalances = async (
  chainId: string,
  spender: string,
): Promise<Token[]> => {
  const response = await fetch("/api/tokens-by-chain", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chainId, spender }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch supported chains: ${errorText}`);
  }

  const result = await response.json();

  return result || [];
};

export const useTokensBalances = (chainId?: string | null) => {
  const spender = getSpenderByChain(chainId);

  return useQuery<Token[], Error>({
    queryKey: ["tokens-balances", chainId],
    queryFn: chainId ? () => fetchTokensBalances(chainId, spender) : skipToken,
    enabled: !!chainId,
  });
};
