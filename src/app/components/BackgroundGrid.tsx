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

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setCenter({ x: centerX, y: centerY });

    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Compute relative position for display (optional)
  const relPos = {
    x: Math.round(mousePos.x - center.x),
    y: Math.round(center.y - mousePos.y), // y inverted
  };

  return (
    <div
      ref={overlayRef}
      onMouseMove={handleMouseMove}
      className="w-full h-screen relative cursor-crosshair"
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

      {/* Horizontal line at mouse Y */}
      <div
        style={{
          position: "fixed",
          top: mousePos.y,
          left: 0,
          width: "100vw",
          height: 1,
          backgroundColor: "#48aa6a55",
          pointerEvents: "none",
          transform: "translateY(-0.5px)",
          zIndex: 0,
        }}
      />

      {/* Vertical line at mouse X */}
      <div
        style={{
          position: "fixed",
          left: mousePos.x,
          top: 0,
          height: "100vh",
          width: 1,
          backgroundColor: "#48aa6a55",
          pointerEvents: "none",
          transform: "translateX(-0.5px)",
          zIndex: 0,
        }}
      />

      {/* Coordinates display */}
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
