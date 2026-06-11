import { useMemo, useState } from "react";

import { FinalCTA } from "../components/sections/FinalCTA";
import { PageHeroArt } from "../components/sections/PageHeroArt";
import { useReveal } from "../hooks/useReveal";

/* ============================================================
   Catalog — services the client can drag into the workflow.
   `logo` points at a real partner mark in /public/img/partners
   (rendered as a logo block); services without one fall back to a
   monogram tile.
   ============================================================ */

type Cat = "Cloud" | "Data" | "Productivity" | "Marketing" | "CRM" | "BI";

type Svc = { id: string; name: string; cat: Cat; logo?: string };

const SERVICES: Svc[] = [
  { id: "aws",        name: "AWS",             cat: "Cloud" },
  { id: "azure",      name: "Azure",           cat: "Cloud",        logo: "azure" },
  { id: "snowflake",  name: "Snowflake",       cat: "Data",         logo: "snowflake" },
  { id: "redshift",   name: "Amazon Redshift", cat: "Data",         logo: "redshift" },
  { id: "dbt",        name: "dbt",             cat: "Data",         logo: "dbt" },
  { id: "gmail",      name: "Gmail",           cat: "Productivity" },
  { id: "gcal",       name: "Google Calendar", cat: "Productivity" },
  { id: "meta",       name: "Meta Ads",        cat: "Marketing" },
  { id: "salesforce", name: "Salesforce",      cat: "CRM",          logo: "salesforce" },
  { id: "servicenow", name: "ServiceNow",      cat: "CRM",          logo: "servicenow" },
  { id: "tableau",    name: "Tableau",         cat: "BI",           logo: "tableau" },
  { id: "qualtrics",  name: "Qualtrics",       cat: "BI",           logo: "qualtrics" },
];

const GOALS = [
  "One source of truth",
  "Automated reporting",
  "Real-time visibility",
  "Cost control",
  "Customer 360",
  "AI-assisted operations",
];

const CAT_ACCENT: Record<Cat, string> = {
  Cloud: "#7C3AED",
  Data: "#2DD4BF",
  Productivity: "#C7B6FF",
  Marketing: "#F472B6",
  CRM: "#FB923C",
  BI: "#60A5FA",
};

/* Deterministic pseudo-data so the dashboard reacts to the selection
   without ever looking random between re-renders. */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
const n = (seed: string, min: number, max: number) =>
  min + (hash(seed) % (max - min + 1));
const series = (seed: string, points: number, min: number, max: number) =>
  Array.from({ length: points }, (_, i) => n(seed + ":" + i, min, max));

/* ============================================================
   Tiny SVG charts (no deps)
   ============================================================ */

function LineChart({ data, accent }: { data: number[]; accent: string }) {
  const w = 320, h = 90;
  const max = Math.max(...data), min = Math.min(...data);
  const x = (i: number) => (i / (data.length - 1)) * w;
  const y = (v: number) => h - ((v - min) / (max - min || 1)) * (h - 12) - 6;
  const d = data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
  return (
    <svg className="demo-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={accent} opacity="0.12" />
      <path d={d} fill="none" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function BarChart({ data, accent }: { data: number[]; accent: string }) {
  const w = 320, h = 90;
  const max = Math.max(...data);
  const bw = w / data.length - 6;
  return (
    <svg className="demo-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      {data.map((v, i) => {
        const bh = (v / max) * (h - 10);
        return <rect key={i} x={i * (bw + 6)} y={h - bh} width={bw} height={bh} rx="2" fill={accent} opacity={0.35 + 0.65 * (v / max)} />;
      })}
    </svg>
  );
}

