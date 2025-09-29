"use client";
import React from "react";
import Link from "next/link";
import { cn } from "../lib/utils";

export const Badge: React.FC<{ label: string; tone?: `green`|`blue`|`gray`|`red` }> = ({ label, tone=`gray` }) => {
  const m: Record<string,string> = {
    green:`bg-emerald-100 text-emerald-700 ring-emerald-600/20`,
    blue:`bg-blue-100 text-blue-700 ring-blue-600/20`,
    gray:`bg-gray-100 text-gray-700 ring-gray-600/20`,
    red:`bg-rose-100 text-rose-700 ring-rose-600/20`,
  };
  return <span className={cn(`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset`, m[tone])}>{label}</span>;
};

export const Card: React.FC<React.PropsWithChildren<{ className?: string; title?: string; actions?: React.ReactNode }>>
  = ({ className=``, title, actions, children }) => (
  <div className={cn(`rounded-2xl bg-white shadow-sm ring-1 ring-black/5`, className)}>
    {(title || actions) && <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100">
      {title && <h3 className="text-sm font-semibold text-gray-900">{title}</h3>}
      {actions}
    </div>}
    <div className="p-4 sm:p-5">{children}</div>
  </div>
);

export const ProgressBar: React.FC<{ value: number }> = ({ value }) =>
  <div className="h-2 w-full rounded-full bg-gray-100"><div className="h-2 rounded-full bg-blue-500" style={{ width: `${value}%` }} /></div>;

export function SidebarLink({ href, active, children }:{href:string;active?:boolean;children:React.ReactNode}) {
  return (
    <Link href={href} className={cn(
      `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition`,
      active ? `bg-white/10 text-white` : `text-blue-100 hover:bg-white/10 hover:text-white`
    )}>
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white/20">•</span>
      {children}
    </Link>
  );
}
