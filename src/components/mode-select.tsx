"use client";

import { useRouter } from "next/navigation";

export function ModeSelect() {
  const router = useRouter();

  return (
    <main className="page-shell">
      <section className="mode-screen panel glow">
        <div className="mode-header">
          <span className="eyebrow">Neural Memory Interface</span>
          <h1>Select Mode — DEMO</h1>
          <p className="mode-subtitle">
            Choose the mode that matches your purpose. This system supports
            personal health scanning powered by AI.
          </p>
        </div>

        <div className="mode-grid three-col">
          {/* Personal Mode */}
          <button
            className="mode-card"
            onClick={() => router.push("/connect")}
            type="button"
          >
            <div className="mode-icon personal-icon">
              <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
                <circle
                  cx="24"
                  cy="16"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M 8 42 C 8 33 15 26 24 26 C 33 26 40 33 40 42"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2>Personal</h2>
            <p>
              Creation of patient's dimensional profiles for preliminary mental
              health assessment. Analyze stress, sleep quality.
            </p>
            <ul className="mode-features">
              <li>sleep, circadian rhythm, HRV, resting HR, activity</li>
              <li>voice/prosody, speech tempo, affective language</li>
              <li>
                EMA: mood, worry, rumination, avoidance, energy, anhedonia
              </li>
              <li>PHQ-9, GAD-7, functional impairment scales</li>
            </ul>
            <span className="mode-cta">
              Start Multimodal Evidence Acquisition →
            </span>
          </button>

          <button
            className="mode-card reasoning"
            onClick={() => router.push("/differential")}
            type="button"
          >
            <div className="mode-icon reasoning-icon">
              <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
                <path
                  d="M 10 12 H 38"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
                <path
                  d="M 10 24 H 38"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
                <path
                  d="M 10 36 H 38"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
                <circle cx="15" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                <circle cx="29" cy="24" r="4" stroke="currentColor" strokeWidth="2" />
                <circle cx="22" cy="36" r="4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h2>Differential Reasoning Layer</h2>
            <p>
              Maps multimodal evidence streams into dimensional, RDoC, HiTOP,
              and DSM/ICD-compatible reasoning views for clinician review.
            </p>
            <ul className="mode-features">
              <li>Longitudinal Internalizing-State Model</li>
              <li>HiTOP Internalizing profile</li>
              <li>RDoC domain map</li>
              <li>DSM/ICD compatibility support flags</li>
            </ul>
            <span className="mode-cta reasoning-cta">
              Open Differential Layer →
            </span>
          </button>

          <button
            className="mode-card psychiatric"
            onClick={() => router.push("/psychiatric")}
            type="button"
          >
            <div className="mode-icon psychiatric-icon">
              <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
                <path
                  d="M 24 6 C 15 6 9 12 9 21 C 9 30 15 36 24 42 C 33 36 39 30 39 21 C 39 12 33 6 24 6 Z"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M 16 23 H 22 L 25 16 L 29 31 L 32 23 H 36"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h2>Psychiatric Reasoning Layer</h2>
            <p>
              Extends the differential formulation into mechanistic reasoning,
              risk forecasting, treatment simulation, and care-plan generation.
            </p>
            <ul className="mode-features">
              <li>Post-AGI Psychiatric Reasoning Core</li>
              <li>differential formulation</li>
              <li>causal/mechanistic explanation</li>
              <li>relapse-risk and treatment-response simulation</li>
            </ul>
            <span className="mode-cta psychiatric-cta">
              Open Psychiatric Layer →
            </span>
          </button>

          {/* Medical Mode - Hidden */}
          {/* <button
            className="mode-card medical"
            onClick={() => router.push("/medical?purpose=medical")}
            type="button"
          >
            <div className="mode-icon medical-icon">
              <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
                <rect x="18" y="4" width="12" height="40" rx="3" stroke="currentColor" strokeWidth="2" />
                <rect x="4" y="18" width="40" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h2>ทางการแพทย์</h2>
            <p>
              ดาวน์โหลดภาพความทรงจำเพื่อใช้ในการรักษา
              ฟื้นฟูความจำ หรือเก็บรักษาความทรงจำไว้ก่อนเสื่อมสภาพ
            </p>
            <ul className="mode-features">
              <li>ฟื้นฟูความทรงจำ (EMDR)</li>
              <li>เก็บรักษา Digital Legacy</li>
              <li>Cognitive Rehabilitation</li>
              <li>ความปลอดภัยระดับสูง</li>
            </ul>
            <span className="mode-cta">
              เข้าสู่โหมดทางการแพทย์ →
            </span>
            <small className="mode-restriction">* เปิดใช้เมื่อได้รับใบอนุญาตจากแพทย์ผู้เชี่ยวชาญเท่านั้น</small>
          </button> */}

          {/* Judicial Mode - Hidden */}
          {/* <button
            className="mode-card judicial"
            onClick={() => router.push("/medical?purpose=judicial")}
            type="button"
          >
            <div className="mode-icon judicial-mode-icon">
              <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
                <path d="M 24 6 L 24 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M 24 10 L 10 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M 24 10 L 38 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M 6 18 C 6 18 10 26 14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M 34 18 C 34 18 38 26 42 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M 24 10 L 24 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M 18 36 L 30 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M 14 42 L 34 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2>ทางตุลาการ</h2>
            <p>
              ดึงความทรงจำเพื่อใช้เป็นหลักฐานในกระบวนการยุติธรรม
              ตัดสินคดีอาญา สืบสวนสอบสวน พร้อม Chain of Custody
            </p>
            <ul className="mode-features">
              <li>หลักฐานตัดสินคดีอาญา</li>
              <li>การสืบสวนสอบสวน</li>
              <li>รับรองความถูกต้อง</li>
              <li>Chain of Custody Certified</li>
            </ul>
            <span className="mode-cta judicial-cta">
              เข้าสู่โหมดตุลาการ →
            </span>
            <small className="mode-restriction">* เปิดใช้เมื่อมีเอกสารทางคดีหรือหมายศาลเท่านั้น</small>
          </button> */}
        </div>
      </section>
    </main>
  );
}
