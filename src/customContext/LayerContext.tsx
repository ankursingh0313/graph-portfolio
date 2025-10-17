"use client";

import React, { createContext, useContext, useState } from "react";

interface LayerContextType {
    bringForward: (id: string) => void;
    sendBackward: (id: string) => void;
    getZIndex: (id: string) => number;
    registerCard: (id: string) => void;
}

const LayerContext = createContext<LayerContextType | null>(null);

export function LayerProvider({ children }: { children: React.ReactNode }) {
    const [order, setOrder] = useState<string[]>([]);

    const registerCard = (id: string) => {
        setOrder((prev) => (prev.includes(id) ? prev : [...prev, id]));
    };

    const bringForward = (id: string) => {
        setOrder((prev) => {
            const i = prev.indexOf(id);
            if (i === -1 || i === prev.length - 1) return prev;
            const newOrder = [...prev];
            [newOrder[i], newOrder[i + 1]] = [newOrder[i + 1], newOrder[i]];
            return newOrder;
        });
    };

    const sendBackward = (id: string) => {
        setOrder((prev) => {
            const i = prev.indexOf(id);
            if (i <= 0) return prev;
            const newOrder = [...prev];
            [newOrder[i], newOrder[i - 1]] = [newOrder[i - 1], newOrder[i]];
            return newOrder;
        });
    };

    const getZIndex = (id: string) => {
        const index = order.indexOf(id);
        return index === -1 ? 1 : 10 + index; // 10,11,12... so they stack in order
    };

    return (
        <LayerContext.Provider
            value={{ bringForward, sendBackward, getZIndex, registerCard }}
        >
            {children}
        </LayerContext.Provider>
    );
}

export const useLayerManager = () => {
    const ctx = useContext(LayerContext);
    if (!ctx) throw new Error("useLayerManager must be used inside LayerProvider");
    return ctx;
};
