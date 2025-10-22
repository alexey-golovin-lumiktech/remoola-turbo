// apps/admin/src/context/UserContext.tsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";

import { getJson } from "../lib/api";

export type Role = `superadmin` | `admin` | `client`;
export type User = { id: string; email: string; role: Role };
export type MeResponse = { sub: string; email: string; role: Role; iat: number; exp: number };
export const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getJson<MeResponse>(`/auth/me`)
      .then((data) => setUser((prev) => ({ ...prev, id: data.sub, role: data.role, email: data.email })))
      .catch(() => setUser(null));
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
