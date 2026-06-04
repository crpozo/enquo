/* Enquo — content from brand book + current site. */
import type { ReactNode } from "react";

export type Service = {
  num: string;
  title: string;
  desc: string;
  icon: ReactNode;
};

export type Product = {
  num: string;
  name: string;
  tag: string;
  desc: string;
};

export type IndustryVizKind =
  | "wave"
  | "bars"
  | "candles"
  | "grid"
  | "pulse"
  | "network"
  | "arc";

export type Industry = {
  num: string;
  name: string;
  desc: string;
  viz: IndustryVizKind;
};

export type Pillar = {
  num: string;
  title: string;
  body: string;
};

export const ENQUO_SERVICES: Service[] = [
  {
    num: "01",
    title: "Enterprise Technology",
    desc: "Choosing, implementing, and managing technology in a way that fuels growth and innovation.",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M3 10h18M8 20h8M12 16v4" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Data Management",
    desc: "Customized data strategies that address your unique challenges and position your brand for sustained growth.",
    icon: (
      <svg viewBox="0 0 24 24">
        <ellipse cx="12" cy="5" rx="8" ry="2.5" />
        <path d="M4 5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5" />
        <path d="M4 11v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Data Analytics",
    desc: "Cutting-edge analytics & business intelligence that fuel data-driven decisions and operational efficiency.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 21h18M5 17l4-6 4 3 6-9" />
        <circle cx="9" cy="11" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="13" cy="14" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="19" cy="5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Artificial Intelligence",
    desc: "We prepare and optimize your organization to harness AI's full potential, from strategy to deployment.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Brain-Computer Interface",
    desc: "Bridging the gap between the human mind and external devices, the future of human-machine interaction.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M9 4a4 4 0 0 0-4 4v1a3 3 0 0 0 0 6v1a4 4 0 0 0 4 4h1V4H9z" />
        <path d="M15 4a4 4 0 0 1 4 4v1a3 3 0 0 1 0 6v1a4 4 0 0 1-4 4h-1V4h1z" />
        <path d="M12 4v16" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Managed Services",
    desc: "Simplify operations. We handle the heavy lifting for your core technology and data infrastructure needs.",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M22 12h-3M5 12H2M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12M19.07 19.07l-2.12-2.12M7.05 7.05L4.93 4.93" />
      </svg>
    ),
  },
];

export const ENQUO_PRODUCTS: Product[] = [
  { num: "01", name: "Harmony",      tag: "App Modernization",  desc: "Continuous improvement of your software applications." },
  { num: "02", name: "Elevate",      tag: "Migration Framework", desc: "Support any data modernization and migration." },
  { num: "03", name: "VisionX",      tag: "Enterprise Strategy", desc: "A proprietary tool for Enterprise Data Strategy." },
  { num: "04", name: "Sentinel ADV", tag: "Data Validation",     desc: "Auto data validation across heterogeneous data sources." },
  { num: "05", name: "EACS",         tag: "Reconciliation",      desc: "Audit and data reconciliation framework to merge data." },
  { num: "06", name: "DataFuse",     tag: "DB Translation",      desc: "Data structure conversion between databases." },
  { num: "07", name: "GovernX",      tag: "Data Governance",     desc: "Embodies a cutting-edge data governance framework." },
];

export const ENQUO_INDUSTRIES: Industry[] = [
  { num: "01", name: "Consumer, Retail & Logistics", desc: "Connect consumers with products through physical and digital channels.", viz: "wave" },
  { num: "02", name: "Energy & Industrial",          desc: "Energy fuels society, industry builds the foundations of our economy.", viz: "bars" },
  { num: "03", name: "Financial Services",           desc: "Navigate markets, ensure security, maximize returns with intelligent tech.", viz: "candles" },
  { num: "04", name: "Government & Public Sector",   desc: "Serving citizens and promoting well-being through efficient operations.", viz: "grid" },
  { num: "05", name: "Health Care",                  desc: "From diagnosis to treatment, improving human health and well-being.", viz: "pulse" },
  { num: "06", name: "Tech, Telecom & Media",        desc: "Hardware, software, communication, entertainment, keeping the world connected.", viz: "network" },
  { num: "07", name: "Sports",                       desc: "Performance, operations, fan engagement, transforming into intelligent enterprises.", viz: "arc" },
];

export const ENQUO_PILLARS: Pillar[] = [
  {
    num: "01",
    title: "Human Perspective",
    body: "We speak technology in a simple business language. No complications, just honesty, trust and empathy.",
  },
  {
    num: "02",
    title: "Agility & Adaptability",
    body: "We bridge any business need with data solutions, no matter how big or small.",
  },
  {
    num: "03",
    title: "Team of Experts",
    body: "A diverse group of curious problem-solvers, united by a shared vision to make a meaningful impact in society.",
  },
];

export const ENQUO_CLIENTS: string[] = [
  "Northwell", "Verizon", "MetLife", "Citi", "Pfizer", "T-Mobile",
  "Mount Sinai", "Goldman", "Deloitte", "Mastercard", "BNY", "JPMC",
  "Comcast", "ADP", "Bloomberg", "AIG", "Nielsen", "Aetna",
];
