"use client";

import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard = ({
  children,
  className = "",
  hoverEffect = false,
  onClick,
}: GlassCardProps) => {
  const base =
    "relative overflow-hidden bg-[#111111]/80 backdrop-blur-md border border-white/10 transition-all duration-200 ease-out";
  const hover = hoverEffect ? "hover:bg-[#1a1a1a] hover:border-white/20 cursor-pointer" : "";

  return (
    <div onClick={onClick} className={`${base} ${hover} ${className}`}>
      {children}
    </div>
  );
};

