import Link from "next/link";
import { evidenceGroups, patternSummaries } from "@/components/scan-monitor";

export type ReasoningItem = {
  label: string;
  status: string;
  evidence: string;
  interpretation: string;
};

export type ReasoningSection = {
  title: string;
  eyebrow: string;
  items: ReasoningItem[];
};

export const differentialSections: ReasoningSection[] = [
  {
    title: "Longitudinal Internalizing-State Model",
    eyebrow: "State model",
    items: [
      {
        label: "Sleep/circadian disruption",
        status: "Elevated pattern",
        evidence: "Sleep duration 5.8 h/night; sleep midpoint +92 min vs baseline; night screen use 74 min.",
        interpretation: "Suggests disrupted sleep timing and regulatory load; requires clinician review."
      },
      {
        label: "Reduced activity and mobility",
        status: "Elevated pattern",
        evidence: "Steps 3,200/day, -45% vs baseline; distance traveled 1.1 km/day; time at home 88%.",
        interpretation: "Consistent with behavioral withdrawal or reduced activation, not diagnostic alone."
      },
      {
        label: "Elevated self-reported anxiety/depression burden",
        status: "Elevated burden",
        evidence: "PHQ-9 18/27; GAD-7 15/21; worry 8/10; anhedonia 8/10; energy 2/10.",
        interpretation: "Indicates clinically relevant symptom burden that should be reviewed with context."
      }
    ]
  },
  {
    title: "HiTOP Internalizing Profile",
    eyebrow: "Dimensional profile",
    items: [
      {
        label: "Distress/depression",
        status: "Supported by current evidence",
        evidence: "Mood 3/10; PHQ-9 18/27; negative affect language score 0.71.",
        interpretation: "Consistent with distress and depressive symptom burden; does not establish diagnosis."
      },
      {
        label: "Fear/anxiety",
        status: "Supported by current evidence",
        evidence: "GAD-7 15/21; worry 8/10; resting HR 78 bpm, +9 bpm vs baseline.",
        interpretation: "Suggests elevated anxiety-related burden and physiologic arousal."
      },
      {
        label: "Anxious arousal",
        status: "Contextual support",
        evidence: "Resting HR +9 bpm vs baseline; HRV RMSSD 22 ms, -31% vs baseline; insomnia 5/10.",
        interpretation: "Consistent with autonomic and sleep-related arousal, requiring clinician interpretation."
      },
      {
        label: "Rumination/worry",
        status: "Supported by report",
        evidence: "Rumination 7/10; worry 8/10; affective language signal elevated.",
        interpretation: "Suggests repetitive negative thinking and worry processes."
      },
      {
        label: "Anhedonia/behavioral withdrawal",
        status: "Supported by multimodal pattern",
        evidence: "Anhedonia 8/10; energy 2/10; steps -45% vs baseline; time at home 88%.",
        interpretation: "Consistent with reduced reward engagement and withdrawal, not diagnostic alone."
      }
    ]
  },
  {
    title: "RDoC Map",
    eyebrow: "Research domain criteria",
    items: [
      {
        label: "Negative Valence: sustained threat, loss, frustrative nonreward",
        status: "Mapped evidence",
        evidence: "Worry 8/10; rumination 7/10; negative affect language score 0.71; clinician note of avoidance.",
        interpretation: "Suggests sustained distress and avoidance-related processes."
      },
      {
        label: "Positive Valence: reward responsiveness, motivation",
        status: "Mapped evidence",
        evidence: "Anhedonia 8/10; energy 2/10; steps 3,200/day; reduced mobility.",
        interpretation: "Consistent with reduced motivation or reward responsiveness."
      },
      {
        label: "Arousal/Regulatory: sleep, circadian, autonomic regulation",
        status: "Mapped evidence",
        evidence: "Sleep midpoint +92 min; HRV RMSSD -31%; resting HR +9 bpm; insomnia 5/10.",
        interpretation: "Suggests regulatory disruption across sleep and autonomic streams."
      },
      {
        label: "Cognitive Systems: attention, working memory, cognitive control",
        status: "Insufficient direct evidence",
        evidence: "No direct cognitive task data in current demo set.",
        interpretation: "Requires additional task-based or clinician-assessed cognitive evidence."
      }
    ]
  },
  {
    title: "DSM/ICD Compatibility",
    eyebrow: "Compatibility checks",
    items: [
      {
        label: "MDD criteria support",
        status: "Support flag",
        evidence: "PHQ-9 18/27; mood 3/10; anhedonia 8/10; energy 2/10; sleep disruption.",
        interpretation: "Supports clinician review for MDD-compatible symptom patterns; not a diagnosis."
      },
      {
        label: "GAD criteria support",
        status: "Support flag",
        evidence: "GAD-7 15/21; worry 8/10; rumination 7/10; autonomic arousal pattern.",
        interpretation: "Supports clinician review for GAD-compatible symptom patterns; not a diagnosis."
      },
      {
        label: "Anxious distress specifier",
        status: "Specifier support flag",
        evidence: "Worry, rumination, sleep disruption, HR/HRV changes, negative affect language.",
        interpretation: "Suggests anxious distress features that require clinician review."
      },
      {
        label: "Treatment-resistant depression flags",
        status: "Monitor flag",
        evidence: "Sertraline 50 mg/day; adherence 82% over 14 days; adverse effects nausea 6/10, insomnia 5/10.",
        interpretation: "Current demo data is insufficient for treatment-resistant status; monitor response and treatment history."
      }
    ]
  }
];

