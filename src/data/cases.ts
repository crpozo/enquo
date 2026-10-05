/* Case studies — single source of truth for /case-studies and /case-studies/:slug.
   Three NCAA engagements (Sports & Media), per the 10/09 board. Oil & Gas and
   Financial Services cases are coming and slot into the same shape. */

export type Step = string;
export type Bullet = { label: string; text: string };
export type Metric = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  num: string;
  industry: string;
  client: string;
  /** Practice area shown under the client name on the hero. */
  category: string;
  /** Headline metric, e.g. "7 days → under 1 hour". */
  metric: string;
  /** Short metric for cards. */
  metricShort: string;
  headline: string;
  cardHeadline: string;
  intro: string;
  capabilities: string[];
  /** Card metadata line. */
  tags: string[];
  /** Photo (video slot later). */
  image: string;
  challenge: { title: string; bullets: Bullet[] };
  flow: Step[];
  approach: { title: string; text: string };
  before: Step[];
  after: Step[];
  impact: Metric[];
  delivered: Bullet[];
  technologies: string[];
  businessImpact: { title: string; text: string };
};

export const CASES: CaseStudy[] = [
  {
    slug: "ncaa-executive-intelligence",
    num: "01",
    industry: "Sports & Media",
    client: "NCAA",
    category: "Executive Intelligence",
    metric: "7 days → under 1 hour",
    metricShort: "7 days → under 1 hour",
    headline: "Executive reporting rebuilt around one trusted view.",
    cardHeadline: "Executive reporting built around one trusted view.",
    intro:
      "NCAA needed a faster, more reliable way to turn fragmented data and inconsistent KPIs into executive reporting. Enquo built a governed intelligence platform that gave leadership real-time visibility from a trusted data foundation.",
    capabilities: ["Data Engineering", "KPI Governance", "Executive Reporting", "Analytics"],
    tags: ["Data Engineering", "Analytics", "KPI Governance"],
    image: "img/heroes/insights.webp",
    challenge: {
      title: "Reporting took a week. The data behind it was fragmented.",
      bullets: [
        { label: "Fragmented data", text: "Critical information was spread across disconnected sources." },
        { label: "Inconsistent KPIs", text: "Teams were working with different definitions of key metrics." },
        { label: "Manual reporting", text: "KPI validation and reporting preparation slowed access to executive information." },
      ],
    },
    flow: ["Disconnected data", "Manual KPI validation", "Inconsistent reporting", "7 days to executive visibility"],
    approach: {
      title: "A governed foundation for executive reporting.",
      text: "Enquo unified the underlying data, established consistent KPIs, and built an executive reporting layer that made trusted information available in real time.",
    },
    before: ["Disconnected data", "Manual KPI validation", "Inconsistent metrics", "Delayed executive decisions"],
    after: ["Unified data", "Consistent KPIs", "Real-time executive visibility", "Faster decision-making"],
    impact: [
      { value: "7 days → <1 hour", label: "Executive reporting time" },
      { value: "90%", label: "Reduction in reporting time" },
      { value: "$420K", label: "Annual productivity savings" },
      { value: "1", label: "Trusted KPI framework" },
    ],
    delivered: [
      { label: "KPI Governance", text: "Established a consistent framework for executive metrics." },
      { label: "Data Engineering", text: "Unified the data foundation behind reporting." },
      { label: "Executive Reporting & Analytics", text: "Created the reporting experience that gave leadership real-time visibility." },
    ],
    technologies: [],
    businessImpact: {
      title: "Trusted information became available when decisions were being made.",
      text: "Leadership gained a consistent view of performance without waiting days for data reconciliation and reporting preparation.",
    },
  },
  {
    slug: "ncaa-executive-reporting",
    num: "02",
    industry: "Sports & Media",
    client: "NCAA",
    category: "Executive Reporting",
    metric: "65% less reporting preparation time",
    metricShort: "65% less reporting prep time",
    headline: "One trusted executive view across the organization.",
    cardHeadline: "One trusted view of executive KPIs.",
    intro:
      "NCAA needed to standardize executive KPIs across inconsistent data sources and reduce the manual work required to prepare reporting. Enquo created a unified reporting foundation built around consistent metrics and a single source of truth.",
    capabilities: ["KPI Governance", "Data Engineering", "Executive Reporting", "Analytics"],
    tags: ["Data Engineering", "Analytics", "KPI Governance"],
    image: "img/lifecycle/run.webp",
    challenge: {
      title: "Executive reporting depended on manual reconciliation.",
      bullets: [
        { label: "Inconsistent data", text: "Reporting relied on information that was not aligned across sources." },
        { label: "Manual reconciliation", text: "Teams had to reconcile information before it could be used confidently." },
        { label: "Delayed reporting", text: "Preparing executive reporting took between five and seven days." },
      ],
    },
    flow: ["Inconsistent data", "Manual reconciliation", "Reporting preparation", "5–7 days to deliver"],
    approach: {
      title: "Standardized KPIs built on a single source of truth.",
      text: "Enquo established a consistent foundation for executive KPIs, bringing data and reporting together to reduce reconciliation work and give leadership faster access to trusted information.",
    },
    before: ["Inconsistent data", "Manual reconciliation", "5–7 day reporting cycle", "Delayed visibility"],
    after: ["Single source of truth", "Standardized executive KPIs", "Real-time visibility", "Faster decisions"],
    impact: [
      { value: "65%", label: "Reduction in reporting preparation time" },
      { value: "5–7 days → <2 days", label: "Reporting preparation" },
      { value: "$420K", label: "Annual productivity savings" },
      { value: "1", label: "Trusted source for executive KPIs" },
    ],
    delivered: [
      { label: "KPI Governance", text: "Standardized the metrics used for executive reporting." },
      { label: "Data Engineering", text: "Created the data foundation behind a single trusted source." },
      { label: "Executive Reporting & Analytics", text: "Made consistent information available to leadership with less preparation." },
    ],
    technologies: [],
    businessImpact: {
      title: "Less time preparing reports. Faster access to the information behind decisions.",
      text: "A standardized KPI foundation reduced reporting preparation and gave leadership a consistent view of performance.",
    },
  },
  {
    slug: "ncaa-host-bidding",
    num: "03",
    industry: "Sports & Media",
    client: "NCAA",
    category: "Process Automation",
    metric: "70% less manual processing",
    metricShort: "70% less manual processing",
    headline: "Championship host bidding, digitized end to end.",
    cardHeadline: "Championship host bidding, digitized end to end.",
    intro:
      "NCAA needed to modernize a bid lifecycle that depended on legacy systems, spreadsheets, email chains, and fragmented workflows. Enquo built a unified digital portal that brought the process, data, and approvals into one governed environment.",
    capabilities: ["Process Automation", "Application Development", "Data Integration", "Enterprise Integration"],
    tags: ["Process Automation", "Data Integration", "Application Development"],
    image: "img/industries/sports.webp",
    challenge: {
      title: "A critical process was spread across systems, spreadsheets, and email.",
      bullets: [
        { label: "Legacy systems", text: "Existing technology made the bidding lifecycle difficult to manage as one connected process." },
        { label: "Manual processing", text: "Spreadsheets, email chains, and fragmented workflows carried significant parts of the work." },
        { label: "Delayed approvals", text: "Disconnected processes slowed progress through the bid lifecycle." },
      ],
    },
    flow: ["Legacy systems", "Spreadsheets + email chains", "Fragmented workflows", "Delayed approvals"],
    approach: {
      title: "One digital portal for the full bid lifecycle.",
      text: "Enquo digitized host bid management through a centralized portal, connecting data and workflows while automating key steps across the process. The new environment gave teams real-time visibility into a governed and transparent bid lifecycle.",
    },
    before: ["Legacy systems", "Manual processing", "Fragmented workflows", "Delayed approvals"],
    after: ["Unified digital portal", "Centralized data", "Automated workflows", "Real-time visibility"],
    impact: [
      { value: "70%", label: "Reduction in manual processing" },
      { value: "2–3 FTE", label: "Equivalent productivity capacity unlocked" },
      { value: "100%", label: "Governed and transparent bid management" },
    ],
    delivered: [
      { label: "Digital Strategy & Solution Architecture", text: "Defined the foundation for the modernized bid lifecycle." },
      { label: "BPM Platform Implementation", text: "Implemented the digital workflow environment in Pega." },
      { label: "Data Integration", text: "Connected data for reporting and analytics." },
      { label: "Enterprise Integration & API Development", text: "Connected the portal with the systems required across the process." },
    ],
    technologies: ["Pega"],
    businessImpact: {
      title: "A fragmented process became a connected, transparent digital workflow.",
      text: "Teams gained one environment for managing bids end to end, with less manual processing and greater visibility across the lifecycle.",
    },
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
