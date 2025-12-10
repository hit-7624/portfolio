export async function fetchLeetCodeStats(username: string) {
  try {
    const query = `
      query userProblemsSolved($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              count
            }
          }
        }
      }
    `;

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Referer": "https://leetcode.com/",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 }
    });

    if (response.ok) {
      return await response.json();
    }

    const proxyResponse = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, {
      next: { revalidate: 3600 }
    });

    if (proxyResponse.ok) {
      const data = await proxyResponse.json();
      return {
        data: {
          matchedUser: {
            submitStats: {
              acSubmissionNum: [
                { count: data.totalSolved },
                { count: data.easySolved },
                { count: data.mediumSolved },
                { count: data.hardSolved },
              ]
            }
          }
        }
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    return null;
  }
}

export async function fetchLeetCodeCalendar(username: string, year?: number) {
  try {
    const query = `
      query userProfileCalendar($username: String!, $year: Int) {
        matchedUser(username: $username) {
          userCalendar(year: $year) {
            submissionCalendar
          }
        }
      }
    `;
    
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Referer": "https://leetcode.com/",
      },
      body: JSON.stringify({
        query,
        variables: { username, year: year ?? new Date().getFullYear() },
      }),
      next: { revalidate: 3600 }
    });

    if (response.ok) {
      return await response.json();
    }

    const proxyResponse = await fetch(`https://alfa-leetcode-api.onrender.com/userProfileCalendar?username=${username}&year=${year ?? new Date().getFullYear()}`, {
      next: { revalidate: 3600 }
    });

    if (proxyResponse.ok) {
       const data = await proxyResponse.json();
       if (data.errors) return null;
       
       return {
         data: {
           matchedUser: {
             userCalendar: data
           }
         }
       };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching LeetCode calendar:", error);
    return null;
  }
}

export async function fetchCodeforcesSubmissions(username: string, from: number, count: number = 1000) {
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.status?handle=${username}&from=${from}&count=${count}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Codeforces data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Codeforces submissions:", error);
    return null;
  }
}

export async function fetchGitHubContributions(username: string) {
  try {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch GitHub data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return null;
  }
}

export function parseSubmissionCalendar(calendarString: string): Record<string, number> {
  try {
    const calendar = JSON.parse(calendarString);
    const result: Record<string, number> = {};
    
    for (const [timestamp, count] of Object.entries(calendar)) {
      const date = new Date(Number(timestamp) * 1000);
      const dateKey = date.toISOString().split("T")[0];
      result[dateKey] = count as number;
    }
    
    return result;
  } catch (error) {
    console.error("Error parsing submission calendar:", error);
    return {};
  }
}

type CodeforcesSubmission = {
  verdict?: string;
  creationTimeSeconds?: number;
  problem?: {
    contestId?: number;
    index?: string;
  };
};

export function groupSubmissionsByDate(submissions: CodeforcesSubmission[]): Record<string, number> {
  const result: Record<string, number> = {};
  const seen: Set<string> = new Set();
  
  if (!Array.isArray(submissions)) return result;

  submissions.forEach((submission) => {
    if (submission.verdict !== "OK") return;
    if (typeof submission.creationTimeSeconds !== "number") return;

    const date = new Date(submission.creationTimeSeconds * 1000);
    const dateKey = date.toISOString().split("T")[0];
    const uniqueId = `${dateKey}-${submission.problem?.contestId}-${submission.problem?.index}`;

    if (seen.has(uniqueId)) return;
    result[dateKey] = (result[dateKey] || 0) + 1;
    seen.add(uniqueId);
  });
  
  return result;
}

export function countUniqueProblems(submissions: CodeforcesSubmission[]): number {
  const uniqueProblems = new Set<string>();
  
  if (!Array.isArray(submissions)) return 0;

  submissions.forEach((submission) => {
    if (submission.verdict !== "OK" || !submission.problem) return;
    const problemId = `${submission.problem.contestId || ""}-${submission.problem.index || ""}`;
    uniqueProblems.add(problemId);
  });
  
  return uniqueProblems.size;
}
