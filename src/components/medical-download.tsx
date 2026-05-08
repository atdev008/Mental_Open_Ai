"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type MedicalPhase = "purpose" | "connect" | "scanning" | "downloading" | "complete" | "report" | "gallery";

type PurposeType = "medical-restore" | "medical-preserve" | "judicial" | null;

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
    title: "The Day We First Met",
    description: "Scene of a coffee shop in the old town, soft afternoon light, a smiling face across the table",
    type: "image",
    emotion: "Excited / Warm",
    date: "Feb 14, 2024",
    colors: ["rgba(255, 180, 120, 0.8)", "rgba(255, 122, 198, 0.6)", "rgba(84, 215, 255, 0.4)"]
  },
  {
    id: "preview-002",
    title: "5th Birthday",
    description: "Memory video: Happy Birthday song, candlelight on the cake, family laughter",
    type: "video",
    emotion: "Happy / Warm",
    date: "Dec 12, 2033",
    duration: "2:34",
    colors: ["rgba(255, 210, 110, 0.8)", "rgba(255, 122, 198, 0.5)", "rgba(98, 241, 212, 0.4)"]
  },
  {
    id: "preview-003",
    title: "Message to Loved Ones",
    description: "Audio memory recording: a gentle voice, a message left for family in the future",
    type: "audio",
    emotion: "Gentle / Love",
    date: "Nov 3, 2049",
    duration: "4:12",
    colors: ["rgba(62, 120, 255, 0.7)", "rgba(84, 215, 255, 0.6)", "rgba(98, 241, 212, 0.4)"]
  },
  {
    id: "preview-004",
    title: "Graduation Ceremony",
    description: "360° panorama: graduation stage, cheering sounds, pride visible from every angle",
    type: "scene",
    emotion: "Proud / Relieved",
    date: "Jun 21, 2026",
    colors: ["rgba(98, 241, 212, 0.7)", "rgba(62, 120, 255, 0.6)", "rgba(255, 210, 110, 0.4)"]
  },
  {
    id: "preview-005",
    title: "Critical Event [REDACTED]",
    description: "Highly sensitive memory image data — court authorization required before viewing",
    type: "video",
    emotion: "— Blocked —",
    date: "Aug 15, 2045",
    duration: "8:45",
    colors: ["rgba(255, 80, 80, 0.6)", "rgba(180, 60, 60, 0.5)", "rgba(80, 20, 20, 0.7)"]
  },
  {
    id: "preview-006",
    title: "Current Emotional Baseline",
    description: "Real-time emotion map: displays mental state at the time of scan as reference data",
    type: "image",
    emotion: "Calm / Normal",
    date: "May 8, 2026",
    colors: ["rgba(84, 215, 255, 0.6)", "rgba(98, 241, 212, 0.5)", "rgba(62, 120, 255, 0.4)"]
  }
];

const SCAN_DURATION_MS = 10000;
const DOWNLOAD_DURATION_MS = 8000;

const scanMessages = [
  "Accessing long-term memory regions...",
  "Decoding memory images from Hippocampus...",
  "Separating emotional layers from image data...",
  "Verifying memory file integrity...",
  "Preparing data for download..."
];

