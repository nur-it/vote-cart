import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { computeResults, getVoteByIp, hashIp } from "@/lib/poll-service";

export const dynamic = "force-dynamic";

const VOTE_COOKIE = "poll_voted_options";

function getIp(headersList: Awaited<ReturnType<typeof headers>>): string {
  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown"
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = (searchParams.get("lang") ?? "en") as "en" | "ru";
  const headersList = await headers();
  const ip = getIp(headersList);
  const ipHash = hashIp(ip);

  const cookieStore = await cookies();

  // DB is source of truth for IP-based dedup
  const existingVote = await getVoteByIp(ipHash);
  if (existingVote) {
    const result = await computeResults(existingVote.optionIds, lang);
    return NextResponse.json({ ...result, votedAt: new Date(existingVote.createdAt).getTime() });
  }

  // Fallback to cookie (same device, IP changed)
  const raw = cookieStore.get(VOTE_COOKIE)?.value ?? "";
  let votedOptionIds: string[] = [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      votedOptionIds = parsed.filter((x): x is string => typeof x === "string");
    }
  } catch {
    votedOptionIds = [];
  }

  const result = await computeResults(votedOptionIds, lang);
  return NextResponse.json(result);
}
