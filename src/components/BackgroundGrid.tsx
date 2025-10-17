"use client";
import React, { useRef, useState } from "react";

export default function BackgroundGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [center, setCenter] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = overlayRef.current?.getBoundingClientRect();
    if (!rect) return;

    // 🧮 Compute center using scroll position too
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    const centerX = rect.left + scrollX + rect.width / 2;
    const centerY = rect.top + scrollY + rect.height / 2;

    setCenter({ x: centerX, y: centerY });

    // 🧭 Mouse position relative to the document (not just viewport)
    setMousePos({
      x: e.clientX + scrollX,
      y: e.clientY + scrollY,
    });
  };

  // Compute relative position (center = 0,0)
  const relPos = {
    x: Math.round(mousePos.x - center.x),
    y: Math.round(center.y - mousePos.y),
  };

  return (
    <div
      ref={overlayRef}
      onMouseMove={handleMouseMove}
      className="w-full min-h-screen relative cursor-crosshair"
      style={{
        backgroundColor: "#f0f0f000",
        backgroundImage: `
          linear-gradient(to right, #9cffaf55 1px, transparent 1px),
          linear-gradient(to bottom, #9cffaf55 1px, transparent 1px)
        `,
        backgroundSize: "100px 100px",
      }}
    >
      {children}

      {/* Horizontal guide line */}
      <div
        style={{
          position: "absolute",
          top: mousePos.y,
          left: 0,
          width: "100%",
          height: 1,
          backgroundColor: "#48aa6a55",
          pointerEvents: "none",
          transform: "translateY(-0.5px)",
          zIndex: 0,
        }}
      />

      {/* Vertical guide line */}
      <div
        style={{
          position: "absolute",
          left: mousePos.x,
          top: 0,
          height: "100%",
          width: 1,
          backgroundColor: "#48aa6a55",
          pointerEvents: "none",
          transform: "translateX(-0.5px)",
          zIndex: 0,
        }}
      />

      {/* Coordinate display */}
      <div
        style={{
          position: "fixed",
          bottom: 10,
          right: 10,
          color: "#005500",
          padding: "4px 8px",
          borderRadius: 4,
          fontFamily: "monospace",
          fontSize: 12,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        x: {relPos.x}, y: {relPos.y}
      </div>
    </div>
  );
}
