"use client";

import { ArrowBigDownDash, ArrowBigUpDash, ArrowDownRight } from "lucide-react";
import React, { useEffect, useId, useState } from "react";
import { Rnd } from "react-rnd";
import { useLayerManager } from "@/customContext/LayerContext";

const colorHoverClasses = {
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

type ColorKey = keyof typeof colorHoverClasses;

interface BaseCardProps {
  color?: ColorKey;
  title?: React.ReactNode;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  scroll?: boolean;
  className?: string;
  children?: React.ReactNode;
  x?: number;
  y?: number;
}

export default function BaseCard({
  color = "yellow",
  title,
  width = 250,
  height = 200,
  minWidth = 200,
  minHeight = 150,
  scroll = true,
  className = "",
  children,
  x = 0,
  y = 0,
}: BaseCardProps) {
  const [colorClass] = useState(colorHoverClasses[color]);
  const id = useId();
  const { bringForward, sendBackward, getZIndex, registerCard } = useLayerManager();

  useEffect(() => {
    registerCard(id);
  }, [id, registerCard]);

  return (
    <Rnd
      default={{ x, y, width, height }}
      minWidth={minWidth}
      minHeight={minHeight}
      bounds="window"
      style={{ zIndex: getZIndex(id), transition: "z-index 0.1s" }}
      className={`absolute ${colorClass} border-2 rounded-lg shadow-lg backdrop-blur-sm ${className}`}
    >
      <div className="relative h-full w-full p-4 pt-1 flex flex-col">
        <div className="flex justify-between items-center">
          <div></div>
          <div className="flex gap-1">
            <button
              onClick={() => sendBackward(id)}
              className="hover:bg-gray-300 text-gray-500 aspect-square rounded-lg p-1 flex justify-center items-center"
              title="Send backward"
            >
              <ArrowBigDownDash size={16} />
            </button>
            <button
              onClick={() => bringForward(id)}
              className="hover:bg-gray-300 text-gray-500 aspect-square rounded-lg p-1 flex justify-center items-center"
              title="Bring forward"
            >
              <ArrowBigUpDash size={16} />
            </button>
          </div>
        </div>

        {title && (
          <h3 className="mb-3 text-gray-800 select-none text-lg font-semibold">
            {title}
          </h3>
        )}

        <div
          className={`flex flex-col flex-grow text-lg ${scroll ? "overflow-auto" : "overflow-hidden"
            }`}
        >
          {children}
        </div>

        <div className="text-xs text-gray-500 mt-2 text-right select-none">
          Drag & Resize
        </div>
        <div className="text-gray-500/50 absolute bottom-0 right-0">
          <ArrowDownRight size={16} />
        </div>
      </div>
    </Rnd>
  );
}
