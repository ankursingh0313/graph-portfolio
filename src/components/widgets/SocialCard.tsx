import React from "react";
import BaseCard from "../BaseCard";

interface Link {
  platform: string;
  label: string;
  url: string;
}

interface SocialCardProps {
  color: ColorKey;
  title: string;
  links: Link[];
  handleLinkClick: (url: string) => void;
  iconMap: {
    [platform: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
  ExternalLink: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  x: number;
  y: number;
  height: number;
  width: number;
}

export default function SocialCard({
  color,
  title,
  links,
  handleLinkClick,
  iconMap,
  ExternalLink,
  x,
  y,
  height,
  width,
}: SocialCardProps) {
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
    </BaseCard>
  );
}
