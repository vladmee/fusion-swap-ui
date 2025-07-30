export const maxDuration = 60;

export async function POST() {
  let requestBody: PostRequestBody;

  try {
    requestBody = postRequestBodySchema.parse(await request.json());
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        error: "Body is required.",
        data: (error as Error).message,
      },
      { status: 500 },
    );
  }

  try {
    const { id } = requestBody;
  } catch (error) {
    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }
    console.error("Unexpected error in chat route:", error);
    return new Response("bad_request:api").toResponse();
  }

  return new Response(stream, { status: 200 });
}
