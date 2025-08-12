import React from "react";
import { Rnd } from "react-rnd";

// Define your color classes
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

// Define the shape of a link item
interface Link {
  platform: string; // key to iconMap
  label: string;
  url: string;
}

// Props type for SocialCard
interface SocialCardProps {
  color: ColorKey;
  title: string;
  links: Link[];
  handleLinkClick: (url: string) => void;
  iconMap: {
    [platform: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
  ExternalLink: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function SocialCard({
  color,
  title,
  links,
  handleLinkClick,
  iconMap,
  ExternalLink,
}: SocialCardProps) {
  const colorClass = colorClasses[color] || colorClasses.yellow;

  return (
    <Rnd
      default={{
        x: 100,
        y: 150,
        width: 250,
        height: 220,
      }}
      minWidth={200}
      minHeight={150}
      className={`absolute z-20 ${colorClass} border-2 rounded-lg shadow-lg`}
    >
      <div className="drag-handle cursor-move p-3 h-full flex flex-col">
        <h3 className="mb-2 text-gray-800 select-none">{title}</h3>
        <div className="flex flex-col gap-3 overflow-auto flex-1">
          {links.map((link, index) => {
            const Icon = iconMap[link.platform];
            return (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLinkClick(link.url);
                }}
                className="flex items-center gap-3 p-2 rounded-lg bg-white/50 hover:bg-white/80 transition-colors cursor-pointer group"
              >
                {Icon && (
                  <Icon className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
                )}
                <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                  {link.label}
                </span>
                <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
              </div>
            );
          })}
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
