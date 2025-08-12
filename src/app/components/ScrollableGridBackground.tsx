import React from "react";

interface ScrollableGridBackgroundProps {
  height: number;
}

export const ScrollableGridBackground: React.FC<
  ScrollableGridBackgroundProps
> = ({ height }) => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Small Grid */}
      <div
        className="w-full opacity-20"
        style={{
          height: `${height}px`,
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
      {/* Large Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          height: `${height}px`,
          backgroundImage: `
            linear-gradient(to right, #9ca3af 1px, transparent 1px),
            linear-gradient(to bottom, #9ca3af 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  );
};
