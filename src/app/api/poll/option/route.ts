import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { addCustomOption, editCustomOption, deleteCustomOption, type Lang } from "@/lib/poll-service";
import { GUEST_COOKIE_NAME } from "@/lib/guest";
import type { AddOptionPayload, EditOptionPayload } from "@/lib/types";

export const dynamic = "force-dynamic";

const VOTE_COOKIE = "poll_voted_options";

async function getClientVotedOptionIds(): Promise<string[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(VOTE_COOKIE)?.value ?? "";
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((x): x is string => typeof x === "string");
    }
  } catch {
    // ignore
  }
  return [];
}

async function getGuestId(request: Request): Promise<string> {
  const headerGuestId = request.headers.get("x-guest-id")?.trim();
  if (headerGuestId) return headerGuestId;

  const cookieStore = await cookies();
  return cookieStore.get(GUEST_COOKIE_NAME)?.value?.trim() ?? "";
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const lang = (url.searchParams.get("lang") === "ru" ? "ru" : "en") as Lang;

  let body: AddOptionPayload;
  try {
    body = (await request.json()) as AddOptionPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const sectionId = typeof body?.sectionId === "string" ? body.sectionId.trim() : "";
  const name = typeof body?.name === "string" ? body.name : "";
  const description = typeof body?.description === "string" ? body.description.trim() : undefined;
  const emoji = typeof body?.emoji === "string" && body.emoji.trim() ? body.emoji.trim().slice(0, 8) : "✨";
  const imageUrl = typeof body?.imageUrl === "string" && body.imageUrl.trim() ? body.imageUrl.trim() : undefined;

  if (!sectionId) {
    return NextResponse.json({ error: "A section is required." }, { status: 400 });
  }
  if (!name.trim()) {
    return NextResponse.json({ error: "Please provide a product title." }, { status: 400 });
  }
  if (name.trim().length > 80) {
    return NextResponse.json({ error: "Keep the title under 80 characters." }, { status: 400 });
  }

  const votedOptionIds = await getClientVotedOptionIds();
  const guestId = await getGuestId(request);

  try {
    const result = await addCustomOption(
      sectionId,
      name,
      description,
      emoji,
      imageUrl,
      guestId,
      votedOptionIds,
      lang
    );
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to add product";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const lang = (url.searchParams.get("lang") === "ru" ? "ru" : "en") as Lang;

  let body: EditOptionPayload;
  try {
    body = (await request.json()) as EditOptionPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const optionId = typeof body?.optionId === "string" ? body.optionId.trim() : "";
  const name = typeof body?.name === "string" ? body.name : "";
  const description = typeof body?.description === "string" ? body.description.trim() : undefined;
  const emoji = typeof body?.emoji === "string" && body.emoji.trim() ? body.emoji.trim().slice(0, 8) : undefined;
  const imageUrl = typeof body?.imageUrl === "string" ? body.imageUrl : undefined;

  if (!optionId) {
    return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
  }
  if (!name.trim()) {
    return NextResponse.json({ error: "Please provide a product title." }, { status: 400 });
  }

  const votedOptionIds = await getClientVotedOptionIds();
  const guestId = await getGuestId(request);

  try {
    const result = await editCustomOption(
      optionId,
      name,
      description,
      emoji,
      imageUrl,
      guestId,
      votedOptionIds,
      lang
    );
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update product";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const lang = (url.searchParams.get("lang") === "ru" ? "ru" : "en") as Lang;

  let body: { optionId: string };
  try {
    body = (await request.json()) as { optionId: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const optionId = typeof body?.optionId === "string" ? body.optionId.trim() : "";
  if (!optionId) {
    return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
  }

  const votedOptionIds = await getClientVotedOptionIds();
  const guestId = await getGuestId(request);

  try {
    const poll = await deleteCustomOption(optionId, guestId, votedOptionIds, lang);
    return NextResponse.json({ success: true, poll });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete product";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
