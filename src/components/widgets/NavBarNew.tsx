"use client";

import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { Menu, RotateCcw } from "lucide-react";
import LordVisnuTribute from "./LordVisnuTribute";
import Link from "next/link";

interface Position {
  x: number;
  y: number;
}

const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "technologies", label: "Tech", href: "/technologies" },
  { id: "contact", label: "Contact", href: "/contact" },
];
const place = {
  x: 365,
  y: 30,
};
export default function NavBar() {
  const [navbarPos, setNavbarPos] = useState<Position>({
    x: place.x,
    y: place.y,
  });
  const [currentPage, setCurrentPage] = useState<string>("home");

  const resetNavbar = () => setNavbarPos({ x: place.x, y: place.y });
  const handleClick = (e: any) => {
    // e.preventDefault();
    console.log(e, e.target.id)
    setCurrentPage(e.target.id)
  }
  return (
    <>
      <Rnd
        default={{
          x: navbarPos.x,
          y: navbarPos.y,
          width: "auto",
          height: "auto",
        }}
        position={navbarPos}
        onDragStop={(_, d) => setNavbarPos({ x: d.x, y: d.y })}
        enableResizing={false}
        bounds="window"
        style={{ zIndex: 100, position: "fixed", paddingTop: 10, paddingBottom: 10 }}
      >
        <div className="flex flex-col items-center gap-2 bg-white/95 backdrop-blur-sm border border-green-500 rounded-lg px-4 py-3 shadow-xl hover:shadow-2xl transition-shadow duration-200">
          <div className="font-semibold text-black">
            Ankur Singh / FullStack Developer
          </div>
          {/* Row 1: Navigation + Reset/Menu */}
          <div className="flex items-center justify-between w-full gap-4">
            {/* Left: Navigation Links */}
            <div className="flex gap-2">
              {navItems.map((item) => (
                <Link href={item.href} key={item.id}>
                  <button
                    id={item.id}
                    onClick={handleClick}
                    className={`px-3 py-1.5 text-sm rounded-md transition ${currentPage === item.id
                      ? "bg-black text-white hover:bg-blue-950"
                      : "bg-transparent text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {item.label}
                  </button>
                </Link>
              ))}
            </div>

            {/* Right: Reset + Menu */}
            <div className="flex items-center gap-2 text-gray-300 hover:text-gray-400 absolute right-1 top-1">
              <button
                onClick={resetNavbar}
                className="p-1 rounded-full hover:bg-gray-100 transition"
                title="Reset Navbar Position"
              >
                <RotateCcw size={20} />
              </button>
              <button className="md:hidden p-1 rounded-full hover:bg-gray-100 transition">
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* Row 2: Message */}
          <div className="text-xs text-gray-500 text-center select-none pointer-events-none">
            {currentPage === "home"
              ? "Scroll to explore all sections!"
              : "Drag me around!"}
          </div>
        </div>
      </Rnd>

      <LordVisnuTribute
        style={{
          position: "fixed",
          right: 20,
          top: 20,
        }}
      />
    </>
  );
}
