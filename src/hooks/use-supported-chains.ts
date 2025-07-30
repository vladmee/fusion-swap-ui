import { SupportedChain } from "@/app/api/supported-chains/schema";
import { useQuery } from "@tanstack/react-query";

const fetchSupportedChains = async (): Promise<SupportedChain[]> => {
  const response = await fetch("/api/supported-chains", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch supported chains: ${errorText}`);
  }

  const result = await response.json();

  return result.result;
};

export const useSupportedChains = () => {
  return useQuery<SupportedChain[], Error>({
    queryKey: ["supported-chains"],
    queryFn: fetchSupportedChains,
  });
};
