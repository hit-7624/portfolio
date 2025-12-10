import {
  Binary,
  Box,
  Cloud,
  Database,
  Github,
  Globe,
  Layers,
  Layout,
  Linkedin,
  Lock,
  Mail,
  Network,
  Server,
} from "lucide-react";
import Image from "next/image";
import type {
  CodingProfile,
  Education,
  IconComponent,
  Project,
  Responsibility,
  Skill,
  SocialLink,
  UserInfo,
} from "@/types/content";
import { profileLinks, siteLinks } from "@/config/site";

const createLogo = (url: string): IconComponent => {
  const Logo = ({
    size = 24,
    className = "",
    ...props
  }: {
    size?: number | string;
    className?: string;
    [key: string]: unknown;
  }) => (
    <Image
      src={url}
      alt=""
      width={typeof size === "number" ? size : parseInt(String(size), 10) || 24}
      height={typeof size === "number" ? size : parseInt(String(size), 10) || 24}
      className={`object-contain ${className}`}
      unoptimized
      {...props}
    />
  );
  return Logo;
};

export const USER_INFO: UserInfo = {
  name: "Hit Jasoliya",
  tagline: "Competitive Programmer & Full Stack Developer",
  roles: ["Competitive Programmer", "Full Stack Developer"],
  location: "India",
  about: "Bridging the gap between complex algorithms and elegant user interfaces.",
  email: siteLinks.email,
  phone: "+91-9328855133",
  github: siteLinks.github,
  linkedin: siteLinks.linkedin,
  currentlyLearning: "Java, SpringBoot, System Design, and Machine Learning",
  resume: siteLinks.resume,
};

export const EDUCATION: Education[] = [
  {
    institution: "Sardar Vallabhbhai National Institute of Technology, Surat",
    degree: "B.Tech. in Computer Science and Engineering",
    duration: "Aug. 2023 – Present",
    score: "CGPA: 9.02/10.0",
    location: "Surat, Gujarat, India",
  },
  {
    institution: "Vidhyadhish Vidhyasankul",
    degree: "11-12 Science A Group",
    duration: "2021 – 2023",
    score: "JEE Main: 99.48 PR, JEE Advanced Rank: 7624",
    location: "Bhavnagar, Gujrat, India",
  },
];

