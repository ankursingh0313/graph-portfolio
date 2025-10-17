import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const flowers = [
  "flowers/flower.png",
  "flowers/flower1.png",
  "flowers/flower2.png",
  "flowers/flower3.png",
];

interface Flower {
  id: number;
  src: string;
  left: number;
}

export default function LordVisnuTribute({
  style,
}: {
  style: React.CSSProperties;
}) {
  const [fallingFlowers, setFallingFlowers] = useState<Flower[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const spawnFlowers = () => {
    const newFlowers = Array.from({ length: 3 }).map((_, idx) => ({
      id: Date.now() + idx,
      src: flowers[Math.floor(Math.random() * flowers.length)],
      left: Math.random() * 100, // percentage from left
    }));
    setFallingFlowers((prev) => [...prev, ...newFlowers]);

    // Remove them after animation (~3s)
    setTimeout(() => {
      setFallingFlowers((prev) =>
        prev.filter((f) => !newFlowers.some((nf) => nf.id === f.id))
      );
    }, 3000);
  };

  const handleMouseEnter = () => {
    if (!intervalRef.current) {
      spawnFlowers(); // spawn immediately
      intervalRef.current = setInterval(spawnFlowers, 500); // spawn every 0.5s
    }
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div style={style}>
      {/* Tribute Bar */}
      <div
        className="w-fit p-5 text-white flex items-center justify-center rounded-lg absolute cursor-none relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          background:
            "radial-gradient(ellipse at center, #ccc8, #ccc5, #ccc0, #ccc0);",
          cursor: "url(praying.png) 16 0, pointer",
        }}
      >
        <img
          alt="o!o"
          src="./LordVisnuTilak.svg"
          className="h-[30px] mr-2"
          style={{
            background: "radial-gradient(ellipse at center, #ccc8, #ccc0);",
          }}
        />
        <span className="font-semibold self-center text-sm">
          ॐ नमो भगवते वासुदेवाय नमः
        </span>

        {/* Falling Flowers */}
        {fallingFlowers.map((flower) => (
          <motion.img
            key={flower.id}
            src={flower.src}
            alt="flower"
            initial={{ y: -50, opacity: 1 }}
            animate={{ y: 200, opacity: 0 }}
            transition={{ duration: 3, ease: "easeIn" }}
            style={{
              position: "absolute",
              left: `${flower.left}%`,
              top: "0px",
              pointerEvents: "none",
              width: "30px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
