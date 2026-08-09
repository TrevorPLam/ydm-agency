export interface MockResponseOptions {
  status?: number;
  statusText?: string;
  headers?: Record<string, string>;
}

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

export function createMockApiError(
  status = 500,
  message = 'Internal Server Error',
): Response {
  return createMockFetchResponse({ error: message }, { status, statusText: message });
}

export function createMockResendSuccess(id = 'email_123'): Response {
  return createMockFetchResponse({ id }, { status: 200 });
}

export function createMockSupabaseInsert(rows: Record<string, unknown>[]): Response {
  return createMockFetchResponse(rows, { status: 201 });
}
