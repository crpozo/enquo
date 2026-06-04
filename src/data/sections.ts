export type Section = {
  id: string;
  num: string;
  short: string;
};

export const SECTIONS: Section[] = [
  { id: "intro",      num: "00", short: "Intro" },
  { id: "fix",        num: "01", short: "What We Fix" },
  { id: "how",        num: "02", short: "How We Work" },
  { id: "services",   num: "03", short: "What We Do" },
  { id: "cases",      num: "04", short: "Case Studies" },
  { id: "industries", num: "05", short: "Industries" },
  { id: "contact",    num: "06", short: "Contact" },
];
