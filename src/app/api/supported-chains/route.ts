import { supportedChainsResponseSchema } from "./schema";

export const maxDuration = 60;

const ONE_INCH_API_KEY = process.env.ONE_INCH_API_KEY;

export async function POST() {
  try {
    const response = await fetch(
      "https://api.1inch.dev/portfolio/portfolio/v5.0/general/supported_chains",
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
    const chains = supportedChainsResponseSchema.parse(json);

    return Response.json(chains);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
