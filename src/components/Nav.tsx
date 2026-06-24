import Link from "next/link";

const links = [
  { href: "/", label: "Supplementen" },
  { href: "/aandoeningen", label: "Aandoeningen" },
  { href: "/advies", label: "Advies" },
  { href: "/schema", label: "Mijn schema" },
  { href: "/prijzen", label: "Prijzen" },
];

export default function Nav() {
  return (
    <header className="bg-night text-sand">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block text-2xl leading-none">▲</span>
          <span className="text-lg tracking-wide">Aspire Health</span>
        </Link>
        <nav className="flex gap-1 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 hover:bg-night-soft"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
