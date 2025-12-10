type StringValue = string | undefined | null;

const valueOrFallback = (value: StringValue, fallback: string) => (value && value.trim().length > 0 ? value : fallback);

export const siteLinks = {
  github: valueOrFallback(process.env.NEXT_PUBLIC_GITHUB_URL, "https://github.com/hit-7624"),
  linkedin: valueOrFallback(process.env.NEXT_PUBLIC_LINKEDIN_URL, "https://www.linkedin.com/in/hit-jasoliya"),
  email: valueOrFallback(process.env.NEXT_PUBLIC_EMAIL, "hitjasoliya06@gmail.com"),
  resume: valueOrFallback(process.env.NEXT_PUBLIC_RESUME_URL, ""),
};

export const profileLinks = {
  leetcode: valueOrFallback(process.env.NEXT_PUBLIC_LEETCODE_URL, "https://leetcode.com/u/hit_jasoliya"),
  codeforces: valueOrFallback(process.env.NEXT_PUBLIC_CODEFORCES_URL, "https://codeforces.com/profile/hit_7624"),
  geeksforgeeks: valueOrFallback(process.env.NEXT_PUBLIC_GFG_URL, "https://geeksforgeeks.org/user/hit_7624"),
};

export const profileHandles = {
  github: valueOrFallback(process.env.GITHUB_USERNAME, "hit-7624"),
  leetcode: valueOrFallback(process.env.LEETCODE_USERNAME, "hit_jasoliya"),
  codeforces: valueOrFallback(process.env.CODEFORCES_USERNAME, "hit_7624"),
};

