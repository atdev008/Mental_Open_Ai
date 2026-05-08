import { DeviceConnect } from "@/components/device-connect";
import { getDeviceStatus } from "@/lib/mock-db";

export const dynamic = "force-dynamic";

export default function ConnectPage() {
  const device = getDeviceStatus();

  return <DeviceConnect initialDevice={device} />;
}
