import "server-only";
import { cookies } from "next/headers";

export async function getClientSSR(clientId: string) {
  const token = (await cookies()).get(`access_token`)?.value;
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = new URL(`${base}/admin/clients/${clientId}`)
  const res = await fetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : ``,
    },
    cache: `no-store`,
  });

  return res.ok ? res.json() : null;
}
