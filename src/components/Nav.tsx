"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Supplementen" },
  { href: "/aandoeningen", label: "Aandoeningen" },
  { href: "/advies", label: "Advies" },
  { href: "/schema", label: "Mijn schema" },
  { href: "/prijzen", label: "Prijzen" },
];

function isActief(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  return (
    <header className="bg-night text-sand">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 font-semibold"
        >
          <span className="inline-block text-2xl leading-none">▲</span>
          <span className="text-lg tracking-wide">Aspire Health</span>
        </Link>

        {/* Desktop-menu */}
        <nav className="hidden gap-1 text-sm sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-1.5 ${
                isActief(pathname, l.href) ? "bg-night-soft font-medium" : "hover:bg-night-soft"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger (alleen mobiel) */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-night-soft sm:hidden"
        >
          <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobiel uitklapmenu */}
      {open && (
        <nav className="border-t border-night-soft px-4 pb-3 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-3 py-2.5 text-sm ${
                isActief(pathname, l.href) ? "bg-night-soft font-medium" : "hover:bg-night-soft"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
