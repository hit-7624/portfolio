"use client";

import Image from "next/image";
import { useState } from "react";

const placeholderAvatar =
  "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Christopher";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
}

export const Avatar = ({ src, alt, size = 128, className = "" }: AvatarProps) => {
  const [useFallback, setUseFallback] = useState(false);
  const resolvedSrc = useFallback || !src ? placeholderAvatar : src;

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      width={size}
      height={size}
      className={className}
      onError={() => setUseFallback(true)}
      priority
      unoptimized
    />
  );
};

