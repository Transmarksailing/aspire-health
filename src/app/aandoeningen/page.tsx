import Link from "next/link";
import { conditions } from "@/lib/data/conditions";

export default function AandoeningenPage() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Aandoeningen</h1>
      <p className="mb-4 text-sm text-muted">
        Kies een aandoening voor een overzicht van supplementen die er traditioneel bij
        worden ingezet, plus leefstijltips.
      </p>

      <div className="mb-5 rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm">
        ⚕️ <strong>Geen medisch advies.</strong> Bij <strong>ernstige ziektes</strong>{" "}
        (zoals kanker of Alzheimer) geeft Aspire Health bewust géén supplementenadvies.
        Raadpleeg daarvoor altijd je arts of specialist.
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {conditions.map((c) => (
          <Link
            key={c.id}
            href={`/aandoeningen/${c.id}`}
            className="block rounded-xl border border-border bg-card p-4 transition hover:border-primary hover:shadow-sm"
          >
            <h2 className="mb-1 font-semibold">{c.naam}</h2>
            <p className="line-clamp-2 text-sm text-muted">{c.beschrijving}</p>
            <p className="mt-2 text-xs text-primary">{c.supplementIds.length} supplementen →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
