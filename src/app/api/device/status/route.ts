import { NextResponse } from "next/server";
import { getDeviceStatus } from "@/lib/mock-db";

export function GET() {
  return NextResponse.json(getDeviceStatus(), {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

