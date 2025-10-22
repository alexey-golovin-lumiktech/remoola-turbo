'use client';
export function getToken() {
  if (typeof window ==`undefined`) return undefined;
  return localStorage.getItem(`token`) ?? undefined;
}

export function setToken(token: string) {
  localStorage.setItem(`token`, token);
}

export function clearToken() {
  localStorage.removeItem(`token`);
}
