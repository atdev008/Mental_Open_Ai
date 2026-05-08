"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MedicalPhase = "connect" | "scanning" | "downloading" | "complete" | "gallery";

type MemoryPreview = {
  id: string;
  title: string;
  description: string;
  type: "image" | "video" | "audio" | "scene";
  emotion: string;
  date: string;
  duration?: string;
  colors: [string, string, string];
};

const memoryPreviews: MemoryPreview[] = [
  {
    id: "preview-001",
    title: "วันแรกที่พบกัน",
    description: "ภาพบรรยากาศร้านกาแฟย่านเมืองเก่า แสงอ่อนๆ ยามบ่าย ใบหน้าที่ยิ้มอยู่ตรงข้าม",
    type: "image",
    emotion: "ตื่นเต้น / อบอุ่น",
    date: "14 ก.พ. 2567",
    colors: ["rgba(255, 180, 120, 0.8)", "rgba(255, 122, 198, 0.6)", "rgba(84, 215, 255, 0.4)"]
  },
  {
    id: "preview-002",
    title: "วันเกิดอายุ 5 ขวบ",
    description: "วิดีโอความทรงจำ: เสียงเพลง Happy Birthday, แสงเทียนบนเค้ก, เสียงหัวเราะของครอบครัว",
    type: "video",
    emotion: "สุข / อบอุ่น",
    date: "12 ธ.ค. 2576",
    duration: "2:34",
    colors: ["rgba(255, 210, 110, 0.8)", "rgba(255, 122, 198, 0.5)", "rgba(98, 241, 212, 0.4)"]
  },
  {
    id: "preview-003",
    title: "ข้อความถึงคนที่รัก",
    description: "บันทึกเสียงความทรงจำ: น้ำเสียงอ่อนโยน ข้อความที่ฝากไว้ให้ครอบครัวในอนาคต",
    type: "audio",
    emotion: "อ่อนโยน / รัก",
    date: "3 พ.ย. 2592",
    duration: "4:12",
    colors: ["rgba(62, 120, 255, 0.7)", "rgba(84, 215, 255, 0.6)", "rgba(98, 241, 212, 0.4)"]
  },
  {
    id: "preview-004",
    title: "ช่วงเวลาสำคัญรับปริญญา",
    description: "ภาพพาโนรามา 360°: เวทีรับปริญญา เสียงเชียร์ ความภูมิใจที่เห็นได้จากทุกมุม",
    type: "scene",
    emotion: "ภูมิใจ / โล่งใจ",
    date: "21 มิ.ย. 2569",
    colors: ["rgba(98, 241, 212, 0.7)", "rgba(62, 120, 255, 0.6)", "rgba(255, 210, 110, 0.4)"]
  },
  {
    id: "preview-005",
    title: "เหตุการณ์สำคัญ [REDACTED]",
    description: "ข้อมูลภาพความทรงจำที่มีความอ่อนไหวสูง — ต้องได้รับอนุญาตจากศาลก่อนเปิดดู",
    type: "video",
    emotion: "— ปิดกั้น —",
    date: "15 ส.ค. 2588",
    duration: "8:45",
    colors: ["rgba(255, 80, 80, 0.6)", "rgba(180, 60, 60, 0.5)", "rgba(80, 20, 20, 0.7)"]
  },
  {
    id: "preview-006",
    title: "Emotional Baseline ปัจจุบัน",
    description: "แผนที่อารมณ์แบบ realtime: แสดงสถานะทางจิตใจ ณ วันที่สแกน เป็นข้อมูลอ้างอิง",
    type: "image",
    emotion: "สงบ / ปกติ",
    date: "8 พ.ค. 2569",
    colors: ["rgba(84, 215, 255, 0.6)", "rgba(98, 241, 212, 0.5)", "rgba(62, 120, 255, 0.4)"]
  }
];

const SCAN_DURATION_MS = 10000;
const DOWNLOAD_DURATION_MS = 8000;

const scanMessages = [
  "กำลังเข้าถึงพื้นที่ความทรงจำระยะยาว...",
  "กำลังถอดรหัสภาพความทรงจำจาก Hippocampus...",
  "กำลังแยกชั้นอารมณ์ออกจากข้อมูลภาพ...",
  "กำลังตรวจสอบความสมบูรณ์ของไฟล์ความทรงจำ...",
  "กำลังเตรียมข้อมูลสำหรับดาวน์โหลด..."
];

