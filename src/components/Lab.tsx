"use client"

import { useState } from "react"

export default function Lab() {
    const [size, setSize] = useState(30);
    const [zoom, setZoom] = useState(0);
    const handleZoom = (e: any) => {
        const deltaY = e.deltaY;
        if (deltaY > 0 && zoom < 20) {
            console.log(zoom)
            setZoom(zoom + 1)
        } else if (zoom > -20) {
            console.log(zoom)
            setZoom(zoom - 1)
        }
    }
    return (
        <div className="w-full min-h-screen relative bg-center cursor-crosshair" onWheelCapture={handleZoom} style={{
            backgroundColor: "#162556",
            backgroundImage: `
            radial-gradient(#00ffff55 2px, transparent 1px)
            `,
            backgroundSize: `${size + zoom}px ${size + zoom}px`,
        }}>

        </div>
    )
}