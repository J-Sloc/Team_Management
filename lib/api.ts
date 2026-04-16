import { NextResponse } from "next/server";
import { z, ZodError, ZodType } from "zod";

type ApiErrorBody = {
  error: {
    message: string;
    details?: unknown;
  };
};

export class ApiRouteError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiRouteError";
    this.status = status;
    this.details = details;
  }
}

export function createApiError(status: number, message: string, details?: unknown) {
  return new ApiRouteError(status, message, details);
}

export function createErrorResponse(
  status: number,
  message: string,
  details?: unknown,
) {
  return NextResponse.json<ApiErrorBody>(
    { error: { message, details } },
    { status },
  );
}

export async function parseJsonBody<T>(
  request: Request,
  schema: ZodType<T>,
): Promise<T> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    throw createApiError(400, "Invalid JSON body");
  }

  return schema.parse(body);
}

export function parseSearchParams<T>(
  request: Request,
  schema: ZodType<T>,
): T {
  const url = new URL(request.url);
  const values = Object.fromEntries(url.searchParams.entries());
  return schema.parse(values);
}

export const dateLikeStringSchema = z
  .string()
  .min(1)
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Invalid date value",
  });

export function handleApiError(error: unknown) {
  if (error instanceof ApiRouteError) {
    return createErrorResponse(error.status, error.message, error.details);
  }

  if (error instanceof ZodError) {
    return createErrorResponse(
      400,
      "Validation failed",
      error.flatten(),
    );
  }

  console.error(error);
  return createErrorResponse(500, "Internal server error");
}
