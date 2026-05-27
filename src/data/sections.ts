export type Section = {
  id: string;
  num: string;
  short: string;
};

export const SECTIONS: Section[] = [
  { id: "intro",      num: "00", short: "Intro" },
  { id: "values",     num: "01", short: "Values" },
  { id: "services",   num: "02", short: "Services" },
  { id: "products",   num: "03", short: "Products" },
  { id: "industries", num: "04", short: "Industries" },
  { id: "team",       num: "05", short: "Team" },
  { id: "contact",    num: "06", short: "Contact" },
];
