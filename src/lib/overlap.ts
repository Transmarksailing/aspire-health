import type { Supplement, IntakeMoment } from "@/lib/types";
import { supplements } from "@/lib/data/supplements";

export interface OverlapWarning {
  stof: string;
  supplementen: string[]; // namen van de supplementen die deze stof delen
}

/** Vind werkzame stoffen die in meer dan één gekozen supplement voorkomen. */
export function findOverlap(selected: Supplement[]): OverlapWarning[] {
  const byStof = new Map<string, string[]>();
  for (const s of selected) {
    for (const stof of s.werkzameStoffen) {
      const list = byStof.get(stof) ?? [];
      list.push(s.naam);
      byStof.set(stof, list);
    }
  }
  const warnings: OverlapWarning[] = [];
  for (const [stof, namen] of byStof) {
    if (namen.length > 1) warnings.push({ stof, supplementen: namen });
  }
  return warnings;
}

export const MOMENT_LABELS: Record<IntakeMoment, string> = {
  ochtend: "Ochtend",
  middag: "Middag",
  avond: "Avond",
  nuchter: "Nuchter (lege maag)",
  "bij-maaltijd": "Bij de maaltijd",
  "voor-slapen": "Voor het slapen",
};

export const MOMENT_ORDER: IntakeMoment[] = [
  "nuchter",
  "ochtend",
  "bij-maaltijd",
  "middag",
  "avond",
  "voor-slapen",
];

/** Groepeer gekozen supplementen per inname-moment voor een dagschema. */
export function buildSchedule(
  selected: Supplement[],
): { moment: IntakeMoment; supplementen: Supplement[] }[] {
  return MOMENT_ORDER.map((moment) => ({
    moment,
    supplementen: selected.filter((s) => s.innameMomenten.includes(moment)),
  })).filter((g) => g.supplementen.length > 0);
}

export function getByIds(ids: string[]): Supplement[] {
  return ids
    .map((id) => supplements.find((s) => s.id === id))
    .filter((s): s is Supplement => Boolean(s));
}
