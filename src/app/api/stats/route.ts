import { NextResponse } from "next/server";
import { fetchLeetCodeCalendar, fetchLeetCodeStats, fetchCodeforcesSubmissions, parseSubmissionCalendar, groupSubmissionsByDate, countUniqueProblems } from "@/lib/api";
import { profileHandles } from "@/config/site";

type CodeforcesSubmission = {
  verdict?: string;
  creationTimeSeconds?: number;
  problem?: {
    contestId?: number;
    index?: string;
  };
};

export async function GET() {
  try {
    const leetcodeUsername = profileHandles.leetcode;
    const codeforcesUsername = profileHandles.codeforces;

    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setDate(oneYearAgo.getDate() - 365);
    const oneYearAgoTimestamp = Math.floor(oneYearAgo.getTime() / 1000);

    const currentYear = today.getFullYear();
    const previousYear = currentYear - 1;

    const [leetcodeCurrent, leetcodePrev, codeforcesData, leetcodeStats] = await Promise.allSettled([
      fetchLeetCodeCalendar(leetcodeUsername, currentYear),
      fetchLeetCodeCalendar(leetcodeUsername, previousYear),
      fetchCodeforcesSubmissions(codeforcesUsername, 1, 10000),
      fetchLeetCodeStats(leetcodeUsername),
    ]);

    const mergeCalendars = (...calendars: Array<Record<string, number> | null>) => {
      const merged: Record<string, number> = {};
      calendars.forEach((calendar) => {
        if (!calendar) return;
        Object.entries(calendar).forEach(([dateKey, count]) => {
          merged[dateKey] = count;
        });
      });
      return merged;
    };

    const lcCurrentData = leetcodeCurrent.status === "fulfilled" ? leetcodeCurrent.value : null;
    const lcPrevData = leetcodePrev.status === "fulfilled" ? leetcodePrev.value : null;

    const lcCurrent = lcCurrentData?.data?.matchedUser?.userCalendar?.submissionCalendar
      ? parseSubmissionCalendar(lcCurrentData.data.matchedUser.userCalendar.submissionCalendar)
      : {};
    const lcPrev = lcPrevData?.data?.matchedUser?.userCalendar?.submissionCalendar
      ? parseSubmissionCalendar(lcPrevData.data.matchedUser.userCalendar.submissionCalendar)
      : {};

    const mergedLc = mergeCalendars(lcCurrent, lcPrev);
    const leetcodeCalendar: Record<string, number> = {};
    Object.entries(mergedLc).forEach(([dateKey, count]) => {
      const date = new Date(dateKey);
      if (date >= oneYearAgo && date <= today) {
        leetcodeCalendar[dateKey] = count;
      }
    });

    const cfData = codeforcesData.status === "fulfilled" ? codeforcesData.value : null;
    const cfResults = Array.isArray(cfData?.result) ? (cfData.result as CodeforcesSubmission[]) : [];
    
    const cfFilteredSubmissions = cfResults.filter(
      (submission) =>
        typeof submission.creationTimeSeconds === "number" && submission.creationTimeSeconds >= oneYearAgoTimestamp
    );
    
    const codeforcesCalendar: Record<string, number> = groupSubmissionsByDate(cfFilteredSubmissions);
    const codeforcesUniqueProblems = countUniqueProblems(cfFilteredSubmissions);

    const lcStatsData = leetcodeStats.status === "fulfilled" ? leetcodeStats.value : null;
    const leetcodeTotalProblems = lcStatsData?.data?.matchedUser?.submitStats?.acSubmissionNum?.[0]?.count || 0;

    return NextResponse.json({
      leetcode: leetcodeCalendar,
      codeforces: codeforcesCalendar,
      uniqueProblems: {
        leetcode: leetcodeTotalProblems,
        codeforces: codeforcesUniqueProblems,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ 
      leetcode: {}, 
      codeforces: {},
      uniqueProblems: { leetcode: 0, codeforces: 0 }
    });
  }
}
