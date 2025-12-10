import { NextResponse } from "next/server";
import { fetchGitHubContributions } from "@/lib/api";
import { profileHandles } from "@/config/site";

export async function GET() {
  try {
    const githubUsername = profileHandles.github;
    const data = await fetchGitHubContributions(githubUsername);

    if (!data || !data.contributions) {
      return NextResponse.json({ contributions: {} });
    }

    const contributions: Record<string, number> = {};
    data.contributions.forEach((day: { date?: string; count?: number }) => {
      if (typeof day.date === "string" && typeof day.count === "number") {
        contributions[day.date] = day.count;
      }
    });

    return NextResponse.json({ contributions });
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return NextResponse.json({ contributions: {} });
  }
}
