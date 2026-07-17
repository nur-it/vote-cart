import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  // Vote reset is disabled — one vote per user, permanently stored.
  return NextResponse.json({ error: "Vote reset is not allowed." }, { status: 403 });
}
