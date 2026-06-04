/* Case studies — single source of truth for /case-studies and /case-studies/:slug */

export type CaseStudy = {
  slug: string;
  num: string;
  industry: string;
  client: string;
  headline: string;
  /** One-line result metrics — used on cards and the detail hero band. */
  result: string;
  duration: string;
  tags: string[];
  /** Detail page — situation paragraphs (what we walked into). */
  situation: string[];
  /** Detail page — approach paragraphs (what we did). */
  approach: string[];
  /** Detail page — outcome bullets (named metrics). */
  outcomes: Array<{ metric: string; label: string }>;
  /** Stack / tools / practices used. */
  stack: string[];
};

export const CASES: CaseStudy[] = [
  {
    slug: "live-broadcast-playoffs",
    num: "01",
    industry: "Sports & Media",
    client: "Live broadcasting platform",
    headline:
      "Replatformed live operations ahead of a 50M-viewer playoff window.",
    result:
      "Zero downtime · Mean time to recovery cut 71% · Cost per stream −34%",
    duration: "11 months · Build + Run",
    tags: ["Platform Engineering", "Managed Operations", "Data Trust"],
    situation: [
      "The client's prior platform had survived two seasons by accident, incidents during live games were absorbed by a 24/7 vendor rotation paid by the minute, and the on-call rotation for the in-house team had quietly become unsustainable. A 50M-viewer playoff bracket was 11 months away. Senior leadership knew the architecture wouldn't survive it.",
      "Three vendors owned overlapping slices of the pipeline. Nobody could answer a single end-to-end question about a stream, origin, encoding, CDN, analytics, without a meeting. Cost per stream had drifted 22% over the prior season with no one accountable for it.",
    ],
    approach: [
      "We took ownership of the operational backbone end-to-end. The first 8 weeks were design + decomposition: every vendor seam mapped, every alarm catalogued, every metric reconciled to a single source of truth. We rewrote the runbooks on the way through, not after.",
      "Build ran in parallel with run. We stood up the new platform on a shadow path for the regular season, dual-running both systems during real live events for 14 weeks. Every incident on the legacy path was an integration test for the replacement. By playoffs, the legacy system was off, and our on-call was the only number that mattered.",
      "Cost work was treated as a first-class workstream from week one. We re-cut the CDN contracts against actual traffic shape (not the salesperson's), automated encoder bitrate selection per device class, and killed two storage tiers we proved nobody was reading from.",
    ],
    outcomes: [
      { metric: "Zero",   label: "Customer-facing downtime through the playoff bracket" },
      { metric: "−71%",   label: "Mean time to recovery vs. prior season" },
      { metric: "−34%",   label: "Cost per stream" },
      { metric: "1",      label: "Accountable team for the full pipeline (was 3 vendors)" },
    ],
    stack: ["Custom encoder pipeline", "Multi-CDN routing", "Observability rebuild", "Cost telemetry"],
  },
  {
    slug: "regional-bank-reconciliation",
    num: "02",
    industry: "Financial Services",
    client: "Regional retail bank",
    headline:
      "Audit-ready reconciliation, line by line, across 14 legacy systems.",
    result: "Audit findings −86% · Reconciliation cycle 7d → 4h",
    duration: "9 months · Design + Build",
    tags: ["Systems Integration", "KPI Governance", "Compliance"],
    situation: [
      "Three consecutive audits had cited the same data lineage finding. The bank's reconciliation cycle was a seven-day human assembly line of CSV exports across 14 systems, including two cores acquired in the last decade that nobody had migrated off.",
      "The CFO needed numbers she could defend on the morning of every audit, not three weeks later. The risk team had stopped trusting the dashboards.",
    ],
    approach: [
      "We designed the reconciliation layer as a contract first, code second. Each balance reported by each system became a typed assertion against a canonical model, every disagreement raised, every reconciliation step logged with the human who touched it.",
      "The 14 systems were integrated under the same contract over four phases, sequenced so the highest-risk regulatory reports landed first. We did not wait for a 'big bang' cutover, each phase generated audit-defensible numbers from week one.",
      "We sat with the audit team during two real audits and let them break it. Each finding became a regression test.",
    ],
    outcomes: [
      { metric: "−86%", label: "Reduction in audit findings over 18 months" },
      { metric: "7d → 4h", label: "Reconciliation cycle compression" },
      { metric: "100%", label: "Reports with auditable lineage to source" },
    ],
    stack: ["Canonical data model", "Contract-tested integrations", "Lineage graph", "Audit replay"],
  },
  {
    slug: "hospital-network-kpis",
    num: "03",
    industry: "Healthcare",
    client: "Hospital network",
    headline:
      "Clinical-grade KPI governance across three acquired institutions.",
    result:
      "Single source of truth for 412 KPIs · Board reports in hours, not weeks",
    duration: "13 months · Design + Build + Run",
    tags: ["Data Foundation", "KPI Governance", "Analytics"],
    situation: [
      "Three institutions had merged on paper but not on data. Each KPI on the board pack had three definitions, three owners, and three calculation methods. Quarterly board prep had become a five-week negotiation about whose number was right.",
      "Clinical KPIs were the highest stakes: readmission rates, infection rates, staffing ratios. Disagreement here doesn't just embarrass leadership, it changes treatment decisions.",
    ],
    approach: [
      "We ran a KPI canon: 412 metrics, one definition each, owned by exactly one role. Definitions were ratified by the clinicians and finance leads together, every disagreement resolved on the record, never deferred.",
      "The data foundation followed the canon, not the reverse. We rebuilt the warehousing layer with KPI definitions as code, lineage end-to-end, and access tied to clinical role. Reports rendered against the canon, never against ad-hoc queries.",
      "We then handed the canon to a permanent governance council with quarterly review and a deprecation process. Nothing on the dashboard exists without an owner.",
    ],
    outcomes: [
      { metric: "412 → 412", label: "KPIs with a single canonical definition" },
      { metric: "5 weeks → 6 hours", label: "Board pack compilation time" },
      { metric: "3 → 1", label: "Versions of clinical truth" },
    ],
    stack: ["KPI-as-code", "Lineage graph", "Role-based access", "Governance council"],
  },
  {
    slug: "ngo-funder-reporting",
    num: "04",
    industry: "Non-Profits",
    client: "Continental advocacy NGO",
    headline:
      "Automated funder reporting so field teams could return to the field.",
    result: "Manual reporting hours −78% · Funder satisfaction +41%",
    duration: "6 months · Process Automation",
    tags: ["Process Automation", "Reporting", "Run"],
    situation: [
      "The NGO served 14 countries and answered to 23 funders, each with a bespoke reporting template. Field staff, the people closest to the mission, were spending 30-40% of their week generating reports.",
      "Errors in manual reporting had cost two funder relationships the previous year. Trust was the issue, not effort.",
    ],
    approach: [
      "We mapped every funder template to a shared evidence model: each claim made in a report points back to operational data that proves it. Reports became projections of the same underlying truth, not separate documents.",
      "Field staff input shifted from writing reports to validating data. The system generates first drafts; humans approve and annotate. Time at desk went down, time in field went up.",
      "We then onboarded each funder to a private dashboard with the same evidence, in real time. Reports stopped being deliverables and started being snapshots of a continuous record.",
    ],
    outcomes: [
      { metric: "−78%", label: "Manual reporting hours per field team" },
      { metric: "+41%", label: "Average funder satisfaction score" },
      { metric: "23", label: "Funder templates served from one evidence base" },
    ],
    stack: ["Evidence-model database", "Template engine", "Live funder portals"],
  },
  {
    slug: "telecom-data-migration",
    num: "05",
    industry: "Tech, Telecom & Media",
    client: "National telecom",
    headline:
      "Migrated 3.2 PB of subscriber data without a single customer-facing incident.",
    result: "Migration window −58% · Customer-impacting incidents: 0",
    duration: "14 months · Build + Run",
    tags: ["Migration", "Data Ops", "Quality Engineering"],
    situation: [
      "The legacy subscriber platform had been declared end-of-life by its vendor 18 months earlier. 3.2 PB of data, billing records, service config, lawful intercept obligations, had to move to a modern stack with no margin for customer impact.",
      "Prior migrations at the company had each lost data. None had been completed without a regulatory disclosure. Leadership had no appetite for a third.",
    ],
    approach: [
      "We treated the migration as a steady-state operation, not a project. The system ran in dual-write for 9 months, with continuous reconciliation between source and target, every disagreement triaged within the hour.",
      "Cutover was a non-event by design. By the time we flipped the read path, the target had served identical reads to the source for 11 weeks in shadow. The cutover window itself was 38 minutes.",
      "Quality engineering was the spine: 100% of reconciliation logic was tested against synthetic and replayed production traffic before each migration phase.",
    ],
    outcomes: [
      { metric: "0", label: "Customer-impacting incidents during 14-month migration" },
      { metric: "−58%", label: "Migration window vs. plan" },
      { metric: "100%", label: "Lawful intercept obligations preserved through cutover" },
    ],
    stack: ["Dual-write architecture", "Continuous reconciliation", "Replay-based testing"],
  },
  {
    slug: "federal-agency-service-desk",
    num: "06",
    industry: "Government & Public Sector",
    client: "Federal-level agency",
    headline:
      "Service desk and case management consolidated under one accountable team.",
    result: "Citizen-facing SLA met 99.4% over 18 months",
    duration: "Ongoing · Run",
    tags: ["Managed Operations", "Process Automation"],
    situation: [
      "Eleven contractors operated nine ticketing systems across the agency's citizen-services arm. SLAs were tracked per-contractor against per-contractor definitions. The citizen-side experience was incoherent: the same person could open three tickets and get three answers depending on which queue they hit.",
      "Two of the contractors had open compliance findings against them. The agency wanted one number it could publish.",
    ],
    approach: [
      "We consolidated nine systems into one queue and one definition of SLA, citizen-facing, not contractor-facing. We took over operations of that queue end-to-end under a single accountability.",
      "The 11 contractors' workflows were preserved internally; only the citizen-facing surface and the metric were unified. We didn't try to rebuild what was working, we made the system answer for itself, not for each contractor.",
      "Eighteen months in, we still own the on-call. The number publishes monthly to the agency's transparency dashboard.",
    ],
    outcomes: [
      { metric: "99.4%", label: "Citizen-facing SLA over 18 months" },
      { metric: "9 → 1", label: "Ticketing queues from the citizen's perspective" },
      { metric: "1", label: "Accountable team (was 11 contractors)" },
    ],
    stack: ["Unified queue layer", "Workflow preservation adapters", "Public SLA telemetry"],
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
