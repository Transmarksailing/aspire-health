import Link from "next/link";
import { notFound } from "next/navigation";
import { supplements, getSupplement } from "@/lib/data/supplements";
import { MOMENT_LABELS } from "@/lib/overlap";
import AddToSchema from "@/components/AddToSchema";

// Genereer een statische pagina voor elk supplement (nodig voor GitHub Pages).
export function generateStaticParams() {
  return supplements.map((s) => ({ id: s.id }));
}

export default async function SupplementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const s = getSupplement(id);
  if (!s) notFound();

  return (
    <article>
      <Link href="/" className="text-sm text-primary hover:underline">
        ← Terug naar overzicht
      </Link>

      <div className="mt-3 mb-2 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{s.naam}</h1>
          {s.naamEn && <p className="text-sm text-muted">{s.naamEn}</p>}
        </div>
        <AddToSchema id={s.id} />
      </div>

      <p className="mb-5 text-foreground">{s.beschrijving}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card titel="Dosering">
          <p>{s.doseringStandaard}</p>
          {s.bovengrens && (
            <p className="mt-1 text-sm text-warning">Bovengrens: {s.bovengrens}</p>
          )}
        </Card>

        <Card titel="Wanneer innemen">
          <ul className="flex flex-wrap gap-1">
            {s.innameMomenten.map((m) => (
              <li key={m} className="rounded bg-sand px-2 py-0.5 text-sm">
                {MOMENT_LABELS[m]}
              </li>
            ))}
          </ul>
          {s.innameTips && <p className="mt-2 text-sm text-muted">💡 {s.innameTips}</p>}
        </Card>

        <Card titel="Goed voor">
          <div className="flex flex-wrap gap-1">
            {s.geschiktVoor.map((g) => (
              <span key={g} className="rounded bg-primary-light/40 px-2 py-0.5 text-sm">
                {g}
              </span>
            ))}
          </div>
        </Card>

        <Card titel="Werkzame stoffen">
          <div className="flex flex-wrap gap-1">
            {s.werkzameStoffen.map((w) => (
              <span key={w} className="rounded border border-border px-2 py-0.5 text-sm">
                {w}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {s.waarschuwingen && s.waarschuwingen.length > 0 && (
        <div className="mt-4 rounded-xl border border-danger/30 bg-danger/5 p-4">
          <h3 className="mb-1 font-semibold text-danger">⚠️ Let op</h3>
          <ul className="list-inside list-disc text-sm">
            {s.waarschuwingen.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {s.prijzen && s.prijzen.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 font-semibold">Prijzen</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted">
                <th className="py-1">Leverancier</th>
                <th>Inhoud</th>
                <th>Prijs</th>
                <th>Per stuk</th>
              </tr>
            </thead>
            <tbody>
              {s.prijzen.map((p, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-1">{p.leverancier}</td>
                  <td>{p.inhoud}</td>
                  <td>€{p.prijs.toFixed(2)}</td>
                  <td className="text-muted">{p.eenheidsprijs ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}

function Card({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
        {titel}
      </h3>
      {children}
    </div>
  );
}
