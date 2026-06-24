import type { AdviceItem, Gender, IntakeMoment } from "@/lib/types";

// Eenvoudige, regelgebaseerde adviesmodule op basis van leeftijd en geslacht.
// Informatief, GEEN medisch advies. Houdt geen rekening met persoonlijke situatie,
// medicijngebruik of aandoeningen — daarvoor: raadpleeg een arts.

export function getAdvice(age: number, gender: Gender): AdviceItem[] {
  const items: AdviceItem[] = [];
  const add = (supplementId: string, reden: string) => {
    if (!items.some((i) => i.supplementId === supplementId)) {
      items.push({ supplementId, reden });
    }
  };

  // Basis voor (vrijwel) iedereen
  add("vitamine-d3", "Basis voor botten en immuunsysteem, zeker in de winter.");
  add("omega-3", "Ondersteunt hart, hersenen en ogen.");
  add("magnesium", "Voor energie, spieren en slaap.");

  if (age < 18) {
    add("vitamine-c", "Ondersteunt de weerstand tijdens de groei.");
    // Voor kinderen bewust beperkt — overleg met (huis)arts/jeugdarts.
    return items;
  }

  // Volwassenen
  add("vitamine-c", "Voor weerstand en huid.");

  if (gender === "vrouw") {
    if (age < 51) {
      add("ijzer", "Vrouwen vóór de overgang hebben vaker een verhoogde ijzerbehoefte.");
      add("foliumzuur", "Belangrijk bij een (mogelijke) kinderwens.");
    }
    if (age >= 45) {
      add("black-cohosh", "Ondersteuning bij overgangsklachten.");
      add("calcium", "Voor botgezondheid rond/na de overgang.");
      add("vitamine-k2", "Stuurt calcium naar de botten.");
    }
    add("collageen", "Voor huid, haar en gewrichten.");
  }

  if (gender === "man" && age >= 50) {
    add("saw-palmetto", "Ondersteuning van de prostaat bij mannen vanaf ~50 jaar.");
  }

  // Ouderen
  if (age >= 65) {
    add("vitamine-b12", "Opname van B12 neemt af met de leeftijd.");
    add("q10", "Lichaamseigen Q10 daalt met de jaren; voor energie en hart.");
    add("vitamine-k2", "Samen met D3 voor sterke botten.");
    add("calcium", "Voor botgezondheid op latere leeftijd.");
  }

  return items;
}

// Toon de inname-momenten van een supplement als leesbaar dagdeel.
const MOMENT_TO_DAGDEEL: Record<IntakeMoment, "Ochtend" | "Middag" | "Avond"> = {
  nuchter: "Ochtend",
  ochtend: "Ochtend",
  "bij-maaltijd": "Ochtend",
  middag: "Middag",
  avond: "Avond",
  "voor-slapen": "Avond",
};

export const DAGDELEN: ("Ochtend" | "Middag" | "Avond")[] = ["Ochtend", "Middag", "Avond"];

/** Primair dagdeel van een supplement (op basis van het eerste inname-moment). */
export function primairDagdeel(momenten: IntakeMoment[]): "Ochtend" | "Middag" | "Avond" {
  return momenten.length > 0 ? MOMENT_TO_DAGDEEL[momenten[0]] : "Ochtend";
}
