import { NextResponse } from "next/server";
import { triggerSync } from "@/lib/mock-db";

export function POST() {
  return NextResponse.json(triggerSync(), {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

