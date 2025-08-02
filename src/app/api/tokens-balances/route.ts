import { tokensBalancesResponseSchema } from "./schema";

export const maxDuration = 60;

const ONE_INCH_API_KEY = process.env.ONE_INCH_API_KEY;

export async function POST(request: Request) {
  try {
    const { chainId, spender } = await request.json();

    if (!chainId) {
      return Response.json({ error: "chainId is required" }, { status: 400 });
    }

    const response = await fetch(
      `https://api.1inch.dev/balance/v1.2/${chainId}/aggregatedBalancesAndAllowances/${spender}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ONE_INCH_API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("1inch API error:", errorText);
      return Response.json(
        { error: `Failed to fetch from 1inch API: ${response.statusText}` },
        { status: response.status },
      );
    }

    const json = await response.json();
    const tokens = tokensBalancesResponseSchema.parse(json);

    return Response.json(tokens);

    return Response.json(tokens);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
