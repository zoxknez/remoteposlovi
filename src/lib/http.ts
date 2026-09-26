export const APP_USER_AGENT =
  "RemotePoslovi/1.0 (+https://remoteposlovi.vercel.app; Serbia remote job hub; contact zoxknez@hotmail.com)";

export class HttpError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
  }
}

export async function fetchText(
  url: string,
  options: {
    timeoutMs?: number;
    headers?: Record<string, string>;
    method?: "GET" | "HEAD";
    redirect?: RequestRedirect;
  } = {},
): Promise<{
  ok: boolean;
  status: number;
  url: string;
  text: string;
  redirected: boolean;
  durationMs: number;
}> {
  const timeoutMs = options.timeoutMs ?? 12000;
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: options.method ?? "GET",
      redirect: options.redirect ?? "follow",
      headers: {
        "User-Agent": APP_USER_AGENT,
        Accept: "application/json, text/html, */*",
        ...options.headers,
      },
      signal: controller.signal,
      cache: "no-store",
    });
    const text = options.method === "HEAD" ? "" : await response.text();
    return {
      ok: response.ok,
      status: response.status,
      url: response.url,
      text,
      redirected: response.redirected,
      durationMs: Date.now() - started,
    };
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchJson<T>(url: string, options?: Parameters<typeof fetchText>[1]): Promise<T> {
  const result = await fetchText(url, options);
  if (!result.ok) {
    throw new HttpError(`HTTP ${result.status} for ${url}`, result.status);
  }
  return JSON.parse(result.text) as T;
}

export async function mapPool<T, R>(
  items: T[],
  limit: number,
  mapper: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}
