import Link from "next/link";
import { DeviceStatus } from "@/lib/types";

type ScanMonitorProps = {
  initialDevice: DeviceStatus;
};

type EvidenceMetric = {
  name: string;
  value: string;
  unit: string;
  timeWindow: string;
  baseline?: string;
  source: string;
  interpretation: string;
};

type EvidenceGroup = {
  title: string;
  sourceLabel: string;
  metrics: EvidenceMetric[];
};

export const evidenceGroups: EvidenceGroup[] = [
  {
    title: "Wearable physiology",
    sourceLabel: "Wearable-derived",
    metrics: [
      {
        name: "Sleep duration",
        value: "5.8",
        unit: "h/night",
        timeWindow: "7-day average",
        baseline: "Personal baseline comparison available",
        source: "Wearable-derived",
        interpretation: "Shorter recent sleep suggests sleep disruption and requires clinician review."
      },
      {
        name: "Sleep midpoint shift",
        value: "+92",
        unit: "min",
        timeWindow: "vs baseline",
        baseline: "+92 min vs baseline",
        source: "Wearable-derived",
        interpretation: "Later sleep timing is consistent with circadian rhythm disruption."
      },
      {
        name: "Resting HR",
        value: "78",
        unit: "bpm",
        timeWindow: "Current monitoring window",
        baseline: "+9 bpm vs baseline",
        source: "Wearable-derived",
        interpretation: "Higher resting HR suggests increased physiologic arousal, not diagnostic alone."
      },
      {
        name: "HRV RMSSD",
        value: "22",
        unit: "ms",
        timeWindow: "Current monitoring window",
        baseline: "-31% vs baseline",
        source: "Wearable-derived",
        interpretation: "Lower HRV is consistent with increased strain and should be interpreted in context."
      },
      {
        name: "Steps",
        value: "3,200",
        unit: "steps/day",
        timeWindow: "Current monitoring window",
        baseline: "-45% vs baseline",
        source: "Wearable-derived",
        interpretation: "Reduced activity suggests lower daily activation and requires clinician review."
      }
    ]
  },
  {
    title: "Smartphone digital phenotype",
    sourceLabel: "Smartphone-derived",
    metrics: [
      {
        name: "Screen-on time",
        value: "6.4",
        unit: "h/day",
        timeWindow: "Daily average",
        source: "Smartphone-derived",
        interpretation: "Elevated device use may reflect altered routine and is not diagnostic alone."
      },
      {
        name: "Night screen use",
        value: "74",
        unit: "min",
        timeWindow: "00:00-06:00",
        source: "Smartphone-derived",
        interpretation: "Night use is consistent with sleep disruption and should be reviewed with sleep data."
      },
      {
        name: "Distance traveled",
        value: "1.1",
        unit: "km/day",
        timeWindow: "Daily average",
        source: "Smartphone-derived",
        interpretation: "Low travel distance suggests reduced mobility."
      },
      {
        name: "Time at home",
        value: "88",
        unit: "% of day",
        timeWindow: "Daily average",
        source: "Smartphone-derived",
        interpretation: "High home time is consistent with avoidance or reduced activity, requiring clinician review."
      },
      {
        name: "Mobility regularity",
        value: "0.42",
        unit: "0-1 scale",
        timeWindow: "Current monitoring window",
        source: "Smartphone-derived",
        interpretation: "Lower regularity suggests disrupted daily routine."
      }
    ]
  },
  {
    title: "Voice and language",
    sourceLabel: "AI-derived voice/language feature",
    metrics: [
      {
        name: "Speech rate",
        value: "112",
        unit: "words/min",
        timeWindow: "Recent speech sample",
        source: "AI-derived voice/language feature",
        interpretation: "Speech tempo should be interpreted against personal baseline."
      },
      {
        name: "Mean pause duration",
        value: "1.8",
        unit: "s",
        timeWindow: "Recent speech sample",
        source: "AI-derived voice/language feature",
        interpretation: "Longer pauses may suggest slowed verbal output and require clinician review."
      },
      {
        name: "Pitch variability",
        value: "Reduced",
        unit: "vs personal baseline",
        timeWindow: "Recent speech sample",
        baseline: "Reduced vs personal baseline",
        source: "AI-derived voice/language feature",
        interpretation: "Reduced variability is consistent with flatter prosody, not diagnostic alone."
      },
      {
        name: "Negative affect language score",
        value: "0.71",
        unit: "0-1 AI-derived scale",
        timeWindow: "Recent language sample",
        source: "AI-derived voice/language feature",
        interpretation: "Higher negative affect language suggests elevated distress in the sampled text."
      }
    ]
  },
  {
    title: "Patient-reported symptoms",
    sourceLabel: "Patient-reported outcome",
    metrics: [
      {
        name: "Mood",
        value: "3",
        unit: "/10",
        timeWindow: "Current report",
        source: "Patient-reported outcome",
        interpretation: "Low mood rating suggests current subjective distress."
      },
      {
        name: "Worry",
        value: "8",
        unit: "/10",
        timeWindow: "Current report",
        source: "Patient-reported outcome",
        interpretation: "High worry rating is consistent with elevated anxiety burden."
      },
      {
        name: "Rumination",
        value: "7",
        unit: "/10",
        timeWindow: "Current report",
        source: "Patient-reported outcome",
        interpretation: "Elevated rumination suggests repetitive negative thinking."
      },
      {
        name: "Energy",
        value: "2",
        unit: "/10",
        timeWindow: "Current report",
        source: "Patient-reported outcome",
        interpretation: "Low energy is consistent with reduced activation."
      },
      {
        name: "Anhedonia",
        value: "8",
        unit: "/10",
        timeWindow: "Current report",
        source: "Patient-reported outcome",
        interpretation: "High anhedonia rating suggests reduced interest or pleasure."
      },
      {
        name: "PHQ-9",
        value: "18",
        unit: "/27",
        timeWindow: "Current scale",
        source: "Patient-reported outcome",
        interpretation: "Elevated score indicates symptom burden that requires clinician review."
      },
      {
        name: "GAD-7",
        value: "15",
        unit: "/21",
        timeWindow: "Current scale",
        source: "Patient-reported outcome",
        interpretation: "Elevated score suggests anxiety symptom burden and is not diagnostic alone."
      }
    ]
  },
  {
    title: "Clinical context",
    sourceLabel: "Clinical record",
    metrics: [
      {
        name: "Medication",
        value: "sertraline",
        unit: "50 mg/day",
        timeWindow: "Current medication record",
        source: "Clinical record",
        interpretation: "Medication context is needed before interpreting symptom and physiology changes."
      },
      {
        name: "Adherence",
        value: "82",
        unit: "%",
        timeWindow: "14 days",
        source: "Clinical record",
        interpretation: "Partial adherence may affect observed longitudinal patterns."
      },
      {
        name: "Reported adverse effects",
        value: "nausea 6/10, insomnia 5/10",
        unit: "patient-rated severity",
        timeWindow: "Current report",
        source: "Clinical record",
        interpretation: "Adverse effects may contribute to sleep and adherence patterns."
      },
      {
        name: "Clinician note",
        value: "worsening sleep and avoidance",
        unit: "past 2 weeks",
        timeWindow: "Clinical note",
        source: "Clinical record",
        interpretation: "Narrative context is consistent with the sleep, mobility, and symptom streams."
      }
    ]
  }
];

