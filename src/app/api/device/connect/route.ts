import { NextResponse } from "next/server";
import { connectDevice } from "@/lib/mock-db";

export function POST() {
  return NextResponse.json(connectDevice(), {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
