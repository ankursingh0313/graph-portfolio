import React, { useState } from "react";
import BaseCard from "../BaseCard";

interface ImageCardProps {
  color: ColorKey;
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
