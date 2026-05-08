"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BrainSvg } from "@/components/brain-svg";
import { DeviceStatus } from "@/lib/types";

type ScanMonitorProps = {
  initialDevice: DeviceStatus;
};

type SignalCard = {
  label: string;
  value: string;
  delta: string;
};

type ScanPhase = "scanning" | "complete";

const SCAN_DURATION_MS = 10000;
const TICK_INTERVAL_MS = 100;

const scanMessages = [
  "กำลังอ่านคลื่นสมองและจัดตำแหน่งเซนเซอร์",
  "กำลังจับ pattern ของสัญญาณประสาท",
  "กำลังแปลงสัญญาณเป็นค่า monitoring แบบเรียลไทม์",
  "ระบบกำลังตรวจสอบคุณภาพข้อมูลก่อนบันทึก"
];

function formatMetric(label: string, frame: number): SignalCard {
  switch (label) {
    case "EEG":
      return {
        label,
        value: `${88 + ((frame * 3) % 8)}%`,
        delta: `+${1 + (frame % 3)}%`
      };
    case "Stress":
      return {
        label,
        value: `${30 + ((frame * 5) % 18)}/100`,
        delta: `-${2 + (frame % 4)}`
      };
    case "HRV":
      return {
        label,
        value: `${68 + ((frame * 2) % 12)} ms`,
        delta: `+${2 + (frame % 3)}`
      };
    case "Sleep":
      return {
        label,
        value: `${(7.1 + ((frame % 5) * 0.1)).toFixed(1)} ชม.`,
        delta: `+0.${frame % 9}`
      };
    default:
      return {
        label,
        value: `${82 + ((frame * 4) % 12)}%`,
        delta: `+${1 + (frame % 4)}%`
      };
  }
}

export function ScanMonitor({ initialDevice }: ScanMonitorProps) {
  const router = useRouter();
  const [frame, setFrame] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [phase, setPhase] = useState<ScanPhase>("scanning");

  useEffect(() => {
    if (phase === "complete") return;

    const timer = window.setInterval(() => {
      setElapsed((current) => {
        const next = current + TICK_INTERVAL_MS;
        if (next >= SCAN_DURATION_MS) {
          setPhase("complete");
          return SCAN_DURATION_MS;
        }
        return next;
      });
      setFrame((current) => current + 1);
    }, TICK_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [phase]);

  // Navigate to results 2 seconds after scan completes
  useEffect(() => {
    if (phase !== "complete") return;

    const timeout = window.setTimeout(() => {
      router.push("/results");
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, [phase, router]);

  const progress = phase === "complete" ? 100 : Math.min(99, Math.round((elapsed / SCAN_DURATION_MS) * 100));
  const elapsedSeconds = (elapsed / 1000).toFixed(1);

  const signalCards = useMemo(
    () => initialDevice.sensors.map((sensor) => formatMetric(sensor.label, frame)),
    [frame, initialDevice.sensors]
  );
  const waveformBars = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => {
        if (phase === "complete") return 50;
        // Alpha wave pattern (8-12 Hz feel) with slight randomness for organic look
        const alpha = Math.sin((frame * 0.8 + index * 0.9)) * 30;
        const beta = Math.sin((frame * 1.4 + index * 1.6)) * 12;
        const noise = (Math.sin(frame * 3.7 + index * 7.3) * 0.5 + 0.5) * 10 - 5;
        return Math.max(10, Math.min(95, 50 + alpha + beta + noise));
      }),
    [frame, phase]
  );

  const currentMessage = phase === "complete"
    ? "สแกนเสร็จสมบูรณ์ ข้อมูลพร้อมสำหรับการวิเคราะห์"
    : scanMessages[Math.floor(frame / 10) % scanMessages.length];

  return (
    <main className="page-shell">
      <section className="scan-screen panel glow">
        <div className="scan-topbar">
          <div>
            <span className="eyebrow">Brain Scan</span>
            <h1>{phase === "complete" ? "สแกนเสร็จสมบูรณ์" : "กำลังสแกนและแปลงสัญญาณสมอง"}</h1>
          </div>
          <div className="topbar-actions">
            <Link className="secondary-button link-button" href="/connect">
              กลับไปหน้าเชื่อมต่อ
            </Link>
            <Link className="secondary-button link-button" href="/">
              ← หน้าหลัก
            </Link>
          </div>
        </div>

        <div className="scan-layout">
          <div className={`scan-visual panel ${phase === "complete" ? "scan-done" : ""}`}>
            <div className="scan-status-line">
              <strong>{currentMessage}</strong>
              <span className={phase === "complete" ? "complete-badge" : ""}>{progress}% complete</span>
            </div>

            <div className={`brain-scanner ${phase === "complete" ? "scan-complete" : ""}`}>
              <BrainSvg frame={frame} isComplete={phase === "complete"} />
            </div>

            <div className="waveform-panel">
              {waveformBars.map((height, index) => (
                <span
                  className={`wave-bar ${phase === "complete" ? "wave-bar-done" : ""}`}
                  key={`${index}-${height}`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <div className="scan-data">
            <article className="panel signal-panel">
              <div className="panel-header">
                <div>
                  <span className="eyebrow">Live Signals</span>
                  <h2>{phase === "complete" ? "ผลลัพธ์สุดท้าย" : "ค่าที่ตรวจพบระหว่างสแกน"}</h2>
                </div>
                <span className={`status-chip ${phase === "complete" ? "complete" : "connected"}`}>
                  {phase === "complete" ? "Complete" : "Connected"}
                </span>
              </div>

              <div className="signal-grid">
                {signalCards.map((card) => (
                  <div className="signal-card" key={card.label}>
                    <span>{card.label}</span>
                    <strong>{card.value}</strong>
                    <small>{card.delta}</small>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel telemetry-panel">
              <div className="panel-header">
                <div>
                  <span className="eyebrow">Telemetry</span>
                  <h2>สถานะการตรวจจับ</h2>
                </div>
              </div>

              <div className="telemetry-list">
                <div className="telemetry-row">
                  <span>คุณภาพสัญญาณ</span>
                  <strong>{phase === "complete" ? "98%" : `${88 + (frame % 10)}%`}</strong>
                </div>
                <div className="telemetry-row">
                  <span>ตำแหน่งเซนเซอร์</span>
                  <strong>เสถียร</strong>
                </div>
                <div className="telemetry-row">
                  <span>โหมดการสแกน</span>
                  <strong>{phase === "complete" ? "Scan Complete" : "Neural Pattern Decode"}</strong>
                </div>
                <div className="telemetry-row">
                  <span>เวลาที่ใช้</span>
                  <strong>{elapsedSeconds} วินาที</strong>
                </div>
              </div>

              <div className="progress-block">
                <div className={`progress-track ${phase === "complete" ? "progress-done" : ""}`}>
                  <span style={{ width: `${progress}%` }} />
                </div>
                <small>
                  {phase === "complete"
                    ? "สแกนเสร็จสมบูรณ์ ข้อมูลถูกบันทึกเรียบร้อยแล้ว"
                    : "ระบบกำลังสะสมข้อมูลสำหรับสร้างผลลัพธ์จากสัญญาณสมอง"}
                </small>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

