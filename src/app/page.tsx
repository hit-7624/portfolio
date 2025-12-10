"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Book, Code2, ExternalLink, Github, Loader2, MapPin, Trophy } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Navbar } from "@/components/Navbar";
import {
  CODING_ACHIEVEMENTS,
  CODING_PROFILES,
  EDUCATION,
  PROJECTS,
  RESPONSIBILITIES,
  SKILLS_CATEGORIES,
  SOCIALS,
  USER_INFO,
} from "@/data/content";

interface DayStats {
  date: Date;
  leetcode: number;
  codeforces: number;
  total: number;
  level: number;
}

interface GhContribution {
  date: Date;
  count: number;
  level: number;
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredDay, setHoveredDay] = useState<{ day: DayStats; x: number; y: number } | null>(null);
  const [hoveredGhDay, setHoveredGhDay] = useState<{ contribution: GhContribution; x: number; y: number } | null>(null);
  const [leetcodeData, setLeetcodeData] = useState<Record<string, number>>({});
  const [codeforcesData, setCodeforcesData] = useState<Record<string, number>>({});
  const [githubData, setGithubData] = useState<Record<string, number>>({});
  const [uniqueProblems, setUniqueProblems] = useState<{ leetcode: number; codeforces: number }>({ leetcode: 0, codeforces: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-20% 0px -20% 0px" }
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsResponse, githubResponse] = await Promise.all([
          fetch("/api/stats"),
          fetch("/api/github"),
        ]);

        if (statsResponse.ok) {
          const stats = await statsResponse.json();
          setLeetcodeData(stats.leetcode || {});
          setCodeforcesData(stats.codeforces || {});
          setUniqueProblems(stats.uniqueProblems || { leetcode: 0, codeforces: 0 });
        }

        if (githubResponse.ok) {
          const github = await githubResponse.json();
          setGithubData(github.contributions || {});
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const heatmapData = useMemo(() => {
    const days: (DayStats | null)[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);
    
    const startDayOfWeek = startDate.getDay();
    
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 0; i <= 364; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split("T")[0];

      const leetcode = leetcodeData[dateKey] || 0;
      const codeforces = codeforcesData[dateKey] || 0;
      const total = leetcode + codeforces;
      
      let level = 0;
      if (total > 0) level = 1;
      if (total > 2) level = 2;
      if (total > 5) level = 3;
      if (total > 8) level = 4;

      days.push({
        date,
        leetcode,
        codeforces,
        total,
        level,
      });
    }
    
    const weeks: (DayStats | null)[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    
    return { days, weeks };
  }, [leetcodeData, codeforcesData]);

  const ghContributions = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);
    
    const startDayOfWeek = startDate.getDay();
    const days: (GhContribution | null)[] = [];
    
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 0; i <= 364; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split("T")[0];
      
      const count = githubData[dateKey] || 0;
      let level = 0;
      if (count > 0) level = 1;
      if (count > 2) level = 2;
      if (count > 5) level = 3;
      if (count > 10) level = 4;
      
      days.push({
        date,
        count,
        level,
      });
    }
    
    const weeks: (GhContribution | null)[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    
    return { days, weeks };
  }, [githubData]);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans antialiased selection:bg-white/20">
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-10 pb-32">
        <section id="home" className="pt-40 md:pt-48 mb-32">
          <div className="flex flex-col items-start max-w-3xl">
            <div className="relative mb-10 group cursor-pointer">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 border border-white/10 overflow-hidden relative z-10 flex items-center justify-center grayscale">
                <span className="text-6xl md:text-8xl opacity-80 group-hover:opacity-100 transition-opacity">☮︎</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black z-20" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-none text-white mix-blend-difference">
              HIT JASOLIYA
            </h1>
            <h2 className="text-xl md:text-2xl text-white/60 font-mono tracking-tight mb-8">
              Competitive Programmer & <br />
              Full Stack Web Developer
            </h2>

            <div className="mb-10 p-4 border border-white/10 bg-white/5 w-full max-w-lg">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2 font-mono flex items-center gap-2">
                <Book size={12} /> Currently Learning
              </div>
              <p className="text-sm text-white/80 font-mono">{USER_INFO.currentlyLearning}</p>
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 border border-white/10 bg-black hover:bg-white transition-colors group"
                >
                  <s.icon size={20} className="text-white group-hover:text-black transition-colors" />
                </a>
              ))}
              {USER_INFO.resume ? (
                <a
                  href={USER_INFO.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 border border-white/10 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-black hover:text-white transition-colors inline-flex items-center justify-center"
                >
                  Download Resume
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <section id="education" className="mb-32">
          <h2 className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest mb-8 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-white/20" />
            Education
          </h2>

          <div className="grid gap-4">
            {EDUCATION.map((edu) => (
              <GlassCard key={edu.institution} className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{edu.institution}</h3>
                    <p className="text-lg text-white/60">{edu.degree}</p>
                  </div>
                  <div className="text-right md:text-right">
                    <div className="text-white font-mono">{edu.duration}</div>
                    <div className="text-blue-400 font-mono text-sm mt-1">{edu.score}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/40 font-mono">
                  <MapPin size={14} /> {edu.location}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="work" className="mb-32">
          <h2 className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest mb-8 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-white/20" />
            Technical Skills
          </h2>

          <div className="flex flex-col gap-12">
            {SKILLS_CATEGORIES.map((category) => (
              <div key={category.title}>
                <h3 className="text-lg font-bold text-white mb-6 pl-3 border-l-2 border-green-500/30">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {category.skills.map((skill) => (
                    <GlassCard
                      key={skill.name}
                      className="p-4 flex items-center gap-3 hover:bg-white/10 group"
                    >
                      <div
                        className={`p-1.5 bg-white/5 ${skill.color ?? ""} grayscale group-hover:grayscale-0 transition-all duration-300`}
                      >
                        <skill.icon size={18} />
                      </div>
                      <span className="text-sm font-bold text-white/60 group-hover:text-white font-mono">
                        {skill.name}
                      </span>
                    </GlassCard>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="mb-32">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-white/20" />
                Featured Work
              </h2>
              <h3 className="text-3xl font-bold text-white">Projects</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <GlassCard key={project.id} className="group flex flex-col h-full hover:border-blue-400/30 transition-all">
                <div className={`aspect-[16/9] w-full relative overflow-hidden border-b border-white/10 ${project.id === "1" ? "bg-black flex items-center justify-center" : "bg-gray-900 grayscale group-hover:grayscale-0 transition-all duration-500"}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
                    className={`${project.id === "1" ? "object-contain w-3/4 h-3/4 opacity-100" : "w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"}`}
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow bg-black">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-4">
                      {project.repoUrl && (
                        <a href={project.repoUrl} className="text-white/40 hover:text-white" target="_blank" rel="noreferrer">
                          <Github size={18} />
                        </a>
                      )}
                      {project.id === "1" ? (
                        <span className="text-white/20 cursor-not-allowed" title="Temporarily unavailable">
                          <ExternalLink size={18} />
                        </span>
                      ) : project.liveUrl ? (
                        <a href={project.liveUrl} className="text-white/40 hover:text-white" target="_blank" rel="noreferrer">
                          <ExternalLink size={18} />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <p className="text-xs font-mono text-white/40 mb-4">{project.date}</p>

                  <div className="space-y-2 mb-6 flex-grow">
                    {project.detailedDescription?.slice(0, 3).map((desc) => (
                      <div key={desc} className="flex gap-2 text-sm text-white/60 leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 bg-white/40 flex-shrink-0" />
                        <span>{desc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono border border-white/10 px-2 py-1 text-white/50 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="profiles" className="mb-32">
          <h2 className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest mb-8 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-white/20" />
            Coding Profiles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CODING_PROFILES.map((stat) => {
              const Icon = stat.icon;
              return (
                <a key={stat.key} href={stat.link} target="_blank" rel="noreferrer" className="block h-full">
                  <GlassCard className="p-6 h-full flex flex-col justify-between hover:bg-white/5 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-2 bg-white/5 rounded-md ${stat.color ?? ""} group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-300`}
                      >
                        <Icon size={24} />
                      </div>
                      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-white/50" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{stat.name}</h3>
                      <div className="space-y-1">
                        {stat.rating && (
                          <p className="text-sm text-white/60 font-mono">
                            Rating: <span className="text-white">{stat.rating}</span>
                          </p>
                        )}
                        <p className="text-sm text-white/60 font-mono">
                          Problems: <span className="text-white">{stat.problems}</span>
                        </p>
                        {stat.rank && (
                          <p className="text-sm text-white/60 font-mono">
                            Rank: <span className="text-white">{stat.rank}</span>
                          </p>
                        )}
                        {stat.percentile && (
                          <p className="text-sm text-white/60 font-mono">
                            Percentile: <span className="text-white">{stat.percentile}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </a>
              );
            })}
          </div>
        </section>

        <section id="stats" className="mb-32 flex flex-col gap-6">
          <div className="w-full">
            <GlassCard className="relative p-6 w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                  <Code2 size={18} className="text-green-500" /> Problem Solving Activity
                </h3>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-white/40">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white/5 rounded-[1px]" />
                    <div className="w-2 h-2 bg-green-900 rounded-[1px]" />
                    <div className="w-2 h-2 bg-green-700 rounded-[1px]" />
                    <div className="w-2 h-2 bg-green-500 rounded-[1px]" />
                    <div className="w-2 h-2 bg-green-300 rounded-[1px]" />
                  </div>
                  <span>More</span>
                </div>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
                    <p className="text-sm text-white/40 font-mono">Loading activity data...</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-full overflow-x-auto pb-2">
                    <div className="min-w-[700px]">
                      <div className="flex gap-1">
                        {heatmapData.weeks.map((week, weekIdx) => (
                          <div key={weekIdx} className="flex flex-col gap-1">
                            {week.map((day, dayIdx) => {
                              if (!day) {
                                return <div key={`empty-${weekIdx}-${dayIdx}`} className="w-3 h-3" />;
                              }
                              return (
                                <div
                                  key={`${day.date.toISOString()}-${weekIdx}-${dayIdx}`}
                                  onMouseEnter={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setHoveredDay({ day, x: e.clientX, y: rect.top });
                                  }}
                                  onMouseLeave={() => setHoveredDay(null)}
                                  className={`
                                    w-3 h-3 rounded-[1px] transition-colors duration-200 cursor-pointer
                                    ${
                                      day.level === 0
                                        ? "bg-white/5 hover:bg-white/10"
                                        : day.level === 1
                                          ? "bg-green-900 hover:bg-green-800"
                                          : day.level === 2
                                            ? "bg-green-700 hover:bg-green-600"
                                            : day.level === 3
                                              ? "bg-green-500 hover:bg-green-400"
                                              : "bg-green-300 hover:bg-green-200"
                                    }
                                  `}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    {hoveredDay ? (
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm text-white/60 font-mono">
                            {hoveredDay.day.date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                          </div>
                          <div className="text-2xl font-bold text-white font-mono">
                            {hoveredDay.day.total} submission{hoveredDay.day.total !== 1 ? "s" : ""}
                          </div>
                        </div>
                        <div className="flex gap-6 text-xs font-mono text-white/40">
                          <div>
                            LeetCode: <span className="text-green-400 font-bold">{hoveredDay.day.leetcode}</span>
                          </div>
                          <div>
                            Codeforces: <span className="text-blue-400 font-bold">{hoveredDay.day.codeforces}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-white/60 font-mono">
                              Total problems solved in the past year
                            </div>
                            <div className="text-xs text-white/40 font-mono mt-1">
                              Hover over a day to see submissions for that specific day
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-white font-mono">
                            {uniqueProblems.leetcode + uniqueProblems.codeforces} problem{(uniqueProblems.leetcode + uniqueProblems.codeforces) !== 1 ? "s" : ""}
                          </div>
                        </div>
                        <div className="mt-3 flex gap-6 text-xs font-mono text-white/40">
                          <div>
                            LeetCode: <span className="text-green-400 font-bold">{uniqueProblems.leetcode}</span>
                          </div>
                          <div>
                            Codeforces: <span className="text-blue-400 font-bold">{uniqueProblems.codeforces}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </GlassCard>
          </div>

          <div className="w-full">
            <GlassCard className="relative p-6 w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                  <Github size={18} /> GitHub Activity
                </h3>
                <a href={USER_INFO.github} className="text-xs hover:underline text-white/40" target="_blank" rel="noreferrer">
                  View Profile
                </a>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
                    <p className="text-sm text-white/40 font-mono">Loading contribution data...</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-full overflow-x-auto pb-2">
                    <div className="min-w-[700px]">
                      <div className="flex gap-1">
                        {ghContributions.weeks.map((week, weekIdx) => (
                          <div key={weekIdx} className="flex flex-col gap-1">
                            {week.map((contribution, dayIdx) => {
                              if (!contribution) {
                                return <div key={`empty-${weekIdx}-${dayIdx}`} className="w-3 h-3" />;
                              }
                              return (
                                <div
                                  key={`${contribution.date.toISOString()}-${weekIdx}-${dayIdx}`}
                                  onMouseEnter={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setHoveredGhDay({ contribution, x: e.clientX, y: rect.top });
                                  }}
                                  onMouseLeave={() => setHoveredGhDay(null)}
                                  className={`
                                    w-3 h-3 rounded-[1px] transition-colors duration-200 cursor-pointer
                                    ${
                                      contribution.level === 0
                                        ? "bg-white/5 hover:bg-white/10"
                                        : contribution.level === 1
                                          ? "bg-green-900 hover:bg-green-800"
                                          : contribution.level === 2
                                            ? "bg-green-700 hover:bg-green-600"
                                            : contribution.level === 3
                                              ? "bg-green-500 hover:bg-green-400"
                                              : "bg-green-300 hover:bg-green-200"
                                    }
                                  `}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    {hoveredGhDay ? (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-white/60 font-mono">
                            {hoveredGhDay.contribution.date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                          </div>
                          <div className="text-2xl font-bold text-white font-mono">
                            {hoveredGhDay.contribution.count} contribution{hoveredGhDay.contribution.count !== 1 ? "s" : ""}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-white/60 font-mono">
                              Total contributions in the past year
                            </div>
                            <div className="text-xs text-white/40 font-mono mt-1">
                              Hover over a day to see stats for that specific day
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-white font-mono">
                            {ghContributions.days
                              .filter((day): day is GhContribution => day !== null)
                              .reduce((sum, day) => sum + day.count, 0)}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </GlassCard>
          </div>
        </section>

        <section id="achievements" className="mb-32 flex flex-col gap-12">
          <div>
            <h2 className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-white/20" />
              Responsibilities
            </h2>
            <div className="space-y-4">
              {RESPONSIBILITIES.map((resp) => (
                <GlassCard key={resp.role} className="p-6 hover:bg-white/5">
                  <h3 className="text-lg font-bold text-white mb-1">{resp.role}</h3>
                  <p className="text-sm text-blue-400 font-mono mb-2">{resp.organization}</p>
                  <p className="text-xs text-white/40 font-mono mb-3">{resp.duration}</p>
                  <p className="text-sm text-white/70">{resp.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-white/20" />
              Contest Achievements
            </h2>
            <GlassCard className="p-0">
              {CODING_ACHIEVEMENTS.map((ach) => (
                <div
                  key={ach}
                  className="p-6 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors flex items-start gap-4"
                >
                  <Trophy size={20} className="text-yellow-500 shrink-0 mt-1" />
                  <p className="text-sm text-white/80 leading-relaxed">{ach}</p>
                </div>
              ))}
            </GlassCard>
          </div>
        </section>

        <div className="mb-24 flex flex-col items-center justify-center text-center space-y-6 opacity-60 hover:opacity-100 transition-opacity duration-700">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <p className="font-serif text-xl md:text-2xl text-white/80 leading-loose">
            कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।<br />
            मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥
          </p>
          <p className="max-w-xl text-sm md:text-base text-white/60 font-serif italic leading-relaxed px-4">
            You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.
            Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.
          </p>
          <p className="text-xs font-mono text-white/30 uppercase tracking-[0.2em]">Bhagavad Gita 2.47</p>
        </div>

        <footer className="border-t border-white/10 pt-12 pb-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-white/30 uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Hit Jasoliya. All rights reserved.</p>
          <div className="flex gap-8">
            <a href={USER_INFO.linkedin} className="hover:text-white transition-colors" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={USER_INFO.github} className="hover:text-white transition-colors" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={`mailto:${USER_INFO.email}`} className="hover:text-white transition-colors">
              Email
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
