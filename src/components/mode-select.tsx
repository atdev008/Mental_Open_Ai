"use client";

import { useRouter } from "next/navigation";

export function ModeSelect() {
  const router = useRouter();

  return (
    <main className="page-shell">
      <section className="mode-screen panel glow">
        <div className="mode-header">
          <span className="eyebrow">Neural Memory Interface</span>
          <h1>เลือกโหมดการใช้งาน</h1>
          <p className="mode-subtitle">
            ระบบรองรับทั้งการใช้งานส่วนบุคคลและทางการแพทย์
            กรุณาเลือกโหมดที่ตรงกับวัตถุประสงค์ของคุณ
          </p>
        </div>

        <div className="mode-grid">
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
            <h2>บุคคลทั่วไป</h2>
            <p>
              สแกนสมองเพื่อตรวจสุขภาพจิตเบื้องต้น วิเคราะห์ความเครียด
              คุณภาพการนอน และสมาธิ พร้อมรับคำแนะนำจาก AI
            </p>
            <ul className="mode-features">
              <li>สแกนคลื่นสมอง EEG</li>
              <li>วิเคราะห์ความเครียดและ HRV</li>
              <li>รายงานผลวินิจฉัยเบื้องต้น</li>
              <li>คำแนะนำดูแลสุขภาพจิต</li>
            </ul>
            <span className="mode-cta">
              เริ่มสแกนสุขภาพสมอง →
            </span>
          </button>

          {/* Medical Mode */}
          <button
            className="mode-card medical"
            onClick={() => router.push("/medical")}
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
              ดาวน์โหลดภาพความทรงจำและข้อมูลสมองเชิงลึก
              สำหรับใช้ในการรักษาทางจิตเวช หรือเป็นหลักฐานทางคดี
            </p>
            <ul className="mode-features">
              <li>ดาวน์โหลดภาพความทรงจำ</li>
              <li>ข้อมูลเชิงลึกสำหรับแพทย์</li>
              <li>รองรับการใช้ในทางคดี</li>
              <li>เข้ารหัสและรับรองความถูกต้อง</li>
            </ul>
            <span className="mode-cta">
              เข้าสู่โหมดทางการแพทย์ →
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}
