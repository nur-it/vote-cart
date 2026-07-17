import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { computeResults, getVoteByIp, hashIp, undoVote } from "@/lib/poll-service";

export const dynamic = "force-dynamic";

const VOTE_COOKIE = "poll_voted_options";
const UNDO_WINDOW_MS = 2 * 60 * 1000;

function getIp(headersList: Awaited<ReturnType<typeof headers>>): string {
  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST() {
  const headersList = await headers();
  const ipHash = hashIp(getIp(headersList));

  const existingVote = await getVoteByIp(ipHash);
  if (!existingVote) {
    return NextResponse.json({ error: "No vote found." }, { status: 404 });
  }

  const age = Date.now() - new Date(existingVote.createdAt).getTime();
  if (age > UNDO_WINDOW_MS) {
    return NextResponse.json({ error: "Undo window has expired." }, { status: 403 });
  }

  await undoVote(existingVote.optionIds, ipHash);

  const cookieStore = await cookies();
  cookieStore.delete(VOTE_COOKIE);

  const result = await computeResults([]);
  return NextResponse.json(result);
}