export const patternSummaries = [
  "Sleep/circadian disruption",
  "Reduced activity and mobility",
  "Elevated self-reported anxiety/depression burden"
];

export function ScanMonitor({ initialDevice }: ScanMonitorProps) {
  return (
    <main className="page-shell">
      <section className="scan-screen evidence-dashboard">
        <div className="scan-topbar evidence-topbar">
          <div>
            <span className="eyebrow">Precision Psychiatry Demo</span>
            <h1>Longitudinal Patient-State Evidence</h1>
            <p>
              Demo data only — signals are interpreted against personal baseline and clinical context.
            </p>
          </div>
          <div className="topbar-actions">
            <Link className="secondary-button link-button" href="/connect">
              Back to connect
            </Link>
            <Link className="secondary-button link-button" href="/">
              Home
            </Link>
          </div>
        </div>

        <article className="panel evidence-summary">
          <div>
            <span className="eyebrow">Patient-State Summary</span>
            <h2>Longitudinal Patient-State Evidence</h2>
            <p>
              Device context: {initialDevice.model}. These patterns suggest areas for clinician review and are not diagnostic alone.
            </p>
          </div>
          <div className="pattern-grid">
            {patternSummaries.map((summary) => (
              <div className="pattern-card" key={summary}>
                <span>Pattern</span>
                <strong>{summary}</strong>
                <small>Requires clinician review</small>
              </div>
            ))}
          </div>
        </article>

        <div className="evidence-grid">
          {evidenceGroups.map((group) => (
            <article className="panel evidence-card" key={group.title}>
              <div className="evidence-card-header">
                <div>
                  <span className="eyebrow">{group.sourceLabel}</span>
                  <h2>{group.title}</h2>
                </div>
                <span className="source-pill">{group.sourceLabel}</span>
              </div>

              <div className="metric-table" role="table" aria-label={`${group.title} evidence metrics`}>
                <div className="metric-row metric-row-head" role="row">
                  <span>Metric</span>
                  <span>Value</span>
                  <span>Unit / scale</span>
                  <span>Time window</span>
                  <span>Baseline</span>
                  <span>Data source</span>
                  <span>Neutral interpretation</span>
                </div>
                {group.metrics.map((metric) => (
                  <div className="metric-row" role="row" key={`${group.title}-${metric.name}`}>
                    <span className="metric-name">{metric.name}</span>
                    <strong>{metric.value}</strong>
                    <span>{metric.unit}</span>
                    <span>{metric.timeWindow}</span>
                    <span>{metric.baseline ?? "Not available"}</span>
                    <span>{metric.source}</span>
                    <span>{metric.interpretation}</span>
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
