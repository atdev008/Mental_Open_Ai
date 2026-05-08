import {
  ConsentProfile,
  DashboardSnapshot,
  DeviceStatus,
  InsightCard,
  MemoryEvent
} from "@/lib/types";

const baseDeviceStatus: DeviceStatus = {
  id: "neuro-lens-mini",
  model: "NeuroLens Mini",
  firmwareVersion: "2.6.1",
  connection: "standby",
  syncState: "idle",
  batteryLevel: 82,
  signalQuality: 94,
  comfortScore: 91,
  lastSyncAt: "2026-05-08T20:36:00.000Z",
  sensors: [
    { label: "EEG", value: "Balanced", delta: "+2%", status: "stable" },
    { label: "Stress", value: "36/100", delta: "-8", status: "stable" },
    { label: "HRV", value: "71 ms", delta: "+4", status: "stable" },
    { label: "Sleep", value: "7.4 hrs", delta: "+0.8", status: "stable" },
    { label: "Focus", value: "84%", delta: "+5%", status: "stable" }
  ]
};

const baseMemories: MemoryEvent[] = [
  {
    id: "birthday-2033",
    title: "5th Birthday",
    happenedAt: "2033-12-12T12:30:00.000Z",
    ageAtEvent: 5,
    location: "Bangkok",
    emotion: "Warm",
    sensitivity: "low",
    summary: "Birthday dinner with family, laughter and excitement before blowing out the candles",
    tags: ["family", "celebration", "childhood"],
    mediaType: "photo",
    replayReadiness: 96
  },
  {
    id: "graduation-2026",
    title: "Graduation Ceremony",
    happenedAt: "2026-06-21T02:15:00.000Z",
    ageAtEvent: 22,
    location: "University",
    emotion: "Proud",
    sensitivity: "medium",
    summary: "The graduation stage, cheering from family, and relief after months of rehearsal",
    tags: ["achievement", "education", "family"],
    mediaType: "scene",
    replayReadiness: 88
  },
  {
    id: "first-meeting-2024",
    title: "The Day We First Met",
    happenedAt: "2024-02-14T11:30:00.000Z",
    ageAtEvent: 20,
    location: "Coffee shop in the old town",
    emotion: "Excited",
    sensitivity: "medium",
    summary: "First conversation, slight shyness, and the song playing in the shop directly linked to this memory",
    tags: ["love", "personal life"],
    mediaType: "feeling",
    replayReadiness: 92
  },
  {
    id: "farewell-message-2049",
    title: "Message to Loved Ones",
    happenedAt: "2049-11-03T16:45:00.000Z",
    ageAtEvent: 45,
    location: "Home",
    emotion: "Gentle",
    sensitivity: "high",
    summary: "Voice recording and memory intent to pass on to family in Digital Legacy mode",
    tags: ["legacy", "family", "voice"],
    mediaType: "voice",
    replayReadiness: 74
  }
];

const baseConsent: ConsentProfile = {
  endToEndEncryption: true,
  multiFactorAuth: true,
  decentralizedStorage: true,
  digitalLegacyEnabled: true,
  approvedAudiences: ["Owner only", "Family", "Authorized physicians"],
  retentionPolicy: "Stored encrypted indefinitely until consent is withdrawn",
  emergencyAccess: "Requires dual-party verification before activation"
};

const baseInsights: InsightCard[] = [
  {
    id: "restore-routine",
    title: "Short brain break recommended",
    detail: "Afternoon stress slightly elevated. System recommends recording a 90-second emotional reflection.",
    priority: "care"
  },
  {
    id: "memory-cluster",
    title: "Family memory cluster detected",
    detail: "AI grouped events with warm feelings and overview images, ready to create a retrospective timeline.",
    priority: "memory"
  },
  {
    id: "legal-ready",
    title: "Emergency access rights ready",
    detail: "Policy system is in a safe state and compliant with the data owner's latest consent.",
    priority: "assist"
  }
];

let device = { ...baseDeviceStatus };
let memories = [...baseMemories];
let consent = {
  ...baseConsent,
  approvedAudiences: [...baseConsent.approvedAudiences]
};
let insights = [...baseInsights];

export function getDashboardSnapshot(): DashboardSnapshot {
  return {
    device,
    memories,
    consent,
    insights
  };
}

export function getDeviceStatus(): DeviceStatus {
  return device;
}

export function connectDevice(): DeviceStatus {
  device = {
    ...device,
    connection: "connected",
    syncState: "idle"
  };

  return device;
}

export function listMemories(): MemoryEvent[] {
  return memories;
}

export function getConsentProfile(): ConsentProfile {
  return consent;
}

export function triggerSync(): DeviceStatus {
  const now = new Date().toISOString();

  device = {
    ...device,
    connection: "connected",
    syncState: "complete",
    lastSyncAt: now,
    signalQuality: Math.max(88, Math.min(99, device.signalQuality + 1)),
    sensors: device.sensors.map((sensor) =>
      sensor.label === "Focus"
        ? { ...sensor, value: "86%", delta: "+2%" }
        : sensor
    )
  };

  return device;
}

export function toggleAudience(audience: string): ConsentProfile {
  const hasAudience = consent.approvedAudiences.includes(audience);

  consent = {
    ...consent,
    approvedAudiences: hasAudience
      ? consent.approvedAudiences.filter((entry) => entry !== audience)
      : [...consent.approvedAudiences, audience]
  };

  return consent;
}

export function setDigitalLegacy(enabled: boolean): ConsentProfile {
  consent = {
    ...consent,
    digitalLegacyEnabled: enabled
  };

  return consent;
}
