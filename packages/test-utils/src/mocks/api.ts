/**
 * FILE: api.ts
 * PURPOSE: Provide Response fixtures for fetch, Resend, Supabase, and generic API errors.
 * ARCHITECTURE: test-utils mocks, wraps plain objects into standard Response instances with JSON bodies.
 * KEY RULES: Defaults must be valid HTTP status codes and JSON content-type headers.
 * DEPENDS ON: None
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

export interface MockResponseOptions {
  status?: number;
  statusText?: string;
  headers?: Record<string, string>;
}

/**
 * WHAT IT DOES: Wraps data into a JSON Response with configurable status and headers.
 * @param {T} data – the response body data
 * @param {MockResponseOptions} [options] – optional status, statusText, and headers
 * @return {Response} – a fetch-compatible Response object
 * SIDE EFFECTS: None
 * ASSUMES: data is serializable as JSON.
 */
export function createMockFetchResponse<T>(
  data: T,
  options: MockResponseOptions = {},
): Response {
  const { status = 200, statusText = 'OK', headers = {} } = options;
  return new Response(JSON.stringify(data), {
    status,
    statusText,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

/**
 * WHAT IT DOES: Builds an error Response with a generic or custom server error message.
 * @param {number} [status] – HTTP status code, defaults to 500
 * @param {string} [message] – error message, defaults to 'Internal Server Error'
 * @return {Response} – a JSON error Response
 * SIDE EFFECTS: None
 * ASSUMES: None
 */
export function createMockApiError(
  status = 500,
  message = 'Internal Server Error',
): Response {
  return createMockFetchResponse({ error: message }, { status, statusText: message });
}

/**
 * WHAT IT DOES: Builds a successful Resend API Response with a generated email id.
 * @param {string} [id] – Resend email id, defaults to 'email_123'
 * @return {Response} – a JSON Response with status 200
 * SIDE EFFECTS: None
 * ASSUMES: None
 */
export function createMockResendSuccess(id = 'email_123'): Response {
  return createMockFetchResponse({ id }, { status: 200 });
}

/**
 * WHAT IT DOES: Builds a successful Supabase insert Response containing the inserted rows.
 * @param {Record<string, unknown>[]} rows – the inserted rows to return
 * @return {Response} – a JSON Response with status 201
 * SIDE EFFECTS: None
 * ASSUMES: None
 */
export function createMockSupabaseInsert(rows: Record<string, unknown>[]): Response {
  return createMockFetchResponse(rows, { status: 201 });
}
