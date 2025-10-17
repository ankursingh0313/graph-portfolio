import React from "react";
import BaseCard from "../BaseCard";

export default function TextCard({
  color,
  content,
  x,
  y,
  height,
  width,
}: {
  color: ColorKey;
  content: string;
  x: number;
  y: number;
  height: number;
  width: number;
}) {
  return (
    <BaseCard
      color={color}
      width={200}
      height={120}
      minHeight={120}
      x={x}
      y={y}
      height={height}
      width={width}
    >
      <p className="text-gray-700 whitespace-pre-line select-none">{content}</p>
    </BaseCard>
  );
}
