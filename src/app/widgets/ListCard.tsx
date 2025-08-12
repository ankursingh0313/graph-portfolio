import React from "react";
import { Rnd } from "react-rnd";

const colorClasses = {
  yellow: "bg-yellow-200 border-yellow-300",
  blue: "bg-blue-200 border-blue-300",
  green: "bg-green-200 border-green-300",
  pink: "bg-pink-200 border-pink-300",
  orange: "bg-orange-200 border-orange-300",
  purple: "bg-purple-200 border-purple-300",
  cyan: "bg-cyan-200 border-cyan-300",
  lime: "bg-lime-200 border-lime-300",
  red: "bg-red-200 border-red-300",
  gray: "bg-gray-200 border-gray-300",
};
type ColorKey = keyof typeof colorClasses;

interface ListCardProps {
  color: ColorKey;
  title: string;
  items: string[]; // array of list items
}

export default function ListCard({ color, title, items }: ListCardProps) {
  const colorClass = colorClasses[color] || colorClasses.yellow;
  return (
    <Rnd
      default={{
        x: 100,
        y: 150,
        width: 250,
        height: 200,
      }}
      minWidth={200}
      minHeight={150}
      className={`absolute z-20 ${colorClass} border-2 rounded-lg shadow-lg`}
    >
      <div className="drag-handle cursor-move p-4 h-full flex flex-col">
        <h3 className="mb-3 text-gray-800 select-none text-lg font-semibold">
          {title}
        </h3>
        <ul className="flex-1 overflow-auto list-disc list-inside text-gray-700 text-sm">
          {items.map((item, index) => (
            <li key={index} className="mb-1 select-text">
              {item}
            </li>
          ))}
        </ul>
        <div className="text-xs text-gray-500 mt-2 text-right select-none">
          Drag & Resize
        </div>
      </div>

      {/* Resize handle */}
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-500/30 cursor-se-resize rounded-tr"></div>
    </Rnd>
  );
}
