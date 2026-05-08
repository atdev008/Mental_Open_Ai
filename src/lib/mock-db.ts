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
    { label: "EEG", value: "สมดุล", delta: "+2%", status: "stable" },
    { label: "Stress", value: "36/100", delta: "-8", status: "stable" },
    { label: "HRV", value: "71 ms", delta: "+4", status: "stable" },
    { label: "Sleep", value: "7.4 ชม.", delta: "+0.8", status: "stable" },
    { label: "Focus", value: "84%", delta: "+5%", status: "stable" }
  ]
};

const baseMemories: MemoryEvent[] = [
  {
    id: "birthday-2033",
    title: "วันเกิดอายุ 5 ขวบ",
    happenedAt: "2033-12-12T12:30:00.000Z",
    ageAtEvent: 5,
    location: "กรุงเทพฯ",
    emotion: "อบอุ่น",
    sensitivity: "low",
    summary: "มื้อเย็นวันเกิดกับครอบครัว พร้อมเสียงหัวเราะและความตื่นเต้นก่อนเป่าเค้ก",
    tags: ["ครอบครัว", "ฉลอง", "เด็ก"],
    mediaType: "photo",
    replayReadiness: 96
  },
  {
    id: "graduation-2026",
    title: "ช่วงเวลาสำคัญรับปริญญา",
    happenedAt: "2026-06-21T02:15:00.000Z",
    ageAtEvent: 22,
    location: "มหาวิทยาลัย",
    emotion: "ภูมิใจ",
    sensitivity: "medium",
    summary: "ภาพเวทีรับปริญญา เสียงเชียร์จากคนในบ้าน และความโล่งใจหลังซ้อมมาหลายเดือน",
    tags: ["ความสำเร็จ", "การศึกษา", "ครอบครัว"],
    mediaType: "scene",
    replayReadiness: 88
  },
  {
    id: "first-meeting-2024",
    title: "วันแรกที่พบกัน",
    happenedAt: "2024-02-14T11:30:00.000Z",
    ageAtEvent: 20,
    location: "ร้านกาแฟย่านเมืองเก่า",
    emotion: "ตื่นเต้น",
    sensitivity: "medium",
    summary: "บทสนทนาแรก ความเขินเล็กน้อย และเพลงในร้านที่เชื่อมกับความทรงจำนี้โดยตรง",
    tags: ["ความรัก", "ชีวิตส่วนตัว"],
    mediaType: "feeling",
    replayReadiness: 92
  },
  {
    id: "farewell-message-2049",
    title: "ข้อความถึงคนที่รัก",
    happenedAt: "2049-11-03T16:45:00.000Z",
    ageAtEvent: 45,
    location: "บ้าน",
    emotion: "อ่อนโยน",
    sensitivity: "high",
    summary: "บันทึกเสียงและเจตนาความทรงจำเพื่อส่งต่อให้ครอบครัวในโหมด Digital Legacy",
    tags: ["legacy", "ครอบครัว", "เสียง"],
    mediaType: "voice",
    replayReadiness: 74
  }
];

const baseConsent: ConsentProfile = {
  endToEndEncryption: true,
  multiFactorAuth: true,
  decentralizedStorage: true,
  digitalLegacyEnabled: true,
  approvedAudiences: ["เฉพาะเจ้าของ", "ครอบครัว", "แพทย์ที่ได้รับอนุญาต"],
  retentionPolicy: "เก็บแบบเข้ารหัสไม่มีกำหนดจนกว่าจะถอนความยินยอม",
  emergencyAccess: "ต้องมีการยืนยันสองฝ่ายก่อนเปิดใช้"
};

const baseInsights: InsightCard[] = [
  {
    id: "restore-routine",
    title: "แนะนำการพักสมองระยะสั้น",
    detail: "ความเครียดช่วงบ่ายสูงขึ้นเล็กน้อย ระบบแนะนำให้บันทึกเสียงสะท้อนความรู้สึก 90 วินาที",
    priority: "care"
  },
  {
    id: "memory-cluster",
    title: "พบคลัสเตอร์ความทรงจำครอบครัว",
    detail: "AI จัดกลุ่มเหตุการณ์ที่มีความรู้สึกอบอุ่นและภาพรวมพร้อมทำเป็นไทม์ไลน์ย้อนดู",
    priority: "memory"
  },
  {
    id: "legal-ready",
    title: "สิทธิ์การเข้าถึงสำหรับเหตุฉุกเฉินพร้อมใช้งาน",
    detail: "ระบบนโยบายยังอยู่ในสถานะปลอดภัยและเป็นไปตาม consent ล่าสุดของเจ้าของข้อมูล",
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
