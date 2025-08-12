// app/widget-canvas.tsx
"use client";

import { useState, useRef, useEffect } from "react";

interface Widget {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function WidgetCanvas({
  initialWidgets,
}: {
  initialWidgets: Widget[];
}) {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Drag logic
  const handleDrag = (id: string, dx: number, dy: number) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x: w.x + dx, y: w.y + dy } : w))
    );
  };

  // Resize logic
  const handleResize = (id: string, dw: number, dh: number) => {
    setWidgets((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              width: Math.max(100, w.width + dw),
              height: Math.max(80, w.height + dh),
            }
          : w
      )
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full bg-white rounded-lg shadow"
    >
      {widgets.map((widget) => (
        <WidgetBox
          key={widget.id}
          {...widget}
          onDrag={handleDrag}
          onResize={handleResize}
        />
      ))}
    </div>
  );
}

function WidgetBox({
  id,
  x,
  y,
  width,
  height,
  onDrag,
  onResize,
}: Widget & {
  onDrag: (id: string, dx: number, dy: number) => void;
  onResize: (id: string, dw: number, dh: number) => void;
}) {
  const pos = useRef({ x: 0, y: 0 });

  const startDrag = (e: React.MouseEvent) => {
    pos.current = { x: e.clientX, y: e.clientY };
    const move = (ev: MouseEvent) => {
      onDrag(id, ev.clientX - pos.current.x, ev.clientY - pos.current.y);
      pos.current = { x: ev.clientX, y: ev.clientY };
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const startResize = (e: React.MouseEvent) => {
    pos.current = { x: e.clientX, y: e.clientY };
    const move = (ev: MouseEvent) => {
      onResize(id, ev.clientX - pos.current.x, ev.clientY - pos.current.y);
      pos.current = { x: ev.clientX, y: ev.clientY };
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  return (
    <div
      className="absolute border border-gray-300 bg-gray-50 rounded-md shadow"
      style={{ left: x, top: y, width, height }}
    >
      <div
        className="bg-gray-200 px-2 py-1 cursor-move text-sm font-bold select-none"
        onMouseDown={startDrag}
      >
        Widget {id}
      </div>
      <div className="p-2 text-sm">Content here</div>
      <div
        className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-se-resize"
        onMouseDown={startResize}
      />
    </div>
  );
}