export const SKILLS_CATEGORIES: { title: string; skills: Skill[] }[] = [
  {
    title: "Languages",
    skills: [
      { name: "C++", icon: createLogo("https://cdn.simpleicons.org/cplusplus"), color: "text-blue-500" },
      { name: "Python", icon: createLogo("https://cdn.simpleicons.org/python"), color: "text-yellow-400" },
      { name: "JavaScript", icon: createLogo("https://cdn.simpleicons.org/javascript"), color: "text-yellow-300" },
      { name: "TypeScript", icon: createLogo("https://cdn.simpleicons.org/typescript"), color: "text-blue-400" },
      { name: "SQL", icon: Database, color: "text-gray-400" },
      { name: "Java", icon: createLogo("https://www.vectorlogo.zone/logos/java/java-icon.svg"), color: "text-orange-500" },
    ],
  },
  {
    title: "Technologies",
    skills: [
      { name: "React.js", icon: createLogo("https://cdn.simpleicons.org/react"), color: "text-cyan-400" },
      { name: "Next.js", icon: createLogo("https://cdn.simpleicons.org/nextdotjs/white"), color: "text-white" },
      { name: "Node.js", icon: createLogo("https://cdn.simpleicons.org/nodedotjs"), color: "text-green-500" },
      { name: "Express.js", icon: createLogo("https://cdn.simpleicons.org/express/white"), color: "text-gray-400" },
      { name: "Socket.IO", icon: createLogo("https://cdn.simpleicons.org/socketdotio/white"), color: "text-white" },
      { name: "RESTful APIs", icon: Globe, color: "text-blue-300" },
      { name: "Prisma", icon: createLogo("https://cdn.simpleicons.org/prisma/white"), color: "text-white" },
      { name: "Mongoose", icon: createLogo("https://cdn.simpleicons.org/mongoose"), color: "text-red-500" },
      { name: "NextAuth.js", icon: Lock, color: "text-purple-400" },
      { name: "Zustand", icon: Box, color: "text-yellow-600" },
      { name: "Zod", icon: createLogo("https://cdn.simpleicons.org/zod"), color: "text-blue-600" },
      { name: "TurboRepo", icon: createLogo("https://cdn.simpleicons.org/turborepo"), color: "text-red-500" },
      { name: "Tailwind CSS", icon: createLogo("https://cdn.simpleicons.org/tailwindcss"), color: "text-cyan-300" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", icon: createLogo("https://cdn.simpleicons.org/postgresql"), color: "text-indigo-400" },
      { name: "MongoDB", icon: createLogo("https://cdn.simpleicons.org/mongodb"), color: "text-green-400" },
      { name: "MySQL", icon: createLogo("https://cdn.simpleicons.org/mysql"), color: "text-blue-500" },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Git", icon: createLogo("https://cdn.simpleicons.org/git"), color: "text-orange-500" },
      { name: "GitHub", icon: Github, color: "text-white" },
      { name: "Nginx", icon: createLogo("https://cdn.simpleicons.org/nginx"), color: "text-green-500" },
      { name: "Azure", icon: createLogo("https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg"), color: "text-blue-400" },
      { name: "Docker", icon: createLogo("https://cdn.simpleicons.org/docker"), color: "text-blue-500" },
      { name: "Kubernetes", icon: createLogo("https://cdn.simpleicons.org/kubernetes"), color: "text-blue-400" },
      { name: "Prometheus", icon: createLogo("https://cdn.simpleicons.org/prometheus"), color: "text-orange-400" },
      { name: "Grafana", icon: createLogo("https://cdn.simpleicons.org/grafana"), color: "text-orange-500" },
    ],
  },
  {
    title: "Core CS Concepts",
    skills: [
      { name: "DSA", icon: Binary, color: "text-green-400" },
      { name: "OOP", icon: Layers, color: "text-yellow-400" },
      { name: "DBMS", icon: Database, color: "text-blue-400" },
      { name: "Comp. Networks", icon: Network, color: "text-purple-400" },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Squad Draw",
    description: "Collaborative Whiteboarding Platform",
    detailedDescription: [
      "Built full-stack collaborative whiteboarding app with Next.js 15 and Socket.IO, supporting 50 simultaneous users with real-time drawing synchronization and <1s latency.",
      "Implemented comprehensive drawing toolkit with full-stack primitives, customizable stroke/fill options, and RoughJS for hand-drawn style graphics.",
      "Reduced redraw overhead by 90% via dual-canvas architecture.",
      "Created enterprise-grade authentication with Better Auth.",
      "Designed PostgreSQL database with Prisma ORM.",
      "Wrote CI/CD pipeline and deployed site on Azure using Nginx reverse proxy.",
    ],
    tags: ["Next.js 15", "Socket.IO", "Zustand", "TurboRepo", "RoughJS", "PostgreSQL"],
    image: "/image.png",
    repoUrl: "https://github.com/hit-7624/squad-draw",
    liveUrl: "",
    date: "July 2025 – July 2025",
    techStack: [Layout, Network, Database, Cloud],
  },
  {
    id: "2",
    title: "FlowPilot",
    description: "Company Finance Management Platform",
    detailedDescription: [
      "Developed a full-stack company finance management platform using Next.js, MongoDB, and NextAuth.js.",
      "Secure role-based authentication (Owner, Admin, Employee) and comprehensive financial management module.",
      "Constructed robust project and task management system.",
      "Implemented RESTful API using Next.js API routes with Mongoose schemas and Zod validation.",
      "Engineered a responsive and accessible UI with Tailwind CSS.",
    ],
    tags: ["Next.js", "NextAuth.js", "MongoDB", "Tailwind CSS", "Zod"],
    image: "/flowpilot.png",
    repoUrl: "https://github.com/YugDesai7654/Flowpilot",
    liveUrl: "https://flowpilot-gamma-five.vercel.app/",
    date: "May 2025 – June 2025",
    techStack: [Layout, Lock, Database, Server],
  },
];

export const CODING_PROFILES: CodingProfile[] = [
  {
    key: "leetcode",
    name: "LeetCode",
    problems: "700+",
    rating: "1764",
    percentile: "Top 10%",
    link: profileLinks.leetcode,
    icon: createLogo("https://cdn.simpleicons.org/leetcode"),
    color: "text-yellow-500",
  },
  {
    key: "codeforces",
    name: "Codeforces",
    problems: "300+",
    rating: "1496",
    rank: "Specialist",
    link: profileLinks.codeforces,
    icon: createLogo("https://cdn.simpleicons.org/codeforces"),
    color: "text-blue-500",
  },
  {
    key: "geeksforgeeks",
    name: "GeeksForGeeks",
    problems: "70+",
    link: profileLinks.geeksforgeeks,
    icon: createLogo("https://cdn.simpleicons.org/geeksforgeeks"),
    color: "text-green-500",
  },
];

export const CODING_ACHIEVEMENTS = [
  "Global Rank 215 in Codeforces Round 1017 (Div. 4) out of 25,000+ participants",
  "Consistently earned ranks such as 1688, 3797, 3999 in Codeforces contests",
];

export const RESPONSIBILITIES: Responsibility[] = [
  {
    role: "Co-Head, Web Development",
    organization: "MindBend (Annual Technical Festival, SVNIT)",
    duration: "Oct. 2024 – May 2025",
    description: "Led the web development team for the annual technical festival.",
  },
  {
    role: "Executive",
    organization: "Association for Computing Machinery (ACM) Student Chapter, SVNIT",
    duration: "Oct. 2024 – May 2025",
    description: "Contributed to organizing technical events and workshops.",
  },
];

export const SOCIALS: SocialLink[] = [
  { name: "GitHub", url: siteLinks.github, icon: Github },
  { name: "LinkedIn", url: siteLinks.linkedin, icon: Linkedin },
  { name: "Email", url: `mailto:${siteLinks.email}`, icon: Mail },
];

