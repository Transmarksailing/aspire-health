// Combinaties tussen supplementen: versterkend (synergie), beter vermijden,
// of spreiden in tijd (concurreren om opname). Informatief, geen medisch advies.
// Verwijst naar Supplement.id's.

export type InteractionType = "synergie" | "vermijden" | "spreiden";

export interface Interaction {
  a: string;
  b: string;
  type: InteractionType;
  uitleg: string;
}

export const interactions: Interaction[] = [
  // --- Synergie: versterken elkaar ---
  {
    a: "vitamine-d3",
    b: "vitamine-k2",
    type: "synergie",
    uitleg: "K2 stuurt het calcium dat D3 helpt opnemen naar de botten (niet de aderen).",
  },
  {
    a: "vitamine-d3",
    b: "magnesium",
    type: "synergie",
    uitleg: "Magnesium is nodig om vitamine D in het lichaam te activeren.",
  },
  {
    a: "calcium",
    b: "vitamine-d3",
    type: "synergie",
    uitleg: "Vitamine D3 verbetert de opname van calcium.",
  },
  {
    a: "calcium",
    b: "vitamine-k2",
    type: "synergie",
    uitleg: "K2 dirigeert calcium naar de botten.",
  },
  {
    a: "ijzer",
    b: "vitamine-c",
    type: "synergie",
    uitleg: "Vitamine C verhoogt de opname van ijzer aanzienlijk.",
  },
  {
    a: "collageen",
    b: "vitamine-c",
    type: "synergie",
    uitleg: "Vitamine C is nodig voor de aanmaak van collageen.",
  },
  {
    a: "curcumine",
    b: "omega-3",
    type: "synergie",
    uitleg: "Werken beide ontstekingsremmend en vullen elkaar aan.",
  },
  {
    a: "zink",
    b: "vitamine-c",
    type: "synergie",
    uitleg: "Klassieke combinatie ter ondersteuning van de weerstand.",
  },
  {
    a: "probiotica",
    b: "psyllium",
    type: "synergie",
    uitleg: "Vezels (psyllium) voeden de goede darmbacteriën (prebiotisch effect).",
  },
  {
    a: "magnesium",
    b: "ashwagandha",
    type: "synergie",
    uitleg: "Beide ondersteunen ontspanning en slaap.",
  },

  // --- Vermijden / voorzichtig: effecten versterken elkaar ongewenst ---
  {
    a: "nattokinase",
    b: "omega-3",
    type: "vermijden",
    uitleg: "Beide kunnen bloedverdunnend werken — samen verhoogd bloedingsrisico.",
  },
  {
    a: "nattokinase",
    b: "ginkgo-biloba",
    type: "vermijden",
    uitleg: "Beide kunnen bloedverdunnend werken — samen verhoogd bloedingsrisico.",
  },
  {
    a: "nattokinase",
    b: "knoflook",
    type: "vermijden",
    uitleg: "Beide kunnen bloedverdunnend werken — samen verhoogd bloedingsrisico.",
  },
  {
    a: "ginkgo-biloba",
    b: "knoflook",
    type: "vermijden",
    uitleg: "Beide kunnen bloedverdunnend werken — voorzichtig combineren.",
  },
  {
    a: "melatonine",
    b: "cbd",
    type: "vermijden",
    uitleg: "Beide werken kalmerend — samen kan dit te veel versuffing geven.",
  },
  {
    a: "valeriaan",
    b: "cbd",
    type: "vermijden",
    uitleg: "Beide werken kalmerend — samen kan dit te veel versuffing geven.",
  },
  {
    a: "melatonine",
    b: "valeriaan",
    type: "vermijden",
    uitleg: "Beide bevorderen slaap — combineer voorzichtig en laag gedoseerd.",
  },

  // --- Spreiden: concurreren om opname, niet tegelijk innemen ---
  {
    a: "calcium",
    b: "ijzer",
    type: "spreiden",
    uitleg: "Concurreren om opname — neem ze enkele uren apart.",
  },
  {
    a: "zink",
    b: "ijzer",
    type: "spreiden",
    uitleg: "Concurreren om opname — neem ze enkele uren apart.",
  },
  {
    a: "calcium",
    b: "zink",
    type: "spreiden",
    uitleg: "Hoog gedoseerd calcium kan de zinkopname remmen — apart innemen.",
  },
  {
    a: "ijzer",
    b: "groene-thee",
    type: "spreiden",
    uitleg: "Tannines in groene thee remmen de ijzeropname — niet samen innemen.",
  },
];

const LABELS: Record<InteractionType, { label: string; emoji: string }> = {
  synergie: { label: "Versterkt elkaar", emoji: "🤝" },
  vermijden: { label: "Beter niet samen", emoji: "⚠️" },
  spreiden: { label: "Apart innemen", emoji: "⏱️" },
};

export function interactionLabel(type: InteractionType) {
  return LABELS[type];
}

/** Alle interacties waar dit supplement bij betrokken is (met de 'andere' id). */
export function interactionsFor(id: string): { other: string; type: InteractionType; uitleg: string }[] {
  return interactions
    .filter((i) => i.a === id || i.b === id)
    .map((i) => ({ other: i.a === id ? i.b : i.a, type: i.type, uitleg: i.uitleg }));
}

/** Interacties tussen supplementen die állebei in de gegeven set zitten. */
export function interactionsAmong(ids: string[]): Interaction[] {
  const set = new Set(ids);
  return interactions.filter((i) => set.has(i.a) && set.has(i.b));
}
