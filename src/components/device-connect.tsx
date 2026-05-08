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
  const [message, setMessage] = useState("Device ready to pair with brain scan system");

  async function handleConnect() {
    if (phase !== "idle") {
      return;
    }

    setPhase("connecting");
    setMessage("Searching for device and pairing signal...");

    await new Promise((resolve) => window.setTimeout(resolve, 1800));

    const response = await fetch("/api/device/connect", {
      method: "POST"
    });
    const nextDevice: DeviceStatus = await response.json();

    setDevice(nextDevice);
    setPhase("connected");
    setMessage("Connected successfully. Ready to start brain scan");
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
            ← Back to mode selection
          </Link>
        </div>
        <div className="connect-grid">
          <div className="connect-copy">
            <h1>Connect device before starting brain scan</h1>
            <p>
              Use the device image from the prototype as the starting point of the actual flow: pair, confirm connection,
              then proceed to the brain signal scan page
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
                  {phase === "connecting" ? "Connecting..." : "Connect Device"}
                </button>
              ) : (
                <button
                  className="primary-button"
                  onClick={handleStartScan}
                  type="button"
                >
                  Start Scan
                </button>
              )}
            </div>

            <div className={`connection-badge ${phase}`}>
              <span className="badge-dot" />
              <strong>
                {phase === "idle" && "Not Connected"}
                {phase === "connecting" && "Connecting"}
                {phase === "connected" && "Connected"}
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
                  ? `Initial signal quality ${device.signalQuality}%`
                  : "Press connect to initiate handshake between device and system"}
              </small>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