export function MedicalDownload() {
  const searchParams = useSearchParams();
  const urlPurpose = searchParams.get("purpose");

  // Determine initial phase based on URL param
  const initialPhase: MedicalPhase = urlPurpose ? "connect" : "purpose";
  const initialPurpose: PurposeType = urlPurpose === "judicial"
    ? "judicial"
    : urlPurpose === "medical"
      ? "medical-restore"
      : null;

  const [phase, setPhase] = useState<MedicalPhase>(initialPhase);
  const [purpose, setPurpose] = useState<PurposeType>(initialPurpose);
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
      case "purpose": return "Select Purpose";
      case "connect": return "Connect Memory Scan Device";
      case "scanning": return "Scanning Memories";
      case "downloading": return "Downloading Memory Data";
      case "complete": return "Download Complete";
      case "report": return "Memory Data Report Summary";
      case "gallery": return "Downloaded Memory Gallery";
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
              <button className="secondary-button" onClick={() => setPhase("report")} type="button">
                ← Back
              </button>
            )}
            {phase === "report" && (
              <button className="secondary-button" onClick={() => setPhase("complete")} type="button">
                ← Back
              </button>
            )}
            <Link className="secondary-button link-button" href="/">
              Home
            </Link>
          </div>
        </div>

        {/* Phase 0: Purpose Selection */}
        {phase === "purpose" && (
          <div className="purpose-select-section">
            <p className="purpose-intro">
              Please select the purpose for scanning and downloading memories.
              The system will adjust its operating mode based on the selected purpose.
            </p>

            <div className="purpose-select-grid">
              {/* Medical - Restore */}
              <button
                className={`purpose-option ${purpose === "medical-restore" ? "selected" : ""}`}
                onClick={() => setPurpose("medical-restore")}
                type="button"
              >
                <div className="purpose-opt-icon restore-icon">
                  <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
                    <path d="M 8 20 C 8 13 13 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 8 20 L 5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 8 20 L 11 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2" />
                    <path d="M 20 14 L 20 20 L 25 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Memory Restoration</h3>
                <span className="purpose-opt-category">Medical</span>
                <p>
                  For patients with memory loss, such as Alzheimer&apos;s, brain injuries,
                  or PTSD. Uses memory images to stimulate and restore lost memories.
                </p>
                <ul>
                  <li>Cognitive Rehabilitation</li>
                  <li>Trauma Therapy (EMDR)</li>
                  <li>Memory Reconstruction</li>
                </ul>
              </button>

              {/* Medical - Preserve */}
              <button
                className={`purpose-option ${purpose === "medical-preserve" ? "selected" : ""}`}
                onClick={() => setPurpose("medical-preserve")}
                type="button"
              >
                <div className="purpose-opt-icon preserve-icon">
                  <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
                    <rect x="8" y="6" width="24" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
                    <path d="M 14 14 L 26 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M 14 19 L 26 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M 14 24 L 22 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M 24 22 L 24 30 L 32 30 L 32 22 Z" fill="rgba(98, 241, 212, 0.2)" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 26 26 L 28 28 L 32 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Memory Preservation</h3>
                <span className="purpose-opt-category">Medical</span>
                <p>
                  Back up memory data before deterioration. Used for Digital Legacy
                  or to preserve and pass on to family in the future.
                </p>
                <ul>
                  <li>Digital Legacy Backup</li>
                  <li>Pre-deterioration Archive</li>
                  <li>Family Memory Transfer</li>
                </ul>
              </button>

              {/* Judicial */}
              <button
                className={`purpose-option judicial ${purpose === "judicial" ? "selected" : ""}`}
                onClick={() => setPurpose("judicial")}
                type="button"
              >
                <div className="purpose-opt-icon judicial-icon">
                  <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
                    <path d="M 20 4 L 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 20 8 L 8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 20 8 L 32 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 4 15 C 4 15 8 22 12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 28 15 C 28 15 32 22 36 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 20 8 L 20 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 14 30 L 26 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 12 34 L 28 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>Judicial Evidence</h3>
                <span className="purpose-opt-category judicial-cat">Legal</span>
                <p>
                  Extract memories from witnesses or victims for use as evidence in court proceedings.
                  Data will be certified for use in the justice system.
                </p>
                <ul>
                  <li>Criminal Case Evidence</li>
                  <li>Investigation & Inquiry</li>
                  <li>Chain of Custody Certified</li>
                </ul>
              </button>
            </div>

            <div className="purpose-select-actions">
              <button
                className="primary-button"
                disabled={purpose === null}
                onClick={() => setPhase("connect")}
                type="button"
              >
                Continue
              </button>
              <small>
                {purpose === "medical-restore" && "Mode: Memory Restoration — System will focus scanning on the Hippocampus area"}
                {purpose === "medical-preserve" && "Mode: Memory Preservation — System will perform a Full Archive scan"}
                {purpose === "judicial" && "Mode: Judicial — System will enable Chain of Custody and Audit Log automatically"}
                {purpose === null && "Please select a purpose to continue"}
              </small>
            </div>
          </div>
        )}

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
                <strong>
                  {purpose === "judicial"
                    ? "Judicial Mode — Chain of Custody Enabled"
                    : "Medical Mode — Device connection required"}
                </strong>
                <p>
                  {purpose === "judicial"
                    ? "Memory scans will be recorded in the system. All data is certified for use in court."
                    : "Memory scanning requires a NeuroLens device in Deep Memory Access mode. All data is protected."}
                </p>
              </div>
            </div>

            <div className="med-connect-grid">
              <div className="med-connect-visual">
                <div className={`device-glow-ring ${connectStatus}`} />
                <div className={`device-glow-ring inner ${connectStatus}`} />
                <div className={`device-image-wrap ${connectStatus}`}>
                  <Image
                    src="/device-ep.png"
                    alt="Brain device concept"
                    width={1100}
                    height={700}
                    priority
                    className="device-img"
                  />
                </div>
              </div>

              <div className="med-connect-info">
                <h2>NeuroLens Mini — Deep Memory Mode</h2>
                <p>
                  {purpose === "judicial"
                    ? "The device will access memory regions to extract evidence for the justice system. Data will be certified with automatic Chain of Custody."
                    : purpose === "medical-preserve"
                      ? "The device will scan and preserve all memories in Full Archive format to prevent deterioration."
                      : "The device will access the Visual Experience Reconstruction area (from Neural Decoding) to scan and decode memory images for restoration."}
                </p>

                <div className="med-specs">
                  <div className="med-spec-item">
                    <span>Mode</span>
                    <strong>Deep Memory Access</strong>
                  </div>
                  <div className="med-spec-item">
                    <span>Resolution</span>
                    <strong>Neural HD (4K equivalent)</strong>
                  </div>
                  <div className="med-spec-item">
                    <span>Security</span>
                    <strong>Maximum Level</strong>
                  </div>
                </div>

                <div className="med-connect-actions">
                  {connectStatus !== "connected" ? (
                    <button
                      className="primary-button"
                      disabled={connectStatus === "connecting"}
                      onClick={handleConnect}
                      type="button"
                    >
                      {connectStatus === "connecting" ? "Connecting..." : "Connect Device"}
                    </button>
                  ) : (
                    <button
                      className="primary-button"
                      onClick={handleStartScan}
                      type="button"
                    >
                      Start Memory Scan
                    </button>
                  )}
                </div>

                <div className={`connection-badge ${connectStatus}`}>
                  <span className="badge-dot" />
                  <strong>
                    {connectStatus === "idle" && "Awaiting Connection"}
                    {connectStatus === "connecting" && "Connecting..."}
                    {connectStatus === "connected" && "Connected — Ready to Scan"}
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
                  <span>Memories Found</span>
                  <strong>{Math.min(6, Math.floor(scanFrame / 16) + 1)}</strong>
                </div>
                <div className="mem-stat">
                  <span>Data Size</span>
                  <strong>{(progress * 0.138).toFixed(1)} GB</strong>
                </div>
                <div className="mem-stat">
                  <span>Integrity</span>
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
                    ? "Scan complete — preparing download..."
                    : `${Math.round(progress)}% — scanning memories from brain`}
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
              <strong>Downloading memory data...</strong>
              <p>Downloading 6 files with integrity verification</p>
              <div className="progress-block">
                <div className="progress-track">
                  <span style={{ width: `${progress}%` }} />
                </div>
                <small>{Math.round(progress)}% — processing and compressing data</small>
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
              <h2>Download Successful</h2>
              <p>6 memory files downloaded successfully</p>
            </div>

            <div className="complete-details">
              <div className="detail-card">
                <span>Data Status</span>
                <strong>Secure ✓</strong>
              </div>
              <div className="detail-card">
                <span>Certification</span>
                <strong>Certified ✓</strong>
              </div>
              <div className="detail-card">
                <span>Access Log</span>
                <strong>Recorded ✓</strong>
              </div>
              <div className="detail-card">
                <span>Accuracy</span>
                <strong>Verified ✓</strong>
              </div>
            </div>

            <div className="complete-notice">
              <p>
                📋 All files have been saved to secure storage with chain of custody
                that can be traced back. For use as medical or legal evidence.
              </p>
            </div>

            <div className="complete-actions">
              <button className="primary-button" onClick={() => setPhase("report")} type="button">
                View Report Summary
              </button>
              <Link className="secondary-button link-button" href="/">
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {/* Phase 5: Report Summary */}
        {phase === "report" && (
          <div className="report-section">
            {/* Memory list summary */}
            <div className="report-list-panel panel">
              <div className="panel-header">
                <div>
                  <span className="eyebrow">Memory Files</span>
                  <h2>Scanned Memory Files</h2>
                </div>
                <span className="status-chip connected">6 files</span>
              </div>

              <div className="report-file-list">
                {memoryPreviews.map((item, index) => (
                  <div className="report-file-row" key={item.id}>
                    <span className="report-file-num">{String(index + 1).padStart(2, "0")}</span>
                    <div className="report-file-info">
                      <strong>{item.title}</strong>
                      <span>{item.date} · {item.type} · {item.emotion}</span>
                    </div>
                    <span className={`file-type type-${item.type === "scene" ? "contextual" : item.type === "image" ? "visual" : item.type}`}>
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Show only relevant section based on purpose */}
            {purpose !== "judicial" && (
              <div className="report-card panel">
                <div className="report-card-icon medical-use-icon">
                  <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
                    <rect x="15" y="4" width="10" height="32" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <rect x="4" y="15" width="32" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </div>
                <h3>Medical Use</h3>
                <p className="report-card-desc">
                  Memory data can be used to support psychiatric treatment as follows:
                </p>

                <ul className="report-use-list">
                  <li>
                    <strong>Trauma Therapy (EMDR)</strong>
                    <span>Use memory images to reprocess traumatic events, helping reduce PTSD symptoms</span>
                  </li>
                  <li>
                    <strong>Cognitive Rehabilitation</strong>
                    <span>Restore memory in patients with memory issues, such as early-stage Alzheimer&apos;s</span>
                  </li>
                  <li>
                    <strong>Emotional Mapping</strong>
                    <span>Analyze emotional patterns linked to memories for treatment planning</span>
                  </li>
                  <li>
                    <strong>Baseline Assessment</strong>
                    <span>Use as a reference for mental state at the time of scan for future comparison</span>
                  </li>
                </ul>

                <div className="report-card-footer">
                  <span className="report-badge medical-badge">For qualified medical professionals only</span>
                </div>
              </div>
            )}

            {purpose === "judicial" && (
              <div className="report-card panel">
                <div className="report-card-icon legal-use-icon">
                  <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
                    <path d="M 20 4 L 20 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M 20 8 L 6 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M 20 8 L 34 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M 2 16 C 2 16 6 24 10 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M 30 16 C 30 16 34 24 38 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M 16 32 L 24 32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M 12 36 L 28 36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M 20 8 L 20 32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>Legal / Judicial Use</h3>
                <p className="report-card-desc">
                  Certified data can be used as evidence in the justice system.
                </p>

                <ul className="report-use-list">
                  <li>
                    <strong>Criminal Case Evidence</strong>
                    <span>Certified memory images can be used to confirm events in court</span>
                  </li>
                  <li>
                    <strong>Investigation & Inquiry</strong>
                    <span>Assists law enforcement in gathering information from witnesses or victims</span>
                  </li>
                  <li>
                    <strong>Civil / Family Cases</strong>
                    <span>Used in consideration of rights in inheritance cases, Digital Legacy, or family disputes</span>
                  </li>
                  <li>
                    <strong>Chain of Custody</strong>
                    <span>All file data has tamper-proof records that cannot be retroactively modified</span>
                  </li>
                </ul>

                <div className="report-card-footer">
                  <span className="report-badge legal-badge">Court order or consent required</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="report-actions">
              <button className="primary-button" onClick={() => setPhase("gallery")} type="button">
                View Memory Gallery
              </button>
              <Link className="secondary-button link-button" href="/">
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {/* Phase 6: Gallery */}
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
                        <span className="gallery-action-btn">▶ Replay</span>
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
