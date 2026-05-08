import { ScanMonitor } from "@/components/scan-monitor";
import { getDeviceStatus } from "@/lib/mock-db";

export const dynamic = "force-dynamic";

export default function ScanPage() {
  const device = getDeviceStatus();

  return <ScanMonitor initialDevice={device} />;
}
