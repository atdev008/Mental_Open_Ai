import { NextResponse } from "next/server";
import { listMemories } from "@/lib/mock-db";

export function GET() {
  return NextResponse.json(listMemories(), {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

