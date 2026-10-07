"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Week" },
  { href: "/prep", label: "Prep days" },
  { href: "/grocery", label: "Grocery" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 rounded-full bg-[var(--paper)] p-1 shadow-sm ring-1 ring-[var(--line)]">
      {links.map((link) => {
        const active =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              active
                ? "bg-[var(--ink)] text-[var(--cream)]"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
