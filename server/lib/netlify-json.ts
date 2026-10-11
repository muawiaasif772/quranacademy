export interface NetlifyHandlerEvent {
  httpMethod?: string;
  body?: string | null;
}

export type NetlifyHandler = (
  event: NetlifyHandlerEvent,
) => Promise<{ statusCode: number; headers?: Record<string, string>; body: string }>;

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
};

export function jsonResponse(status: number, body: Record<string, unknown>) {
  return {
    statusCode: status,
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  };
}

export function createPostJsonHandler(
  processor: (body: unknown) => Promise<{ status: number; body: Record<string, unknown> }>,
): NetlifyHandler {
  return async (event: NetlifyHandlerEvent) => {
    if (event.httpMethod === "OPTIONS") {
      return { statusCode: 204, headers: JSON_HEADERS, body: "" };
    }
    if (event.httpMethod !== "POST") {
      return jsonResponse(405, { success: false, message: "Method not allowed." });
    }

    let body: unknown;
    try {
      body = event.body ? JSON.parse(event.body) : {};
    } catch {
      return jsonResponse(400, { success: false, message: "Invalid JSON body." });
    }

    const result = await processor(body);
    return jsonResponse(result.status, result.body);
  };
}
