// Datamodel voor Aspire. Veldnamen in het Engels (workspace-conventie),
// inhoud/teksten in het Nederlands.

/** Moment op de dag waarop een supplement ingenomen kan worden. */
export type IntakeMoment =
  | "ochtend"
  | "middag"
  | "avond"
  | "nuchter"
  | "bij-maaltijd"
  | "voor-slapen";

export type SupplementCategory =
  | "vitamine"
  | "mineraal"
  | "kruid"
  | "aminozuur"
  | "vetzuur"
  | "enzym"
  | "paddenstoel"
  | "overig";

export type TargetGroup =
  | "algemeen"
  | "kinderen"
  | "sporters"
  | "ouderen"
  | "vrouwen";

export interface Price {
  leverancier: string;
  prijs: number; // in euro
  inhoud: string; // bv. "60 capsules" of "250 ml"
  eenheidsprijs?: string; // bv. "€0,15 per capsule"
  url?: string;
  datum: string; // ISO-datum van prijspeiling
}

export interface Supplement {
  id: string;
  naam: string;
  naamEn?: string;
  categorie: SupplementCategory;
  /** Werkzame stoffen — gebruikt voor overlap-detectie tussen supplementen. */
  werkzameStoffen: string[];
  doseringStandaard: string; // bv. "1000 mg"
  bovengrens?: string; // veilige bovengrens per dag, indien bekend
  innameMomenten: IntakeMoment[];
  innameTips?: string;
  /** Waar het supplement bij kan ondersteunen (vrije tekst, NL). */
  geschiktVoor: string[];
  doelgroepen: TargetGroup[];
  interacties?: string[];
  waarschuwingen?: string[];
  beschrijving: string;
  bronnen?: string[];
  prijzen?: Price[];
}

export type Gender = "man" | "vrouw";

/** Aandoening met bijbehorend supplementenadvies en leefstijltips. */
export interface Condition {
  id: string;
  naam: string;
  beschrijving: string;
  /** Verwijst naar Supplement.id's. */
  supplementIds: string[];
  leefstijlTips: string[];
  bronnen?: string[];
}

/** Eén advies-item uit de leeftijd/geslacht-adviesmodule. */
export interface AdviceItem {
  supplementId: string;
  reden: string;
}
