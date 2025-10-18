import React, { useState } from "react";
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
interface ImageCardProps {
  color: colorType;
  title: string;
  imageUrl: string;
  alt?: string;
  caption?: string;
  x?: number;
  y?: number;
  height?: number;
  width?: number;
}

function ImageWithFallback({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() =>
        setImgSrc("https://via.placeholder.com/200x150?text=No+Image")
      }
    />
  );
}

export default function ImageCard({
  color,
  title,
  imageUrl,
  alt,
  caption,
  x = 0,
  y = 0,
  height = 100,
  width = 100,
}: ImageCardProps) {
  return (
    <BaseCard
      color={color}
      title={title}
      width={width}
      height={height}
      minHeight={200}
      scroll={false}
      x={x}
      y={y}
    >
      <div className="overflow-hidden rounded-lg flex-grow">
        <ImageWithFallback
          src={imageUrl}
          alt={alt || title}
          className="w-full h-full object-cover"
        />
      </div>
      {caption && (
        <p className="text-gray-700 text-sm select-none mt-2 flex-shrink-0">
          {caption}
        </p>
      )}
      {/* </div> */}
    </BaseCard>
  );
}
