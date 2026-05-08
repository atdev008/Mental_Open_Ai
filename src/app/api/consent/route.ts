import { NextRequest, NextResponse } from "next/server";
import { getConsentProfile, setDigitalLegacy, toggleAudience } from "@/lib/mock-db";

type ToggleAudiencePayload = {
  audience?: string;
};

type LegacyPayload = {
  digitalLegacyEnabled?: boolean;
};

export function GET() {
  return NextResponse.json(getConsentProfile(), {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as ToggleAudiencePayload;

  if (!body.audience) {
    return NextResponse.json({ message: "audience is required" }, { status: 400 });
  }

  return NextResponse.json(toggleAudience(body.audience), {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as LegacyPayload;

  if (typeof body.digitalLegacyEnabled !== "boolean") {
    return NextResponse.json(
      { message: "digitalLegacyEnabled must be a boolean" },
      { status: 400 }
    );
  }

  return NextResponse.json(setDigitalLegacy(body.digitalLegacyEnabled), {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

