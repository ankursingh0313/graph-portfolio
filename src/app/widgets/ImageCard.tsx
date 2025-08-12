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

interface ImageCardProps {
  color: ColorKey;
  title: string;
  imageUrl: string;
  alt?: string;
  caption?: string;
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
  const [imgSrc, setImgSrc] = React.useState(src);

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
}: ImageCardProps) {
  const colorClass = colorClasses[color] || colorClasses.yellow;
  return (
    <Rnd
      default={{
        x: 100,
        y: 150,
        width: 200,
        height: 250,
      }}
      className={`absolute z-20 ${colorClass} border-2 rounded-lg shadow-lg`}
      minWidth={200}
      minHeight={200}
    >
      <div className="drag-handle cursor-move p-3 h-full flex flex-col">
        <h3 className="mb-2 text-gray-800 select-none flex-shrink-0">
          {title}
        </h3>

        <div className="flex flex-col flex-grow overflow-hidden">
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
        </div>

        <div className="text-xs text-gray-500 mt-2 text-right select-none flex-shrink-0">
          Drag & Resize
        </div>
      </div>

      {/* Resize handle */}
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-500/30 cursor-se-resize rounded-tr"></div>
    </Rnd>
  );
}
