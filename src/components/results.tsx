"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type AnalysisPhase = "processing" | "complete";

type DiagnosisResult = {
  id: string;
  condition: string;
  probability: number;
  severity: "low" | "moderate" | "high";
  description: string;
  recommendation: string;
};

const PROCESSING_DURATION_MS = 5000;

const processingSteps = [
  "Analyzing EEG brainwave patterns...",
  "Comparing with medical database...",
  "Evaluating stress levels and HRV...",
  "Checking sleep patterns...",
  "Generating diagnosis report..."
];

const diagnosisResults: DiagnosisResult[] = [
  {
    id: "mild-anxiety",
    condition: "Mild Anxiety",
    probability: 72,
    severity: "low",
    description:
      "Slightly elevated Beta wave patterns detected in the Prefrontal Cortex area, indicating low-level anxiety",
    recommendation: "Recommended: practice deep breathing, meditate 10 minutes daily, and ensure adequate sleep"
  },
  {
    id: "sleep-disruption",
    condition: "Sleep Disruption",
    probability: 58,
    severity: "moderate",
    description:
      "Delta wave signals during Deep Sleep are below normal thresholds, which may affect physical recovery and memory",
    recommendation:
      "Recommended: avoid screens 1 hour before bed, maintain a consistent sleep schedule, and consider consulting a sleep specialist"
  },
  {
    id: "focus-deficit",
    condition: "Temporary Attention Deficit",
    probability: 45,
    severity: "low",
    description:
      "Irregular Alpha wave distribution detected, possibly caused by accumulated fatigue or lack of rest",
    recommendation: "Recommended: take brain breaks every 45 minutes, do light exercise, and stay hydrated"
  },
  {
    id: "stress-accumulation",
    condition: "Chronic Stress Indicators",
    probability: 63,
    severity: "moderate",
    description:
      "Low HRV combined with abnormal Cortisol patterns indicates long-term accumulated stress",
    recommendation:
      "Recommended: improve work-life balance, practice yoga or Mindfulness, and consider seeing a psychologist"
  }
];

export function Results() {
  const [phase, setPhase] = useState<AnalysisPhase>("processing");
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (phase === "complete") return;

    const stepInterval = PROCESSING_DURATION_MS / processingSteps.length;
    const progressTick = 50;

    const progressTimer = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / (PROCESSING_DURATION_MS / progressTick));
        if (next >= 100) {
          setPhase("complete");
          return 100;
        }
        return next;
      });
    }, progressTick);

    const stepTimer = window.setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, processingSteps.length - 1));
    }, stepInterval);

    return () => {
      window.clearInterval(progressTimer);
      window.clearInterval(stepTimer);
    };
  }, [phase]);

  return (
    <main className="page-shell">
      <section className="results-screen panel glow">
        <div className="scan-topbar">
          <div>
            <span className="eyebrow">Analysis Results</span>
            <h1>{phase === "complete" ? "Diagnosis Results" : "Processing brain data"}</h1>
          </div>
          <div className="topbar-actions">
            <Link className="secondary-button link-button" href="/scan">
              Back to scan
            </Link>
            <Link className="secondary-button link-button" href="/">
              ← Home
            </Link>
          </div>
        </div>

        {phase === "processing" && (
          <div className="processing-section">
            <div className="processing-visual">
              <div className="data-flow-container">
                {/* Data streams flowing into center */}
                <div className="data-stream stream-1">
                  <span className="stream-particle" />
                  <span className="stream-particle delay-1" />
                  <span className="stream-particle delay-2" />
                </div>
                <div className="data-stream stream-2">
                  <span className="stream-particle" />
                  <span className="stream-particle delay-1" />
                  <span className="stream-particle delay-2" />
                </div>
                <div className="data-stream stream-3">
                  <span className="stream-particle" />
                  <span className="stream-particle delay-1" />
                  <span className="stream-particle delay-2" />
                </div>
                <div className="data-stream stream-4">
                  <span className="stream-particle" />
                  <span className="stream-particle delay-1" />
                  <span className="stream-particle delay-2" />
                </div>
                <div className="data-stream stream-5">
                  <span className="stream-particle" />
                  <span className="stream-particle delay-1" />
                  <span className="stream-particle delay-2" />
                </div>
                <div className="data-stream stream-6">
                  <span className="stream-particle" />
                  <span className="stream-particle delay-1" />
                  <span className="stream-particle delay-2" />
                </div>

                {/* Source labels */}
                <span className="data-label label-1">EEG</span>
                <span className="data-label label-2">HRV</span>
                <span className="data-label label-3">Stress</span>
                <span className="data-label label-4">Sleep</span>
                <span className="data-label label-5">Focus</span>
                <span className="data-label label-6">Neural</span>

                {/* Center AI core */}
                <div className="ai-core">
                  <div className="ai-core-ring" />
                  <div className="ai-core-inner">
                    <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
                      <path d="M 20 6 L 20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 20 26 L 20 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 6 20 L 14 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 26 20 L 34 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="2" />
                      <circle cx="20" cy="20" r="2" fill="currentColor" />
                    </svg>
                    <span>{Math.round(progress)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="processing-info">
              <strong className="processing-step">{processingSteps[stepIndex]}</strong>
              <div className="progress-block">
                <div className="progress-track">
                  <span style={{ width: `${progress}%` }} />
                </div>
                <small>AI is analyzing data from the brain scan</small>
              </div>
            </div>
          </div>
        )}

        {phase === "complete" && (
          <div className="diagnosis-section">
            <div className="diagnosis-summary panel">
              <div className="summary-header">
                <div className="summary-check">
                  <svg viewBox="0 0 40 40" width="40" height="40">
                    <circle cx="20" cy="20" r="18" fill="rgba(98, 241, 212, 0.12)" stroke="rgba(98, 241, 212, 0.6)" strokeWidth="2" />
                    <path d="M 12 20 L 18 26 L 28 14" fill="none" stroke="rgba(98, 241, 212, 0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h2>Analysis Complete</h2>
                  <p>System detected {diagnosisResults.length} items that require attention</p>
                </div>
              </div>
            </div>

            <div className="diagnosis-grid">
              {diagnosisResults.map((result) => (
                <article className="diagnosis-card panel" key={result.id}>
                  <div className="diagnosis-card-header">
                    <h3>{result.condition}</h3>
                    <span className={`severity-badge severity-${result.severity}`}>
                      {result.severity === "low" && "Low"}
                      {result.severity === "moderate" && "Moderate"}
                      {result.severity === "high" && "High"}
                    </span>
                  </div>

                  <div className="probability-bar">
                    <div className="probability-track">
                      <span
                        className={`probability-fill severity-${result.severity}`}
                        style={{ width: `${result.probability}%` }}
                      />
                    </div>
                    <small>Probability {result.probability}%</small>
                  </div>

                  <p className="diagnosis-desc">{result.description}</p>

                  <div className="diagnosis-recommend">
                    <span>Recommendation</span>
                    <p>{result.recommendation}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="results-footer">
              <p>
                ⚠️ This diagnosis is only a preliminary AI assessment
                and cannot replace a diagnosis from a qualified medical professional.
                Please consult a doctor for an accurate diagnosis.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