export function MedicalDownload() {
  const [phase, setPhase] = useState<MedicalPhase>("connect");
  const [connectStatus, setConnectStatus] = useState<"idle" | "connecting" | "connected">("idle");
  const [progress, setProgress] = useState(0);
  const [scanFrame, setScanFrame] = useState(0);
  const [activePreview, setActivePreview] = useState<string | null>(null);

  // Handle device connection
  async function handleConnect() {
    if (connectStatus !== "idle") return;
    setConnectStatus("connecting");

    await new Promise((resolve) => window.setTimeout(resolve, 2000));
    setConnectStatus("connected");
  }

  // Start memory scan after connected
  function handleStartScan() {
    if (connectStatus !== "connected") return;
    setPhase("scanning");
    setProgress(0);
  }

  // Scanning timer
  useEffect(() => {
    if (phase !== "scanning") return;

    const tick = 100;
    const timer = window.setInterval(() => {
      setScanFrame((f) => f + 1);
      setProgress((prev) => {
        const next = prev + (100 / (SCAN_DURATION_MS / tick));
        if (next >= 100) {
          // Auto transition to downloading after scan
          window.setTimeout(() => {
            setPhase("downloading");
            setProgress(0);
          }, 1500);
          return 100;
        }
        return next;
      });
    }, tick);

    return () => window.clearInterval(timer);
  }, [phase]);

  // Download timer
  useEffect(() => {
    if (phase !== "downloading") return;

    const tick = 100;
    const timer = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / (DOWNLOAD_DURATION_MS / tick));
        if (next >= 100) {
          setPhase("complete");
          return 100;
        }
        return next;
      });
    }, tick);

    return () => window.clearInterval(timer);
  }, [phase]);

  function getTitle() {
    switch (phase) {
      case "connect": return "เชื่อมต่ออุปกรณ์สแกนความทรงจำ";
      case "scanning": return "กำลังสแกนความทรงจำ";
      case "downloading": return "กำลังดาวน์โหลดข้อมูลความทรงจำ";
      case "complete": return "ดาวน์โหลดเสร็จสมบูรณ์";
      case "gallery": return "ภาพความทรงจำที่ดาวน์โหลด";
    }
  }

  return (
    <main className="page-shell">
      <section className="medical-screen panel glow">
        <div className="scan-topbar">
          <div>
            <span className="eyebrow">Medical Access</span>
            <h1>{getTitle()}</h1>
          </div>
          <div className="topbar-actions">
            {phase === "gallery" && (
              <button className="secondary-button" onClick={() => setPhase("complete")} type="button">
                ← กลับ
              </button>
            )}
            <Link className="secondary-button link-button" href="/">
              หน้าหลัก
            </Link>
          </div>
        </div>

        {/* Phase 1: Connect Device */}
        {phase === "connect" && (
          <div className="medical-connect-section">
            <div className="medical-notice panel">
              <div className="notice-icon">
                <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
                  <path d="M 16 4 L 30 28 L 2 28 Z" stroke="rgba(255, 210, 110, 0.9)" strokeWidth="2" strokeLinejoin="round" />
                  <line x1="16" y1="13" x2="16" y2="20" stroke="rgba(255, 210, 110, 0.9)" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="16" cy="24" r="1.5" fill="rgba(255, 210, 110, 0.9)" />
                </svg>
              </div>
              <div>
                <strong>โหมดทางการแพทย์ — ต้องเชื่อมต่ออุปกรณ์ก่อน</strong>
                <p>
                  การสแกนความทรงจำต้องใช้อุปกรณ์ NeuroLens ในโหมด Deep Memory Access
                  ข้อมูลทั้งหมดจะถูกเข้ารหัส end-to-end และบันทึกลง audit log
                </p>
              </div>
            </div>

            <div className="med-connect-grid">
              <div className="med-connect-visual">
                <div className={`med-device-orb ${connectStatus}`}>
                  <div className="med-orb-ring outer" />
                  <div className="med-orb-ring inner" />
                  <div className="med-orb-core">
                    <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                      <rect x="14" y="8" width="20" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
                      <circle cx="24" cy="20" r="5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M 20 30 L 28 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M 22 34 L 26 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="med-connect-info">
                <h2>NeuroLens Mini — Deep Memory Mode</h2>
                <p>
                  อุปกรณ์จะเข้าถึงพื้นที่ Hippocampus และ Temporal Lobe
                  เพื่อสแกนและถอดรหัสภาพความทรงจำที่เก็บไว้ในสมอง
                </p>

                <div className="med-specs">
                  <div className="med-spec-item">
                    <span>โหมด</span>
                    <strong>Deep Memory Access</strong>
                  </div>
                  <div className="med-spec-item">
                    <span>ความละเอียด</span>
                    <strong>Neural HD (4K equivalent)</strong>
                  </div>
                  <div className="med-spec-item">
                    <span>การเข้ารหัส</span>
                    <strong>AES-256 + Blockchain</strong>
                  </div>
                </div>

                <div className="med-connect-actions">
                  <button
                    className="primary-button"
                    disabled={connectStatus !== "idle"}
                    onClick={handleConnect}
                    type="button"
                  >
                    {connectStatus === "connecting" ? "กำลังเชื่อมต่อ..." : "เชื่อมต่ออุปกรณ์"}
                  </button>
                  <button
                    className="primary-button"
                    disabled={connectStatus !== "connected"}
                    onClick={handleStartScan}
                    type="button"
                  >
                    เริ่มสแกนความทรงจำ
                  </button>
                </div>

                <div className={`connection-badge ${connectStatus}`}>
                  <span className="badge-dot" />
                  <strong>
                    {connectStatus === "idle" && "รอเชื่อมต่อ"}
                    {connectStatus === "connecting" && "กำลังเชื่อมต่อ..."}
                    {connectStatus === "connected" && "เชื่อมต่อสำเร็จ — พร้อมสแกน"}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Scanning Memories */}
        {phase === "scanning" && (
          <div className="memory-scan-section">
            <div className="memory-scan-visual">
              <div className="mem-scan-brain">
                <div className="mem-scan-ring outer" />
                <div className="mem-scan-ring middle" />
                <div className="mem-scan-ring inner" />
                <div className="mem-scan-core">
                  <div className="mem-scan-beam" />
                  {/* Memory fragments floating */}
                  <span className="mem-fragment frag-1" />
                  <span className="mem-fragment frag-2" />
                  <span className="mem-fragment frag-3" />
                  <span className="mem-fragment frag-4" />
                  <span className="mem-fragment frag-5" />
                  <span className="mem-fragment frag-6" />
                </div>
              </div>

              <div className="mem-scan-stats">
                <div className="mem-stat">
                  <span>ความทรงจำที่พบ</span>
                  <strong>{Math.min(6, Math.floor(scanFrame / 16) + 1)}</strong>
                </div>
                <div className="mem-stat">
                  <span>ขนาดข้อมูล</span>
                  <strong>{(progress * 0.138).toFixed(1)} GB</strong>
                </div>
                <div className="mem-stat">
                  <span>ความสมบูรณ์</span>
                  <strong>{Math.min(98, 85 + Math.floor(scanFrame / 10))}%</strong>
                </div>
              </div>
            </div>

            <div className="memory-scan-info">
              <strong className="processing-step">
                {scanMessages[Math.floor(scanFrame / 20) % scanMessages.length]}
              </strong>
              <div className="progress-block">
                <div className="progress-track">
                  <span style={{ width: `${Math.min(100, progress)}%` }} />
                </div>
                <small>
                  {progress >= 100
                    ? "สแกนเสร็จสมบูรณ์ — กำลังเตรียมดาวน์โหลด..."
                    : `${Math.round(progress)}% — กำลังสแกนความทรงจำจากสมอง`}
                </small>
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Downloading */}
        {phase === "downloading" && (
          <div className="download-progress-section">
            <div className="download-visual">
              <div className="download-orb">
                <div className="dl-ring one" />
                <div className="dl-ring two" />
                <div className="dl-core">
                  <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
                    <path d="M 20 8 L 20 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 12 22 L 20 28 L 28 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 8 34 L 32 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="download-info">
              <strong>กำลังดาวน์โหลดและเข้ารหัสข้อมูลความทรงจำ...</strong>
              <p>ดาวน์โหลด 6 ไฟล์ พร้อมแนบ digital signature และ chain of custody</p>
              <div className="progress-block">
                <div className="progress-track">
                  <span style={{ width: `${progress}%` }} />
                </div>
                <small>{Math.round(progress)}% — กำลังเข้ารหัส AES-256 และบีบอัดข้อมูล</small>
              </div>
            </div>
          </div>
        )}

        {/* Phase 4: Complete */}
        {phase === "complete" && (
          <div className="download-complete-section">
            <div className="complete-visual">
              <div className="complete-circle">
                <svg viewBox="0 0 60 60" width="60" height="60" fill="none">
                  <circle cx="30" cy="30" r="26" stroke="rgba(98, 241, 212, 0.6)" strokeWidth="2" />
                  <path d="M 18 30 L 26 38 L 42 22" stroke="rgba(98, 241, 212, 0.9)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div className="complete-info">
              <h2>ดาวน์โหลดสำเร็จ</h2>
              <p>ดาวน์โหลด 6 ไฟล์ความทรงจำเรียบร้อยแล้ว</p>
            </div>

            <div className="complete-details">
              <div className="detail-card">
                <span>สถานะการเข้ารหัส</span>
                <strong>AES-256 Encrypted ✓</strong>
              </div>
              <div className="detail-card">
                <span>Digital Signature</span>
                <strong>SHA-512 Signed ✓</strong>
              </div>
              <div className="detail-card">
                <span>Audit Log</span>
                <strong>บันทึกแล้ว ✓</strong>
              </div>
              <div className="detail-card">
                <span>Chain of Custody</span>
                <strong>Blockchain Verified ✓</strong>
              </div>
            </div>

            <div className="complete-notice">
              <p>
                📋 ไฟล์ทั้งหมดถูกบันทึกลง secure storage พร้อม chain of custody
                ที่สามารถตรวจสอบย้อนกลับได้ สำหรับใช้เป็นหลักฐานทางการแพทย์หรือทางกฎหมาย
              </p>
            </div>

            <div className="complete-actions">
              <button className="primary-button" onClick={() => setPhase("gallery")} type="button">
                ดูภาพความทรงจำที่ดาวน์โหลด
              </button>
              <Link className="secondary-button link-button" href="/">
                กลับหน้าหลัก
              </Link>
            </div>
          </div>
        )}

        {/* Phase 5: Gallery */}
        {phase === "gallery" && (
          <div className="gallery-section">
            <div className="gallery-grid">
              {memoryPreviews.map((preview) => (
                <button
                  key={preview.id}
                  className={`gallery-card ${activePreview === preview.id ? "active" : ""}`}
                  onClick={() => setActivePreview(activePreview === preview.id ? null : preview.id)}
                  type="button"
                >
                  <div
                    className="gallery-visual"
                    style={{
                      background: `
                        radial-gradient(circle at 30% 30%, ${preview.colors[0]}, transparent 50%),
                        radial-gradient(circle at 70% 60%, ${preview.colors[1]}, transparent 45%),
                        radial-gradient(circle at 50% 80%, ${preview.colors[2]}, transparent 50%),
                        linear-gradient(160deg, rgba(6, 14, 28, 0.9), rgba(4, 10, 20, 0.95))
                      `
                    }}
                  >
                    <div className="gallery-type-icon">
                      {preview.type === "image" && (
                        <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
                          <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="11" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M 4 22 L 12 16 L 18 20 L 28 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {preview.type === "video" && (
                        <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
                          <rect x="3" y="7" width="20" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M 23 12 L 29 8 L 29 24 L 23 20 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                      )}
                      {preview.type === "audio" && (
                        <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
                          <path d="M 8 12 L 8 20 L 13 20 L 20 25 L 20 7 L 13 12 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                          <path d="M 23 11 C 25 13 25 19 23 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M 26 8 C 29 12 29 20 26 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      )}
                      {preview.type === "scene" && (
                        <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
                          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
                          <ellipse cx="16" cy="16" rx="5" ry="12" stroke="currentColor" strokeWidth="1" />
                          <line x1="4" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      )}
                    </div>
                    {preview.duration && (
                      <span className="gallery-duration">{preview.duration}</span>
                    )}
                    <div className="gallery-scanlines" />
                  </div>

                  <div className="gallery-info">
                    <h3>{preview.title}</h3>
                    <p>{preview.description}</p>
                    <div className="gallery-meta">
                      <span className={`file-type type-${preview.type === "scene" ? "contextual" : preview.type === "image" ? "visual" : preview.type}`}>
                        {preview.type}
                      </span>
                      <span>{preview.date}</span>
                      <span className="gallery-emotion">{preview.emotion}</span>
                    </div>
                  </div>

                  {activePreview === preview.id && (
                    <div className="gallery-expanded">
                      <div className="gallery-waveform">
                        {Array.from({ length: 20 }, (_, i) => (
                          <span
                            key={i}
                            className="gallery-wave-bar"
                            style={{ height: `${30 + Math.sin(i * 0.8) * 50 + 20}%` }}
                          />
                        ))}
                      </div>
                      <div className="gallery-actions-row">
                        <span className="gallery-action-btn">▶ เล่นซ้ำ</span>
                        <span className="gallery-action-btn">📋 Export</span>
                        <span className="gallery-action-btn">🔒 Verify</span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
