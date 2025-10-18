import React from "react";
import BaseCard from "../BaseCard";

const color = {
  yellow: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#fff08511] hover:border-yellow-300",
  blue: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#bedbff11] hover:border-blue-300",
  green: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#b9f8cf11] hover:border-green-300",
  pink: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#fccee811] hover:border-pink-300",
  orange: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#ffd7a811] hover:border-orange-300",
  purple: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#e9d4ff11] hover:border-purple-300",
  cyan: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#a2f4fd11] hover:border-cyan-300",
  lime: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#d8f99911] hover:border-lime-300",
  red: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#ffc9c911] hover:border-red-300",
  gray: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#e5e7eb11] hover:border-gray-300",
} as const;
type colorType = keyof typeof color;
interface StickyCardProps {
  color: colorType;
  title: string;
  content: string;
  x: number;
  y: number;
  height: number;
  width: number;
}

export default function StickyCard({
  color,
  title,
  content,
  x,
  y,
  height,
  width,
}: StickyCardProps) {
  return (
    <BaseCard
      color={color}
      title={title}
      width={width}
      height={height}
      minHeight={150}
      x={x}
      y={y}
    >
      <p className="text-gray-700 whitespace-pre-line select-none">{content}</p>
    </BaseCard>
  );
}
