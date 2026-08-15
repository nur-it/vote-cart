import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 30; // Max 30 seconds execution time

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  // Validate CRON_SECRET if configured in environment variables
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  try {
    // Perform a lightweight database query to keep Supabase active
    await db.$queryRaw`SELECT 1 as keepalive;`;

    const duration = Date.now() - startTime;

    return NextResponse.json({
      status: "success",
      message: "Database ping successful. Supabase keep-alive updated.",
      timestamp: new Date().toISOString(),
      latencyMs: duration,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error("Keep-alive cron error:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to ping database",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
        latencyMs: duration,
      },
      { status: 500 }
    );
  }
}
