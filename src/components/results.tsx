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
  "กำลังวิเคราะห์รูปแบบคลื่นสมอง EEG...",
  "กำลังเปรียบเทียบกับฐานข้อมูลทางการแพทย์...",
  "กำลังประเมินระดับความเครียดและ HRV...",
  "กำลังตรวจสอบรูปแบบการนอนหลับ...",
  "กำลังสร้างรายงานผลวินิจฉัย..."
];

const diagnosisResults: DiagnosisResult[] = [
  {
    id: "mild-anxiety",
    condition: "ภาวะวิตกกังวลเล็กน้อย (Mild Anxiety)",
    probability: 72,
    severity: "low",
    description:
      "พบรูปแบบคลื่น Beta สูงกว่าปกติเล็กน้อยในบริเวณ Prefrontal Cortex บ่งชี้ถึงภาวะวิตกกังวลระดับต่ำ",
    recommendation: "แนะนำฝึกการหายใจลึก, ทำสมาธิ 10 นาทีต่อวัน และนอนหลับให้เพียงพอ"
  },
  {
    id: "sleep-disruption",
    condition: "คุณภาพการนอนหลับผิดปกติ (Sleep Disruption)",
    probability: 58,
    severity: "moderate",
    description:
      "สัญญาณ Delta wave ในช่วง Deep Sleep ต่ำกว่าเกณฑ์ปกติ อาจส่งผลต่อการฟื้นฟูร่างกายและความจำ",
    recommendation:
      "แนะนำหลีกเลี่ยงหน้าจอก่อนนอน 1 ชม., รักษาเวลานอนให้สม่ำเสมอ และพิจารณาปรึกษาแพทย์ด้านการนอน"
  },
  {
    id: "focus-deficit",
    condition: "สมาธิสั้นชั่วคราว (Temporary Attention Deficit)",
    probability: 45,
    severity: "low",
    description:
      "พบการกระจายตัวของคลื่น Alpha ไม่สม่ำเสมอ อาจเกิดจากความเหนื่อยล้าสะสมหรือขาดการพักผ่อน",
    recommendation: "แนะนำพักสมองทุก 45 นาที, ออกกำลังกายเบาๆ และดื่มน้ำให้เพียงพอ"
  },
  {
    id: "stress-accumulation",
    condition: "ความเครียดสะสม (Chronic Stress Indicators)",
    probability: 63,
    severity: "moderate",
    description:
      "ค่า HRV ต่ำกว่าเกณฑ์ร่วมกับ Cortisol pattern ที่ผิดปกติ บ่งชี้ถึงความเครียดสะสมในระยะยาว",
    recommendation:
      "แนะนำปรับสมดุลชีวิตการทำงาน, ฝึกโยคะหรือ Mindfulness และพิจารณาพบนักจิตวิทยา"
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
            <h1>{phase === "complete" ? "ผลการวินิจฉัย" : "กำลังประมวลผลข้อมูลสมอง"}</h1>
          </div>
          <div className="topbar-actions">
            <Link className="secondary-button link-button" href="/scan">
              กลับไปหน้าสแกน
            </Link>
            <Link className="secondary-button link-button" href="/">
              ← หน้าหลัก
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
                <small>AI กำลังวิเคราะห์ข้อมูลจากการสแกนสมอง</small>
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
                  <h2>การวิเคราะห์เสร็จสมบูรณ์</h2>
                  <p>ระบบตรวจพบ {diagnosisResults.length} รายการที่ควรให้ความสนใจ</p>
                </div>
              </div>
            </div>

            <div className="diagnosis-grid">
              {diagnosisResults.map((result) => (
                <article className="diagnosis-card panel" key={result.id}>
                  <div className="diagnosis-card-header">
                    <h3>{result.condition}</h3>
                    <span className={`severity-badge severity-${result.severity}`}>
                      {result.severity === "low" && "ต่ำ"}
                      {result.severity === "moderate" && "ปานกลาง"}
                      {result.severity === "high" && "สูง"}
                    </span>
                  </div>

                  <div className="probability-bar">
                    <div className="probability-track">
                      <span
                        className={`probability-fill severity-${result.severity}`}
                        style={{ width: `${result.probability}%` }}
                      />
                    </div>
                    <small>ความน่าจะเป็น {result.probability}%</small>
                  </div>

                  <p className="diagnosis-desc">{result.description}</p>

                  <div className="diagnosis-recommend">
                    <span>คำแนะนำ</span>
                    <p>{result.recommendation}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="results-footer">
              <p>
                ⚠️ ผลวินิจฉัยนี้เป็นเพียงการประเมินเบื้องต้นจาก AI
                ไม่สามารถใช้แทนการวินิจฉัยจากแพทย์ผู้เชี่ยวชาญได้
                กรุณาปรึกษาแพทย์เพื่อการวินิจฉัยที่แม่นยำ
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
