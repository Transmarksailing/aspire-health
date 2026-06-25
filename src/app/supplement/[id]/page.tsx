import Link from "next/link";
import { notFound } from "next/navigation";
import { supplements, getSupplement } from "@/lib/data/supplements";
import { MOMENT_LABELS } from "@/lib/overlap";
import { suppliers } from "@/lib/suppliers";
import { interactionsFor, interactionLabel } from "@/lib/data/interactions";
import { getFotos, amazonLink } from "@/lib/data/fotos";
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

      {(() => {
        const f = getFotos(s.id);
        if (!f || f.images.length === 0) return null;
        return (
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-2">
              {f.images.slice(0, 3).map((src, i) => (
                <a
                  key={i}
                  href={amazonLink(s)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-xl border border-border bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${s.naam} foto ${i + 1}`}
                    loading="lazy"
                    className="aspect-square w-full object-contain p-2"
                  />
                </a>
              ))}
            </div>
            {f.brand && (
              <p className="mt-1 text-[11px] text-muted">
                Voorbeeldproduct: {f.brand} · foto&apos;s via Amazon.es
              </p>
            )}
          </div>
        );
      })()}

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

      {(() => {
        const combis = interactionsFor(s.id);
        if (combis.length === 0) return null;
        return (
          <div className="mt-4 rounded-xl border border-border bg-card p-4">
            <h3 className="mb-3 font-semibold">Combinaties met andere supplementen</h3>
            <ul className="space-y-2">
              {combis.map((c) => {
                const ander = getSupplement(c.other);
                const meta = interactionLabel(c.type);
                const kleur =
                  c.type === "synergie"
                    ? "text-success"
                    : c.type === "vermijden"
                      ? "text-danger"
                      : "text-warning";
                return (
                  <li key={c.other + c.type} className="text-sm">
                    <span className={`font-medium ${kleur}`}>
                      {meta.emoji} {meta.label}:
                    </span>{" "}
                    <Link href={`/supplement/${c.other}`} className="underline hover:text-primary">
                      {ander?.naam ?? c.other}
                    </Link>
                    <span className="text-muted"> — {c.uitleg}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })()}

      <div className="mt-4 rounded-xl border border-border bg-card p-4">
        <h3 className="mb-3 font-semibold">Kopen bij</h3>
        <div className="flex flex-wrap gap-2">
          {suppliers(s).map((l) => (
            <a
              key={l.naam}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-sm hover:border-primary hover:bg-sand"
            >
              {l.naam} ↗
            </a>
          ))}
        </div>
        <a
          href={amazonLink(s)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
        >
          🛒 Bekijk op Amazon.es
        </a>
        <p className="mt-2 text-[11px] text-muted">
          Zoeklinks naar leveranciers. Aspire Wealth verkoopt zelf niets en ontvangt geen
          provisie (tenzij later anders vermeld).
        </p>
      </div>

      {(() => {
        // Combineer handmatige prijzen met de gescrapete Amazon.es-prijs, goedkoopste eerst.
        const f = getFotos(s.id);
        const rijen: { leverancier: string; inhoud: string; prijs: number; url?: string }[] = [];
        if (f?.prijs != null) {
          rijen.push({ leverancier: "Amazon.es", inhoud: f.brand ?? "—", prijs: f.prijs, url: f.amazonUrl });
        }
        for (const p of s.prijzen ?? []) {
          rijen.push({ leverancier: p.leverancier, inhoud: p.inhoud, prijs: p.prijs, url: p.url });
        }
        if (rijen.length === 0) return null;
        rijen.sort((a, b) => a.prijs - b.prijs);
        return (
          <div className="mt-4">
            <h3 className="mb-2 font-semibold">Prijzen <span className="text-xs font-normal text-muted">(goedkoopste eerst)</span></h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted">
                  <th className="py-1">Leverancier</th>
                  <th>Merk / inhoud</th>
                  <th>Prijs</th>
                </tr>
              </thead>
              <tbody>
                {rijen.map((p, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-1">
                      {p.url ? (
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {p.leverancier} ↗
                        </a>
                      ) : (
                        p.leverancier
                      )}
                    </td>
                    <td className="text-muted">{p.inhoud}</td>
                    <td className={i === 0 ? "font-semibold text-success" : ""}>
                      €{p.prijs.toFixed(2)}
                      {i === 0 && " ✓"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-1 text-[11px] text-muted">Amazon.es-prijs automatisch opgehaald; kan afwijken. Vergelijk gerust via de leverancier-links.</p>
          </div>
        );
      })()}
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
