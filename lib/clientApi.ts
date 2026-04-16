export class ApiClientError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.details = details;
  }
}

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

type QueryClientLike = {
  invalidateQueries: (filters: { queryKey: readonly unknown[] }) => Promise<unknown>;
};

function withJsonHeaders(init?: RequestInit) {
  return {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  };
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text.length > 0 ? text : null;
}

function extractErrorPayload(body: unknown) {
  if (!body || typeof body !== "object" || !("error" in body)) {
    return null;
  }

  const error = body.error;
  if (typeof error === "string") {
    return { message: error, details: undefined };
  }

  if (!error || typeof error !== "object") {
    return null;
  }

  const message =
    "message" in error && typeof error.message === "string" ? error.message : null;
  const details = "details" in error ? error.details : undefined;

  return message ? { message, details } : null;
}

export async function apiJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, withJsonHeaders(init));
  const body = await parseResponseBody(response);

  if (!response.ok) {
    const payload = extractErrorPayload(body);
    const message =
      payload?.message ??
      (typeof body === "string" ? body : `Request failed with status ${response.status}`);
    const details = payload?.details;

    throw new ApiClientError(message, response.status, details);
  }

  return body as T;
}

export function toApiErrorMessage(error: unknown) {
  if (error instanceof ApiClientError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function toJsonBody(value: JsonValue) {
  return JSON.stringify(value);
}

export async function invalidateQueryKeys(
  queryClient: QueryClientLike,
  queryKeys: ReadonlyArray<readonly unknown[]>,
) {
  await Promise.all(
    queryKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey })),
  );
}
