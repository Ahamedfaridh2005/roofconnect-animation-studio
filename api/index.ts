import { IncomingMessage, ServerResponse } from "http";
import server from "../dist/server/server.js";

function getWebRequest(req: IncomingMessage): Request {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url = `${protocol}://${host}${req.url}`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => headers.append(key, v));
      } else {
        headers.set(key, value);
      }
    }
  }

  const hasBody = req.method !== "GET" && req.method !== "HEAD";

  return new Request(url, {
    method: req.method,
    headers,
    body: hasBody ? (req as any) : null,
    duplex: hasBody ? "half" : undefined,
  } as any);
}

async function sendWebResponse(res: ServerResponse, response: Response) {
  res.statusCode = response.status;
  res.statusMessage = response.statusText;

  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (response.body) {
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  }
  res.end();
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const webRequest = getWebRequest(req);
    const webResponse = await server.fetch(webRequest);
    await sendWebResponse(res, webResponse);
  } catch (error) {
    console.error("Error in Vercel Node handler:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
