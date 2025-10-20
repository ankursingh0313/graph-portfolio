"use client";
import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";

export default function Heighlighter() {
    const [selectedColor, setSelectedColor] = useState("#ffff00");
    const [isActive, setIsActive] = useState(false);
    const [expanded, setExpanded] = useState(false);
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

    // Escape disables drawing
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsActive(false);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    const toggleBrush = () => setIsActive((prev) => !prev);
    const toggleColors = () => setExpanded((prev) => !prev);

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
                className={`fixed bottom-10 right-10 flex flex-col p-2 items-center justify-center gap-2 bg-white/95 backdrop-blur-sm border border-green-500 rounded-lg shadow-xl transition-all duration-300 z-[1000] ${expanded ? "shadow-2xl scale-105" : "shadow-md scale-100"
                    }`}
            >
                {/* Highlighter status */}
                {expanded && (
                    <div
                        className="cursor-pointer text-black text-sm font-medium mb-1 flex flex-row items-center"
                        onClick={toggleBrush}
                    >
                        {isActive ? (
                            <>
                                Highlighter Active <Check size={16} className="ml-1 text-green-600" />
                            </>
                        ) : (
                            <>Highlighter</>
                        )}
                    </div>
                )}

                {/* Color Picker */}
                {expanded && (
                    <div className="flex flex-row gap-1 mb-1">
                        {colors.map((color) => (
                            <div
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`h-4 w-4 rounded-sm shadow border border-gray-400 cursor-pointer hover:scale-110 transition-transform ${selectedColor === color
                                    ? "ring-2 ring-offset-1 ring-gray-500"
                                    : ""
                                    }`}
                                style={{ backgroundColor: color }}
                            ></div>
                        ))}
                    </div>
                )}

                {/* Bottom Row */}
                <div className="flex justify-between items-center w-full">
                    {/* Color toggle box */}
                    <div
                        onClick={toggleColors}
                        className="h-5 w-5 rounded-sm shadow border border-gray-400 cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: selectedColor }}
                    ></div>

                    {/* Brush icon */}
                    <div
                        className={`w-5 h-5 cursor-pointer transition-transform ${isActive ? "scale-110" : "opacity-80"
                            }`}
                        onClick={toggleBrush}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 77" fill="none">
                            <g id="heighlighter">
                                <path
                                    id="brush"
                                    d="M5 59.5L29 36.5L52 59.5L41.5 72H5V59.5Z"
                                    fill={selectedColor}
                                    stroke={selectedColor}
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    id="handle"
                                    d="M84.5 36.5L61 59.5H52L29 36.5V28L52 5.5"
                                    stroke={isActive ? "#16a34a" : "#6a7282"}
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}
