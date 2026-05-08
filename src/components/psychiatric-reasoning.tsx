import Link from "next/link";
import {
  differentialSections,
  evidenceSnapshot
} from "@/components/differential-reasoning";

type CoreModule = {
  title: string;
  status: string;
  uses: string;
  output: string;
};

const differentialInputs = differentialSections.flatMap((section) =>
  section.items.slice(0, 2).map((item) => ({
    framework: section.title,
    label: item.label,
    status: item.status,
    evidence: item.evidence
  }))
);

const coreModules: CoreModule[] = [
  {
    title: "differential formulation",
    status: "Active formulation",
    uses: "HiTOP internalizing profile, RDoC map, DSM/ICD support flags, and scan-page evidence streams.",
    output: "Organizes distress/depression, fear/anxiety, anxious arousal, rumination/worry, and anhedonia/withdrawal as support patterns for clinician review."
  },
  {
    title: "causal/mechanistic explanation",
    status: "Hypothesis layer",
    uses: "Sleep midpoint shift, HRV reduction, resting HR elevation, avoidance note, symptom scales, and language affect.",
    output: "Suggests a candidate loop linking sleep/circadian disruption, autonomic arousal, worry/rumination, low activity, and reduced reward engagement."
  },
  {
    title: "relapse-risk forecasting",
    status: "Monitoring forecast",
    uses: "Reduced mobility, worsening sleep, high PHQ-9/GAD-7 burden, adherence 82%, adverse effects, and clinician note.",
    output: "Flags elevated near-term monitoring need. Forecast is a decision-support signal and requires clinician review."
  },
  {
    title: "treatment-response simulation",
    status: "Scenario simulation",
    uses: "Sertraline 50 mg/day, adherence over 14 days, nausea, insomnia, sleep disruption, anxiety burden, and activity reduction.",
    output: "Compares hypothetical response constraints from adherence, tolerability, sleep, anxiety arousal, and behavioral activation targets."
  },
  {
    title: "personalized care-plan generation",
    status: "Draft support plan",
    uses: "Differential support flags plus longitudinal evidence from wearable, smartphone, voice/language, patient report, and clinical record.",
    output: "Generates clinician-supervised plan targets for sleep regularity, adverse-effect review, anxiety/worry processes, activity restoration, and follow-up measurement."
  }
];

const carePlanTargets = [
  "Review medication tolerability and adherence barriers given nausea 6/10, insomnia 5/10, and 82% adherence.",
  "Prioritize sleep/circadian stabilization because sleep duration, midpoint shift, and night screen use are all elevated support signals.",
  "Track anxiety arousal and worry/rumination with repeated GAD-7, EMA worry, rumination, HR, and HRV streams.",
  "Monitor behavioral activation using steps, distance traveled, time at home, anhedonia, and energy ratings.",
  "Add direct cognitive evidence before interpreting Cognitive Systems involvement."
];

export function PsychiatricReasoning() {
  return (
    <main className="page-shell">
      <section className="scan-screen psychiatric-dashboard">
        <div className="scan-topbar evidence-topbar">
          <div>
            <span className="eyebrow">Psychiatric Reasoning Layer</span>
            <h1>Post-AGI Psychiatric Reasoning Core</h1>
            <p>
              Uses the differential page formulation as structured input for mechanism hypotheses, monitoring forecasts, treatment simulation, and clinician-supervised care planning.
            </p>
          </div>
          <div className="topbar-actions">
            <Link className="secondary-button link-button" href="/differential">
              Back to differential
            </Link>
            <Link className="secondary-button link-button" href="/">
              Home
            </Link>
          </div>
        </div>

        <article className="panel differential-summary">
          <div>
            <span className="eyebrow">Reasoning Input</span>
            <h2>Differential formulation carried forward</h2>
            <p>
              The core does not assert diagnosis. It converts support flags and evidence patterns into explicit hypotheses that can be accepted, rejected, or revised by a clinician.
            </p>
          </div>
          <div className="psychiatric-input-grid">
            {differentialInputs.map((item) => (
              <div className="psychiatric-input-card" key={`${item.framework}-${item.label}`}>
                <span>{item.framework}</span>
                <strong>{item.label}</strong>
                <small>{item.status}</small>
              </div>
            ))}
          </div>
        </article>

        <div className="psychiatric-core-grid">
          {coreModules.map((module) => (
            <article className="panel psychiatric-core-card" key={module.title}>
              <div className="reasoning-row">
                <div>
                  <strong>{module.title}</strong>
                  <span>{module.status}</span>
                </div>
                <p>{module.uses}</p>
                <small>{module.output}</small>
              </div>
            </article>
          ))}
        </div>

        <article className="panel evidence-card">
          <div className="evidence-card-header">
            <div>
              <span className="eyebrow">Evidence Trace</span>
              <h2>Differential-page information used by the core</h2>
            </div>
            <span className="source-pill">Traceable inputs</span>
          </div>
          <div className="evidence-snapshot-grid">
            {evidenceSnapshot.slice(0, 10).map((item) => (
              <div className="evidence-snapshot-card" key={`${item.group}-${item.label}`}>
                <span>{item.group}</span>
                <strong>{item.label}</strong>
                <small>{item.value}</small>
                <em>{item.source}</em>
              </div>
            ))}
          </div>
        </article>

        <article className="panel psychiatric-plan-card">
          <div className="evidence-card-header">
            <div>
              <span className="eyebrow">Personalized Care-Plan Generation</span>
              <h2>Clinician-supervised draft targets</h2>
            </div>
            <span className="source-pill">Requires review</span>
          </div>
          <div className="reasoning-list">
            {carePlanTargets.map((target) => (
              <div className="reasoning-row" key={target}>
                <div>
                  <strong>{target}</strong>
                  <span>Draft target</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
