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
            Choose the mode that matches your purpose.
            This system supports personal health scanning powered by AI.
          </p>
        </div>

        <div className="mode-grid centered">
          {/* Personal Mode */}
          <button
            className="mode-card"
            onClick={() => router.push("/connect")}
            type="button"
          >
            <div className="mode-icon personal-icon">
              <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
                <circle cx="24" cy="16" r="10" stroke="currentColor" strokeWidth="2" />
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
              Brain scan for preliminary mental health assessment.
              Analyze stress, sleep quality, and focus with AI-powered recommendations.
            </p>
            <ul className="mode-features">
              <li>EEG Brain Wave Scan</li>
              <li>Stress & HRV Analysis</li>
              <li>Preliminary Diagnosis Report</li>
              <li>AI Health Recommendations</li>
            </ul>
            <span className="mode-cta">
              Start Brain Scan →
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
