"use client";

import React, { useRef, useEffect, useState } from "react";

export default function SmoothDrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const frameRequested = useRef(false);
  const [strokeColor, setStrokeColor] = useState("#000");
  const [lineWidth, setLineWidth] = useState(2);

  // 🧠 Resize canvas to match screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // 🖱 Mouse Events
  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawing.current = true;
    const rect = canvasRef.current!.getBoundingClientRect();
    const point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    pointsRef.current = [point];
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing.current) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const point = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    const points = pointsRef.current;
    const last = points[points.length - 1];
    const dx = point.x - last.x;
    const dy = point.y - last.y;

    // Only add if mouse moved > 2px
    if (dx * dx + dy * dy > 4) {
      points.push(point);
      if (!frameRequested.current) {
        frameRequested.current = true;
        requestAnimationFrame(drawSmoothLine);
      }
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    pointsRef.current = [];
  };

  // 🖌️ Drawing Logic
  const drawSmoothLine = () => {
    frameRequested.current = false;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const points = pointsRef.current;
    if (points.length < 2) return;

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length - 1; i++) {
      const midPoint = {
        x: (points[i].x + points[i + 1].x) / 2,
        y: (points[i].y + points[i + 1].y) / 2,
      };
      ctx.quadraticCurveTo(points[i].x, points[i].y, midPoint.x, midPoint.y);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.stroke();
  };

  // 🧹 Clear Canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="relative w-screen h-screen bg-gray-50 select-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* 🧭 Control Panel */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg shadow-md p-3 flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">
          Color:
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="ml-2 w-6 h-6 p-0 border rounded cursor-pointer"
          />
        </label>
        <label className="text-sm font-medium text-gray-700">
          Width:
          <input
            type="range"
            min="1"
            max="10"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="ml-2 w-24"
          />
        </label>
        <button
          onClick={clearCanvas}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
