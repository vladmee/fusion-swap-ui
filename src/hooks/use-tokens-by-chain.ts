import { Token } from "@/app/api/tokens-by-chain/schema";
import { skipToken, useQuery } from "@tanstack/react-query";

const fetchTokensByChain = async (chainId: string): Promise<Token[]> => {
  const response = await fetch("/api/tokens-by-chain", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chainId }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch supported chains: ${errorText}`);
  }

  const result = await response.json();

  return result || [];
};

export const useTokensByChain = (chainId?: string | null) => {
  console.log({ chainId });
  return useQuery<Token[], Error>({
    queryKey: ["tokens-by-chain", chainId],
    queryFn: chainId ? () => fetchTokensByChain(chainId) : skipToken,
    enabled: !!chainId,
  });
};
