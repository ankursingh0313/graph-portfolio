import React, { useState } from "react";
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
export default function TextCard({
  color,
  content,
}: {
  color: ColorKey;
  content: String;
}) {
  const colorClass = colorClasses[color] || colorClasses.yellow;
  return (
    <Rnd
      default={{
        x: 100,
        y: 150,
        width: 200,
        height: 120,
      }}
      minWidth={200}
      minHeight={120}
      className={`absolute z-20 ${colorClass} border-2 rounded-lg shadow-lg`}
    >
      <div className="drag-handle cursor-move p-3 h-full flex flex-col">
        <div className="flex-1 overflow-auto">
          <p className="text-gray-700 text-sm whitespace-pre-line select-none">
            {content}
          </p>
        </div>
        <div className="text-xs text-gray-500 mt-2 text-right select-none">
          Drag & Resize
        </div>
      </div>

      {/* Resize handle */}
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-500/30 cursor-se-resize rounded-tr"></div>
    </Rnd>
  );
}
