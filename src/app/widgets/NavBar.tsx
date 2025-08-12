"use client";
import React, { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { Menu, Search, User, RotateCcw } from "lucide-react"; // added reset icon
import LordVisnuTribute from "./LordVisnuTribute";

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function NavBar() {
  const [navbarPos, setNavbarPos] = useState<Position>({
    x: 0,
    y: 90,
    width: 0,
    height: 60,
  });

  useEffect(() => {
    const width = window.innerWidth * 0.9;
    setNavbarPos({
      x: (window.innerWidth - width) / 2,
      y: 90,
      width,
      height: 60,
    });
  }, []);

  const resetNavbar = () => {
    const width = window.innerWidth * 0.9;
    setNavbarPos({
      x: (window.innerWidth - width) / 2,
      y: 90,
      width,
      height: 60,
    });
  };

  return (
    <>
      <Rnd
        size={{ width: navbarPos.width, height: navbarPos.height }}
        position={{ x: navbarPos.x, y: navbarPos.y }}
        onDragStop={(_, d) =>
          setNavbarPos((prev) => ({ ...prev, x: d.x, y: d.y }))
        }
        onResizeStop={(_, __, ref, ___, position) =>
          setNavbarPos({
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
            ...position,
          })
        }
        bounds="window"
        minWidth={300}
        minHeight={50}
        style={{ zIndex: 1 }}
      >
        <div className="bg-white text-gray-800 shadow-lg rounded-lg h-full flex items-center justify-between px-4 gap-4 select-none">
          {/* Left Section: Logo */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">Ankur Singh</span>
          </div>

          {/* center part */}
          <div className="flex gap-6 items-center w-fit">
            {/* Center Section: Nav Links */}
            <div className="hidden md:flex gap-6 font-medium">
              <a href="#" className="hover:text-blue-500 transition-colors">
                Who I Am
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                What I've Built
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                My Superpowers
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                Find Me
              </a>
            </div>

            {/* Search Bar */}
            <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-2 py-1">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm px-2"
              />
            </div>

            {/* Right Section: Profile + Reset + Menu */}
            <div className="flex items-center gap-2">
              <button
                onClick={resetNavbar}
                className="p-2 rounded-full hover:bg-gray-100 transition"
                title="Reset Navbar Position"
              >
                <RotateCcw size={20} />
              </button>
              <button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition">
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </Rnd>

      <LordVisnuTribute />
    </>
  );
}
