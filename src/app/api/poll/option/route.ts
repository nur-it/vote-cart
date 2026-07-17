import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { addCustomOption } from "@/lib/poll-service";
import type { AddOptionPayload } from "@/lib/types";

export const dynamic = "force-dynamic";

const VOTE_COOKIE = "poll_voted_options";

export async function POST(request: Request) {
  let body: AddOptionPayload;
  try {
    body = (await request.json()) as AddOptionPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const sectionId =
    typeof body?.sectionId === "string" ? body.sectionId.trim() : "";
  const name = typeof body?.name === "string" ? body.name : "";
  const emoji =
    typeof body?.emoji === "string" && body.emoji.trim()
      ? body.emoji.trim().slice(0, 8)
      : "✨";

  if (!sectionId) {
    return NextResponse.json(
      { error: "A section is required." },
      { status: 400 }
    );
  }
  if (!name.trim()) {
    return NextResponse.json(
      { error: "Please type a category name first." },
      { status: 400 }
    );
  }
  if (name.trim().length > 60) {
    return NextResponse.json(
      { error: "Keep the name under 60 characters." },
      { status: 400 }
    );
  }

  // Read this client's existing vote cookie so the returned poll reflects
  // their "hasVoted / votedOptionIds" state.
  const cookieStore = await cookies();
  const raw = cookieStore.get(VOTE_COOKIE)?.value ?? "";
  let votedOptionIds: string[] = [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      votedOptionIds = parsed.filter(
        (x): x is string => typeof x === "string"
      );
    }
  } catch {
    votedOptionIds = [];
  }

  try {
    const result = await addCustomOption(
      sectionId,
      name,
      emoji,
      votedOptionIds
    );
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to add option";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
