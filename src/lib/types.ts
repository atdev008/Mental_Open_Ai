export type SensorMetric = {
  label: string;
  value: string;
  delta: string;
  status: "stable" | "watch" | "elevated";
};

export type DeviceStatus = {
  id: string;
  model: string;
  firmwareVersion: string;
  connection: "connected" | "standby" | "offline";
  syncState: "idle" | "syncing" | "complete";
  batteryLevel: number;
  signalQuality: number;
  comfortScore: number;
  lastSyncAt: string;
  sensors: SensorMetric[];
};

export type MemoryEvent = {
  id: string;
  title: string;
  happenedAt: string;
  ageAtEvent: number;
  location: string;
  emotion: string;
  sensitivity: "low" | "medium" | "high";
  summary: string;
  tags: string[];
  mediaType: "photo" | "voice" | "scene" | "feeling";
  replayReadiness: number;
};

export type ConsentProfile = {
  endToEndEncryption: boolean;
  multiFactorAuth: boolean;
  decentralizedStorage: boolean;
  digitalLegacyEnabled: boolean;
  approvedAudiences: string[];
  retentionPolicy: string;
  emergencyAccess: string;
};

export type InsightCard = {
  id: string;
  title: string;
  detail: string;
  priority: "assist" | "memory" | "care";
};

export type DashboardSnapshot = {
  device: DeviceStatus;
  memories: MemoryEvent[];
  consent: ConsentProfile;
  insights: InsightCard[];
};

