import Link from "next/link";
import { notFound } from "next/navigation";
import { conditions, getCondition } from "@/lib/data/conditions";
import { getSupplement } from "@/lib/data/supplements";
import SupplementSchedule from "@/components/SupplementSchedule";
import type { ScheduleEntry } from "@/components/SupplementSchedule";

export function generateStaticParams() {
  return conditions.map((c) => ({ id: c.id }));
}

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = getCondition(id);
  if (!c) notFound();

  const entries: ScheduleEntry[] = c.supplementIds
    .map((sid) => getSupplement(sid))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({ supplement: s }));

  return (
    <article>
      <Link href="/aandoeningen" className="text-sm text-primary hover:underline">
        ← Alle aandoeningen
      </Link>

      <h1 className="mt-3 mb-1 text-2xl font-bold">{c.naam}</h1>
      <p className="mb-5 text-foreground">{c.beschrijving}</p>

      <h2 className="mb-2 text-lg font-semibold">Aanbevolen supplementen — en wanneer</h2>
      <SupplementSchedule entries={entries} />

      <div className="mt-6 rounded-xl border border-border bg-sand p-4">
        <h2 className="mb-2 font-semibold">Leefstijltips</h2>
        <ul className="list-inside list-disc space-y-1 text-sm">
          {c.leefstijlTips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-xs text-muted">
        ⚕️ Informatief, geen medisch advies. Overleg bij klachten, medicijngebruik of twijfel
        altijd met je arts.
      </p>
    </article>
  );
}
