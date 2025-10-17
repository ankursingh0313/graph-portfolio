import React from "react";
import BaseCard from "../BaseCard";

interface StickyCardProps {
  color: ColorKey;
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