function Donut({ value, accent }: { value: number; accent: string }) {
  const r = 30, c = 2 * Math.PI * r;
  return (
    <svg className="demo-donut" viewBox="0 0 90 90" aria-hidden="true">
      <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="9" />
      <circle cx="45" cy="45" r={r} fill="none" stroke={accent} strokeWidth="9"
        strokeDasharray={`${(value / 100) * c} ${c}`} strokeLinecap="round" transform="rotate(-90 45 45)" />
      <text x="45" y="50" textAnchor="middle" className="demo-donut__label">{value}%</text>
    </svg>
  );
}

/* ============================================================
   Widget model — one card per active category
   ============================================================ */

type Widget = {
  key: string; title: string; source: string; accent: string;
  kpi: string; kpiLabel: string; delta?: string;
  chart: "line" | "bars" | "donut" | "feed"; data: number[]; feed?: string[];
};

function widgetsFor(selected: Svc[]): Widget[] {
  const out: Widget[] = [];
  const cats = new Set(selected.map((s) => s.cat));
  const names = (c: Cat) => selected.filter((s) => s.cat === c).map((s) => s.name).join(" + ");
  const seed = selected.map((s) => s.id).sort().join("|");

  if (cats.has("Cloud"))
    out.push({ key: "cloud", title: "Cloud spend & uptime", source: names("Cloud"), accent: CAT_ACCENT.Cloud,
      kpi: `$${n(seed + "spend", 38, 92)}k`, kpiLabel: `monthly · uptime 99.9${n(seed + "up", 1, 8)}%`,
      delta: `−${n(seed + "sd", 4, 19)}%`, chart: "line", data: series(seed + "cloud", 12, 30, 95) });
  if (cats.has("Data"))
    out.push({ key: "data", title: "Pipeline health", source: names("Data"), accent: CAT_ACCENT.Data,
      kpi: `${n(seed + "fresh", 4, 18)} min`, kpiLabel: "data freshness · sources reconciled",
      delta: "all green", chart: "bars", data: series(seed + "rows", 10, 20, 100) });
  if (cats.has("Productivity"))
    out.push({ key: "prod", title: "Ops automation", source: names("Productivity"), accent: CAT_ACCENT.Productivity,
      kpi: `${n(seed + "hrs", 14, 60)} h`, kpiLabel: "manual work removed this week", chart: "feed", data: [],
      feed: [`${n(seed + "mail", 120, 900)} emails triaged into the CRM`,
             `${n(seed + "meet", 12, 80)} meetings auto-scheduled`,
             `${n(seed + "rep", 3, 14)} weekly reports sent automatically`] });
  if (cats.has("Marketing"))
    out.push({ key: "mkt", title: "Campaign performance", source: names("Marketing"), accent: CAT_ACCENT.Marketing,
      kpi: `${(n(seed + "roas", 21, 58) / 10).toFixed(1)}×`, kpiLabel: "blended ROAS across campaigns",
      delta: `+${n(seed + "md", 6, 24)}%`, chart: "bars", data: series(seed + "camp", 8, 15, 100) });
  if (cats.has("CRM"))
    out.push({ key: "crm", title: "Revenue pipeline", source: names("CRM"), accent: CAT_ACCENT.CRM,
      kpi: `$${(n(seed + "pipe", 12, 48) / 10).toFixed(1)}M`, kpiLabel: "open pipeline · reconciled daily",
      delta: `+${n(seed + "cd", 5, 18)}%`, chart: "line", data: series(seed + "deals", 12, 20, 90) });
  if (cats.has("BI"))
    out.push({ key: "bi", title: "Decision adoption", source: names("BI"), accent: CAT_ACCENT.BI,
      kpi: `${n(seed + "adopt", 62, 97)}%`, kpiLabel: "leadership on the same numbers",
      chart: "donut", data: [n(seed + "adopt", 62, 97)] });
  return out;
}

function ServiceMark({ svc }: { svc: Svc }) {
  if (svc.logo)
    return <img className="demo-block__logo" src={import.meta.env.BASE_URL + `img/partners/${svc.logo}.png`} alt={svc.name} />;
  return <span className="demo-block__mono" style={{ color: CAT_ACCENT[svc.cat] }}>{svc.name}</span>;
}

