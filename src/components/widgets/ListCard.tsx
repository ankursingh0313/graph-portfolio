import React from "react";
import BaseCard from "../BaseCard";

interface ListCardProps {
  color: ColorKey;
  title: string;
  items: string[];
  x: number;
  y: number;
  height: number;
  width: number;
}

export default function ListCard({
  color,
  title,
  items,
  x,
  y,
  height,
  width,
}: ListCardProps) {
  return (
    <BaseCard
      color={color}
      title={title}
      x={x}
      y={y}
      width={width}
      height={height}
      minHeight={150}
    >
      <ul className="list-disc list-inside text-gray-700">
        {items.map((item, i) => (
          <li key={i} className="mb-1 select-text">
            {item}
          </li>
        ))}
      </ul>
    </BaseCard>
  );
}
