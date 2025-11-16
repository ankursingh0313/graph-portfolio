"use client";
import { useState, useEffect, useRef } from "react";
import { Check, X } from "lucide-react";

export default function Heighlighter() {
    const [selectedColor, setSelectedColor] = useState("#ffff00");

    // Unified state rule:
    // expanded === true → highlighter is active
    // expanded === false → highlighter turns off
    const [expanded, setExpanded] = useState(false);
    const isActive = expanded;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const drawing = useRef(false);

    const colors = ["#e3ff00", "#56ff00", "#00f9ff", "#ff00db", "#bd00ff"];

    // Setup canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.body.scrollHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("scroll", resizeCanvas);

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineWidth = 20;
            ctx.globalAlpha = 0.3;
            ctxRef.current = ctx;
        }

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("scroll", resizeCanvas);
        };
    }, []);

    // Drawing logic
    useEffect(() => {
        if (!isActive) return;

        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!canvas || !ctx) return;

        const getY = (clientY: number) => clientY + window.scrollY;

        const start = (e: MouseEvent) => {
            drawing.current = true;
            ctx.beginPath();
            ctx.moveTo(e.clientX, getY(e.clientY));
        };

        const draw = (e: MouseEvent) => {
            if (!drawing.current) return;
            ctx.strokeStyle = selectedColor;
            ctx.lineTo(e.clientX, getY(e.clientY));
            ctx.stroke();
        };

        const stop = () => {
            drawing.current = false;
            ctx.closePath();
        };

        canvas.addEventListener("mousedown", start);
        canvas.addEventListener("mousemove", draw);
        window.addEventListener("mouseup", stop);

        return () => {
            canvas.removeEventListener("mousedown", start);
            canvas.removeEventListener("mousemove", draw);
            window.removeEventListener("mouseup", stop);
        };
    }, [isActive, selectedColor]);

    // Escape closes the toolbox (collapses)
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setExpanded(false);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    const toggleExpand = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <>
            {isActive && (
                <canvas
                    ref={canvasRef}
                    className="fixed top-0 left-0 w-full z-[999] pointer-events-auto"
                    style={{
                        height: "100vh",
                        cursor: "crosshair",
                    }}
                ></canvas>
            )}

            {/* Floating Tool */}
            <div
                className={`fixed bottom-10 right-10 flex flex-col items-center p-3 bg-white/95 backdrop-blur-sm border border-green-600 rounded-lg shadow-xl transition-all duration-300 z-[1000] ${expanded ? "w-32 shadow-2xl scale-105" : "w-10 h-10 scale-100"
                    }`}
            >
                {/* Collapse Button (X) */}
                {expanded && (
                    <button
                        onClick={() => setExpanded(false)}
                        className="absolute top-1 right-1 text-gray-700 hover:text-red-600"
                    >
                        <X size={16} />
                    </button>
                )}

                {/* Expanded UI */}
                {expanded && (
                    <>
                        {/* Highlighter Label */}
                        <div className="cursor-pointer text-black text-sm font-medium mb-2 flex items-center">
                            Highlighter Active
                            <Check size={14} className="ml-1 text-green-600" />
                        </div>

                        {/* Color Picker */}
                        <div className="flex flex-row gap-1 mb-2">
                            {colors.map((color) => (
                                <div
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`h-4 w-4 rounded-sm shadow border border-gray-400 cursor-pointer hover:scale-110 transition-transform ${selectedColor === color ? "ring-2 ring-offset-1 ring-gray-600" : ""
                                        }`}
                                    style={{ backgroundColor: color }}
                                ></div>
                            ))}
                        </div>
                    </>
                )}

                {/* Collapsed Color Button */}
                {!expanded && (
                    <div
                        onClick={toggleExpand}
                        className="h-5 w-5 rounded-sm shadow border border-gray-400 cursor-pointer"
                        style={{ backgroundColor: selectedColor }}
                    ></div>
                )}
            </div>
        </>
    );
}
