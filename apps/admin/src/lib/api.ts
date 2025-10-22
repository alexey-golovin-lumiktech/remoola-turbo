export const API = process.env.NEXT_PUBLIC_API_BASE_URL!;

const doFetch = (path: string, init?: RequestInit) => {
  return fetch(API + path, {
    credentials: `include`,
    ...init,
    headers: { "Content-Type": `application/json`, ...(init?.headers || {}) }
  });
}

export const raw = async (path: string, init?: RequestInit) => {
  let request = await doFetch(path, init);

  if (request.status == 401) {
    const refreshRequest = await fetch(API + `/auth/refresh`, { method: `POST`, credentials: `include` });
    if (refreshRequest.ok) request = await doFetch(path, init);
  }

  if (!request.ok) throw new Error(await request.text());
  const text = await request.text();
  return text ? JSON.parse(text) : null;
}

export const getJson = <T,>(p: string, init: Pick<RequestInit, `signal`>) => raw(p, init) as Promise<T>;

export const postJson = <T,>(p: string, body: unknown) => raw(p, { method: `POST`, body: JSON.stringify(body) }) as Promise<T>;

export const patchJson = <T,>(p: string, body: unknown) => raw(p, { method: `PATCH`, body: JSON.stringify(body) }) as Promise<T>;

export const putJson = <T,>(p: string, body: unknown) => raw(p, { method: `PUT`, body: JSON.stringify(body) }) as Promise<T>;

export const delJson = <T,>(p: string) => raw(p, { method: `DELETE` }) as Promise<T>;
