import { MedicalDownload } from "@/components/medical-download";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function MedicalPage() {
  return (
    <Suspense>
      <MedicalDownload />
    </Suspense>
  );
}
