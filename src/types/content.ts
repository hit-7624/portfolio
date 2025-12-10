import type { ComponentType } from "react";

export type IconComponent = ComponentType<{
  className?: string;
  size?: number | string;
  [key: string]: unknown;
}>;

export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string[];
  tags: string[];
  link?: string;
  image: string;
  repoUrl?: string;
  liveUrl?: string;
  techStack?: IconComponent[];
  date?: string;
}

export interface Skill {
  name: string;
  icon: IconComponent;
  color?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: IconComponent;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  score: string;
  location: string;
}

export interface Responsibility {
  role: string;
  organization: string;
  duration: string;
  description: string;
}

export interface CodingProfile {
  key: string;
  name: string;
  problems: string;
  link: string;
  icon: IconComponent;
  color?: string;
  rating?: string;
  percentile?: string;
  rank?: string;
}

export interface UserInfo {
  name: string;
  tagline: string;
  roles: string[];
  location: string;
  about: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  currentlyLearning: string;
  resume?: string;
}