/* ============================================================
   Page
   ============================================================ */

export function DemoPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [generated, setGenerated] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const selected = SERVICES.filter((s) => selectedIds.includes(s.id));
  const widgets = useMemo(() => widgetsFor(selected), [selectedIds.join("|")]);
  const ready = selected.length > 0 && goals.length > 0;

  const add = (id: string) => setSelectedIds((c) => (c.includes(id) ? c : [...c, id]));
  const remove = (id: string) => setSelectedIds((c) => c.filter((x) => x !== id));
  const toggleGoal = (g: string) => setGoals((c) => (c.includes(g) ? c.filter((x) => x !== g) : [...c, g]));
  const reset = () => { setSelectedIds([]); setGoals([]); setNote(""); setGenerated(false); };

  const coverage = Math.min(100, selected.length * 12 + goals.length * 8);

  return (
    <div className="demo-page">
      <section className="page-hero section" id="top">
        <PageHeroArt src="img/heroes/demo.webp" />
        <div className="wrap-lg">
          <div className="page-hero__inner reveal" ref={heroRef}>
            <span className="demo-hero__eyebrow">Interactive demo · live preview</span>
            <h1 className="page-hero__title">
              Your stack, <em>connected.</em>
            </h1>
            <p className="page-hero__lead">
              Drag the tools you already run into the workflow, tell us what you
              want to achieve, and watch a working dashboard take shape — the
              same way an Enquo engagement does, in miniature.
            </p>
            <div className="demo-hero__steps">
              <span><b>01</b> Drop your services</span>
              <span><b>02</b> Set your objectives</span>
              <span><b>03</b> Generate the dashboard</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section demo" id="builder">
        <div className="wrap-lg">
          <div className="sec-label">
            <span className="num">01 / Build your workflow</span>
            <span>Drag, drop, describe</span>
            <span className="dash" />
          </div>

          <div className="demo__builder">
            {/* Palette — logo blocks */}
            <div className="demo__palette">
              <h3 className="demo__zone-title">Your services</h3>
              <p className="demo__zone-hint">Drag a block into the workflow — or tap it.</p>
              <div className="demo__blocks">
                {SERVICES.map((s) => {
                  const used = selectedIds.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className={"demo-block" + (used ? " is-used" : "")}
                      draggable={!used}
                      onDragStart={(e) => e.dataTransfer.setData("text/plain", s.id)}
                      onClick={() => (used ? remove(s.id) : add(s.id))}
                      style={{ "--chip-accent": CAT_ACCENT[s.cat] } as React.CSSProperties}
                      title={s.name}
                    >
                      <ServiceMark svc={s} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Canvas — three-stage workflow */}
            <div
              className={"demo__canvas" + (dragOver ? " is-over" : "")}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false);
                const id = e.dataTransfer.getData("text/plain"); if (id) add(id); }}
            >
              <h3 className="demo__zone-title">Your workflow</h3>
              {selected.length === 0 ? (
                <p className="demo__canvas-empty">Drop services here to connect them.</p>
              ) : (
                <div className="demo__flow">
                  <div className="demo__flow-col">
                    <span className="demo__flow-label">Sources</span>
                    <div className="demo__flow-nodes">
                      {selected.map((s) => (
                        <button key={s.id} type="button" className="demo-node" onClick={() => remove(s.id)}
                          style={{ "--chip-accent": CAT_ACCENT[s.cat] } as React.CSSProperties} title="Remove">
                          <ServiceMark svc={s} />
                          <span className="demo-node__x">×</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <span className="demo__flow-arrow" aria-hidden="true">→</span>
                  <div className="demo__flow-col">
                    <span className="demo__flow-label">Enquo layer</span>
                    <div className="demo__flow-engine">
                      <span>Ingest</span><span>Reconcile</span><span>Automate</span><span>Govern</span>
                    </div>
                  </div>
                  <span className="demo__flow-arrow" aria-hidden="true">→</span>
                  <div className="demo__flow-col">
                    <span className="demo__flow-label">Output</span>
                    <span className="demo-node demo-node--dash">Dashboard</span>
                  </div>
                </div>
              )}
              {selected.length > 0 && (
                <div className="demo__coverage">
                  <span>Workflow coverage</span>
                  <div className="demo__coverage-bar"><i style={{ width: coverage + "%" }} /></div>
                  <strong>{coverage}%</strong>
                </div>
              )}
            </div>
          </div>

          {/* Goals */}
          <div className="demo__goals">
            <h3 className="demo__zone-title">What do you want to achieve?</h3>
            <div className="demo__chips">
              {GOALS.map((g) => (
                <button key={g} type="button"
                  className={"demo-goal" + (goals.includes(g) ? " is-on" : "")}
                  onClick={() => toggleGoal(g)}>{g}</button>
              ))}
            </div>
            <input className="demo__note" type="text"
              placeholder="Anything specific? e.g. board reporting every Monday at 8am…"
              value={note} onChange={(e) => setNote(e.target.value)} />
          </div>

          <div className="demo__actions">
            <button type="button" className="btn btn--primary" disabled={!ready} onClick={() => setGenerated(true)}>
              Generate dashboard
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
            {!ready && <span className="demo__actions-hint">Pick at least one service and one objective.</span>}
            {(selected.length > 0 || goals.length > 0) && <button type="button" className="btn" onClick={reset}>Reset</button>}
          </div>
        </div>
      </section>

      {generated && (
        <section className="section demo-dash" id="dashboard">
          <div className="wrap-lg">
            <div className="sec-label">
              <span className="num">02 / Your dashboard</span>
              <span>Live preview · placeholder data</span>
              <span className="dash" />
            </div>

            <div className="demo-dash__head">
              <h2 className="demo-dash__title">{goals[0] ?? "Operations"}, <em>in one place.</em></h2>
              <p className="demo-dash__sub">
                {selected.map((s) => s.name).join(" · ")} — unified into a single
                operational view{note ? ` · "${note}"` : ""}.
              </p>
            </div>

            {/* status bar */}
            <div className="demo-dash__bar">
              <div><span>Connected sources</span><strong>{selected.length}</strong></div>
              <div><span>Objectives</span><strong>{goals.length}</strong></div>
              <div><span>Live widgets</span><strong>{widgets.length}</strong></div>
              <div><span>Status</span><strong className="demo-dash__live">● Live</strong></div>
            </div>

            <div className="demo-dash__grid">
              {widgets.map((w) => (
                <article className="demo-widget" key={w.key} style={{ "--w-accent": w.accent } as React.CSSProperties}>
                  <header className="demo-widget__head">
                    <h3 className="demo-widget__title">{w.title}</h3>
                    <span className="demo-widget__source">{w.source}</span>
                  </header>
                  <div className="demo-widget__kpi">
                    <strong>{w.kpi}</strong>
                    {w.delta && <span className="demo-widget__delta">{w.delta}</span>}
                    <span className="demo-widget__kpi-label">{w.kpiLabel}</span>
                  </div>
                  {w.chart === "line" && <LineChart data={w.data} accent={w.accent} />}
                  {w.chart === "bars" && <BarChart data={w.data} accent={w.accent} />}
                  {w.chart === "donut" && <Donut value={w.data[0]} accent={w.accent} />}
                  {w.chart === "feed" && (
                    <ul className="demo-widget__feed">{w.feed!.map((f) => <li key={f}>{f}</li>)}</ul>
                  )}
                </article>
              ))}
            </div>

            <p className="demo-dash__note">
              Placeholder data. In a real engagement this is your live operational
              backbone — designed, built, and run by the same team.
            </p>
          </div>
        </section>
      )}

      <FinalCTA />
    </div>
  );
}
