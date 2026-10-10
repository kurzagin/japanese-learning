import React from "react";

interface FishIconProps {
  className?: string;
  size?: number;
}

export function FishIcon({ className = "w-6 h-6", size = 24 }: FishIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Streamlined minimal fish contour */}
      <path d="M19.5 12c-2.5-4-7-6-12-5 3.5 3 3.5 7 0 10 5 1 9.5-1 12-5Z" />
      <path d="M2 17l4-5-4-5" />
      <circle cx="15.5" cy="10.5" r="1" fill="currentColor" />
      <path d="M10 10.5c.5 1 1.5 1.5 2.5 1" />
    </svg>
  );
}