export const evidenceSnapshot = evidenceGroups.flatMap((group) =>
  group.metrics.slice(0, 2).map((metric) => ({
    group: group.title,
    label: metric.name,
    value: `${metric.value} ${metric.unit}`,
    source: metric.source
  }))
);

export function DifferentialReasoning() {
  return (
    <main className="page-shell">
      <section className="scan-screen differential-dashboard">
        <div className="scan-topbar evidence-topbar">
          <div>
            <span className="eyebrow">Differential Reasoning Layer</span>
            <h1>Internalizing-State Differential View</h1>
            <p>
              Uses the same longitudinal evidence streams from the scan page to organize support signals across dimensional, RDoC, and DSM/ICD-compatible frameworks.
            </p>
          </div>
          <div className="topbar-actions">
            <Link className="secondary-button link-button" href="/scan">
              Back to evidence
            </Link>
            <Link className="secondary-button link-button" href="/">
              Home
            </Link>
          </div>
        </div>

        <article className="panel differential-summary">
          <div>
            <span className="eyebrow">Model Summary</span>
            <h2>Longitudinal Internalizing-State Model</h2>
            <p>
              The layer groups multimodal signals into support patterns. It suggests differential considerations and highlights where evidence is insufficient.
            </p>
          </div>
          <div className="pattern-grid">
            {patternSummaries.map((summary) => (
              <div className="pattern-card" key={summary}>
                <span>Observed pattern</span>
                <strong>{summary}</strong>
                <small>Uses scan-page evidence streams</small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel evidence-card">
          <div className="evidence-card-header">
            <div>
              <span className="eyebrow">Evidence Inputs</span>
              <h2>Scan-page data reused by reasoning layer</h2>
            </div>
            <span className="source-pill">Multimodal evidence</span>
          </div>
          <div className="evidence-snapshot-grid">
            {evidenceSnapshot.map((item) => (
              <div className="evidence-snapshot-card" key={`${item.group}-${item.label}`}>
                <span>{item.group}</span>
                <strong>{item.label}</strong>
                <small>{item.value}</small>
                <em>{item.source}</em>
              </div>
            ))}
          </div>
        </article>

        <div className="differential-grid">
          {differentialSections.map((section) => (
            <article className="panel differential-card" key={section.title}>
              <div className="evidence-card-header">
                <div>
                  <span className="eyebrow">{section.eyebrow}</span>
                  <h2>{section.title}</h2>
                </div>
              </div>
              <div className="reasoning-list">
                {section.items.map((item) => (
                  <div className="reasoning-row" key={`${section.title}-${item.label}`}>
                    <div>
                      <strong>{item.label}</strong>
                      <span>{item.status}</span>
                    </div>
                    <p>{item.evidence}</p>
                    <small>{item.interpretation}</small>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
