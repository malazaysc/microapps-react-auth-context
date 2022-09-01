const LOGIN_API_ENDPOINT =
  process.env.NEXT_PUBLIC_AUTH_API_ENDPOINT_URL ||
  "http://localhost:8000/api/token/";

export async function loginApi(body) {
  let response;
  try {
    response = await fetch(`${LOGIN_API_ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    // Probably a network error, maybe the service is down or the endpoint is wrong.
    return {
      status: 500,
      error: error.message,
      data: null,
    };
  }

  return response.json();
}
