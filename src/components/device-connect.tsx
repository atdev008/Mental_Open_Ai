"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeviceStatus } from "@/lib/types";

type DeviceConnectProps = {
  initialDevice: DeviceStatus;
};

type ConnectionPhase = "idle" | "connecting" | "connected";

function getInitialPhase(connection: DeviceStatus["connection"]): ConnectionPhase {
  return connection === "connected" ? "connected" : "idle";
}

export function DeviceConnect({ initialDevice }: DeviceConnectProps) {
  const router = useRouter();
  const [device, setDevice] = useState(initialDevice);
  const [phase, setPhase] = useState<ConnectionPhase>(getInitialPhase(initialDevice.connection));
  const [message, setMessage] = useState("อุปกรณ์พร้อมจับคู่กับระบบสแกนสมอง");

  async function handleConnect() {
    if (phase !== "idle") {
      return;
    }

    setPhase("connecting");
    setMessage("กำลังค้นหาอุปกรณ์และจับคู่สัญญาณ...");

    await new Promise((resolve) => window.setTimeout(resolve, 1800));

    const response = await fetch("/api/device/connect", {
      method: "POST"
    });
    const nextDevice: DeviceStatus = await response.json();

    setDevice(nextDevice);
    setPhase("connected");
    setMessage("เชื่อมต่อสำเร็จ พร้อมเริ่มสแกนสมอง");
  }

  function handleStartScan() {
    if (phase !== "connected") {
      return;
    }

    router.push("/scan");
  }

  return (
    <main className="page-shell">
      <section className="connect-screen panel glow">
        <div className="connect-topbar">
          <div className="eyebrow">Neural Device Link</div>
          <Link className="secondary-button link-button" href="/">
            ← กลับหน้าเลือกโหมด
          </Link>
        </div>
        <div className="connect-grid">
          <div className="connect-copy">
            <h1>เชื่อมต่ออุปกรณ์ก่อนเริ่มสแกนสมอง</h1>
            <p>
              ใช้ภาพอุปกรณ์จากต้นแบบเป็นจุดเริ่มต้นของ flow จริง: จับคู่, ยืนยันการเชื่อมต่อ,
              แล้วค่อยเข้าสู่หน้าสแกนสัญญาณสมอง
            </p>

            <div className="connect-stats">
              <div className="stat-card">
                <span>Device</span>
                <strong>{device.model}</strong>
              </div>
              <div className="stat-card">
                <span>Firmware</span>
                <strong>{device.firmwareVersion}</strong>
              </div>
              <div className="stat-card">
                <span>Battery</span>
                <strong>{device.batteryLevel}%</strong>
              </div>
            </div>

            <div className="connect-actions">
              {phase !== "connected" ? (
                <button
                  className="primary-button"
                  disabled={phase === "connecting"}
                  onClick={handleConnect}
                  type="button"
                >
                  {phase === "connecting" ? "กำลังเชื่อมต่อ..." : "เชื่อมต่ออุปกรณ์"}
                </button>
              ) : (
                <button
                  className="primary-button"
                  onClick={handleStartScan}
                  type="button"
                >
                  เริ่มสแกน
                </button>
              )}
            </div>

            <div className={`connection-badge ${phase}`}>
              <span className="badge-dot" />
              <strong>
                {phase === "idle" && "ยังไม่ได้เชื่อมต่อ"}
                {phase === "connecting" && "กำลังเชื่อมต่อ"}
                {phase === "connected" && "เชื่อมต่อสำเร็จ"}
              </strong>
              <small>{message}</small>
            </div>
          </div>

          <div className="device-stage">
            <div className={`device-glow-ring ${phase}`} />
            <div className={`device-glow-ring inner ${phase}`} />
            <div className={`device-image-wrap ${phase}`}>
              <Image
                src="/device-ep.png"
                alt="Brain device concept"
                width={1100}
                height={700}
                priority
                className="device-img"
              />
            </div>
            <div className="device-status-panel">
              <span>Signal Handshake</span>
              <strong>{phase === "connected" ? "Secure Link Online" : "Awaiting Pairing"}</strong>
              <small>
                {phase === "connected"
                  ? `คุณภาพสัญญาณเริ่มต้น ${device.signalQuality}%`
                  : "กดเชื่อมต่อเพื่อเริ่มทำ handshake ระหว่างอุปกรณ์กับระบบ"}
              </small>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
