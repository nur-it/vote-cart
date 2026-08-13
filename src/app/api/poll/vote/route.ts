import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { castVote, computeResults, getVoteByIp, hashIp } from "@/lib/poll-service";
import type { VotePayload } from "@/lib/types";

export const dynamic = "force-dynamic";

const VOTE_COOKIE = "poll_voted_options";
const ONE_YEAR = 60 * 60 * 24 * 365;

function getIp(headersList: Awaited<ReturnType<typeof headers>>): string {
  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  const headersList = await headers();
  const ip = getIp(headersList);
  const ipHash = hashIp(ip);
  const { searchParams } = new URL(request.url);
  const lang = (searchParams.get("lang") ?? "en") as "en" | "ru";

  const cookieStore = await cookies();

  // Check DB first — IP already voted?
  const existingVote = await getVoteByIp(ipHash);
  if (existingVote) {
    if (!cookieStore.get(VOTE_COOKIE)?.value) {
      cookieStore.set(VOTE_COOKIE, JSON.stringify(existingVote.optionIds), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: ONE_YEAR,
        path: "/",
      });
    }
    const result = await computeResults(existingVote.optionIds, lang);
    return NextResponse.json({
      ...result,
      alreadyVoted: true,
      votedAt: new Date(existingVote.createdAt).getTime(),
    }, { status: 200 });
  }

  let body: VotePayload;
  try {
    body = (await request.json()) as VotePayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const optionIds = Array.isArray(body?.optionIds)
    ? body.optionIds.filter((x): x is string => typeof x === "string" && x.length > 0)
    : [];

  if (optionIds.length === 0) {
    return NextResponse.json({ error: "Select at least one category to vote." }, { status: 400 });
  }
  if (optionIds.length > 100) {
    return NextResponse.json({ error: "Too many options selected." }, { status: 400 });
  }

  const res = await castVote(optionIds, ipHash);
  if (!res.ok) {
    if (res.reason === "already_voted") {
      const result = await computeResults(optionIds, lang);
      return NextResponse.json({ ...result, alreadyVoted: true }, { status: 200 });
    }
    return NextResponse.json({ error: res.reason }, { status: 400 });
  }

  cookieStore.set(VOTE_COOKIE, JSON.stringify(optionIds), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: ONE_YEAR,
    path: "/",
  });

  const result = await computeResults(optionIds, lang);
  return NextResponse.json({ ...result, alreadyVoted: false, votedAt: Date.now() });
}
