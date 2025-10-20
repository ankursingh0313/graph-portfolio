"use client";

import React, { useState, useEffect } from "react";
import {
    ArrowBigDownDash,
    ArrowBigUpDash,
    ArrowDownRight,
    Facebook,
    Instagram,
    Linkedin,
    Github,
    Youtube,
    Globe,
    MessageCircle,
    Send,
    ExternalLink,
    MailIcon,
    Move,
    SendIcon,
    Pin,
} from "lucide-react";
import { Rnd } from "react-rnd";
import { useLayerManager } from "@/customContext/LayerContext";
import Link from "next/link";

const colorHoverClasses = {
    yellow: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#fff08511] hover:border-yellow-300",
    blue: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#bedbff11] hover:border-blue-300",
    green: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#b9f8cf11] hover:border-green-300",
    pink: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#fccee811] hover:border-pink-300",
    orange: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#ffd7a811] hover:border-orange-300",
    purple: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#e9d4ff11] hover:border-purple-300",
    cyan: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#a2f4fd11] hover:border-cyan-300",
    lime: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#d8f99911] hover:border-lime-300",
    red: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#ffc9c911] hover:border-red-300",
    gray: "bg-[#e5e7eb11] border-gray-300 hover:bg-[#e5e7eb11] hover:border-gray-300",
} as const;

type ColorKey = keyof typeof colorHoverClasses;

interface SmartCardProps {
    type: "text" | "image" | "list" | "contact" | "social" | "sticky";
    color?: ColorKey;
    title?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    scroll?: boolean;
    content?: string;
    placeholder?: string;
    imageUrl?: string;
    caption?: string;
    items?: string[];
    links?: { platform: string; label: string; url: string }[];
    handleLinkClick?: (url: string) => void;
    iconMap?: { [platform: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> };
}

// Default platform icons
const builtInIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    twitter: (props) => (<svg {...props} viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="none" className="lucide lucide-message-circle w-4 h-4 text-gray-600 group-hover:text-gray-800">
        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
    </svg>),
    x: (props) => (<svg {...props} viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="none" className="lucide lucide-message-circle w-4 h-4 text-gray-600 group-hover:text-gray-800">
        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
    </svg>),
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    github: Github,
    youtube: Youtube,
    discord: (props) => (<svg {...props} viewBox="0 0 831 657" fill="none" xmlns="http://www.w3.org/2000/svg" className="lucide lucide-message-circle w-4 h-4 text-gray-600 group-hover:text-gray-800">
        <g id="Discord">
            <path id="Vector 1" d="M19 388C11.5 465.5 19 532.5 19 532.5C19 532.5 62 564 98 584.5C134 605 221 638 221 638C221 638 236.5 614.5 244.5 601.5C252.5 588.5 264.5 565 264.5 565C264.5 565 241.5 557.25 229 551C216.5 544.75 196 532.5 196 532.5L212 519C212 519 307.5 565 420 565C532.5 565 618 517.5 618 517.5L635 532.5C635 532.5 609 546.5 601 550.5C593 554.5 565 565 565 565C565 565 578 589 585.5 602C593 615 609 638 609 638C609 638 672.5 616.5 725 588.5C777.5 560.5 811.5 532.5 811.5 532.5C811.5 532.5 819.5 476.5 811.5 388C803.5 299.5 783 251 764 201.5C745 152 694 69.5 694 69.5C694 69.5 648 49 618 38.5C588 28 526.5 17.5 526.5 17.5L506.5 61.5C506.5 61.5 471.5 55 417 54C362.5 53 323 61.5 323 61.5L303 17.5C303 17.5 260 24.5 227.5 34C195 43.5 136.5 68.5 136.5 68.5C136.5 68.5 90.5 139.5 65.5 202.5C40.5 265.5 26.5 310.5 19 388Z" stroke="black" strokeWidth="30" />
            <path id="Ellipse 1" d="M282 300C311.707 300 339 328.105 339 367C339 405.895 311.707 434 282 434C252.293 434 225 405.895 225 367C225 328.105 252.293 300 282 300Z" stroke="black" strokeWidth="30" />
            <path id="Ellipse 2" d="M548 300C577.707 300 605 328.105 605 367C605 405.895 577.707 434 548 434C518.293 434 491 405.895 491 367C491 328.105 518.293 300 548 300Z" stroke="black" strokeWidth="30" />
        </g>
    </svg>
    ),
    telegram: Send,
    reddit: (props) => (<svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="lucide lucide-message-circle w-4 h-4 text-gray-600 group-hover:text-gray-800">
        <g>
            <path fill="none" d="M0 0h24v24H0z" />
            <path fillRule="nonzero" d="M11.102 7.815l.751-3.536a2 2 0 0 1 2.373-1.54l3.196.68a2 2 0 1 1-.416 1.956l-3.196-.68-.666 3.135c1.784.137 3.557.73 5.163 1.7a3.192 3.192 0 0 1 4.741 2.673v.021a3.192 3.192 0 0 1-1.207 2.55 2.855 2.855 0 0 1-.008.123c0 3.998-4.45 7.03-9.799 7.03-5.332 0-9.708-3.024-9.705-6.953a5.31 5.31 0 0 1-.01-.181 3.192 3.192 0 0 1 3.454-5.35 11.446 11.446 0 0 1 5.329-1.628zm9.286 5.526c.408-.203.664-.62.661-1.075a1.192 1.192 0 0 0-2.016-.806l-.585.56-.67-.455c-1.615-1.098-3.452-1.725-5.23-1.764h-1.006c-1.875.029-3.651.6-5.237 1.675l-.663.45-.584-.55a1.192 1.192 0 1 0-1.314 1.952l.633.29-.054.695c-.013.17-.013.339.003.584 0 2.71 3.356 5.03 7.708 5.03 4.371 0 7.799-2.336 7.802-5.106a3.31 3.31 0 0 0 0-.508l-.052-.672.604-.3zM7 13.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm7 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm-1.984 5.103c-1.397 0-2.767-.37-3.882-1.21a.424.424 0 0 1 .597-.597c.945.693 2.123.99 3.269.99s2.33-.275 3.284-.959a.439.439 0 0 1 .732.206.469.469 0 0 1-.119.423c-.684.797-2.484 1.147-3.881 1.147z" />
        </g>
    </svg>),
    website: Globe,
    web: Globe,
    whatsapp: MessageCircle,
};

export default function SmartCard({
    type,
    color = "yellow",
    title,
    x = 0,
    y = 0,
    width = 250,
    height = 200,
    minWidth = 200,
    minHeight = 150,
    scroll = true,
    content,
    placeholder,
    imageUrl,
    caption,
    items,
    links,
    handleLinkClick,
    iconMap = {},
}: SmartCardProps) {
    const [colorClass] = useState(colorHoverClasses[color]);
    const { bringForward, sendBackward, getZIndex, registerCard } = useLayerManager();
    const [id] = useState(() => Math.random().toString(36).slice(2));

    // Register card once
    useEffect(() => {
        registerCard(id);
    }, [id, registerCard]);

    // Adjust body height when dragging or resizing
    const expandBodyHeight = (bottom: number) => {
        const currentHeight = document.body.scrollHeight;
        const safeWidth = document.body.offsetWidth;
        if (bottom > currentHeight - 100) {
            document.body.style.minHeight = `${bottom + 200}px`;
            document.body.style.maxWidth = `${safeWidth}px`;
            document.documentElement.style.overflowX = "hidden";
        }
    };

    const renderContent = () => {
        switch (type) {
            case "text":
            case "sticky":
                return <p className="text-gray-700 text-base whitespace-pre-line select-none">{content}</p>;

            case "image":
                return (
                    <>
                        <div className="overflow-hidden rounded-lg flex-grow">
                            <img
                                src={imageUrl || "https://via.placeholder.com/200x150?text=No+Image"}
                                alt={title || "Image"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {caption && (
                            <p className="text-gray-700 text-sm select-none mt-2 flex-shrink-0">{caption}</p>
                        )}
                    </>
                );

            case "list":
                return (
                    <ul className="list-disc list-inside text-gray-700 text-base">
                        {items?.map((item, i) => (
                            <li key={i} className="mb-1 select-text">
                                {item}
                            </li>
                        ))}
                    </ul>
                );

            case "contact": {
                const [name, setName] = useState("");
                const [email, setEmail] = useState("");
                const [message, setMessage] = useState("");

                return (
                    <>
                        <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                            <MailIcon className="w-5 h-5 text-gray-600" />
                            <p className="text-gray-700 text-sm select-none">
                                {placeholder || "Contact us anytime!"}
                            </p>
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert(`Message sent!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
                                setName("");
                                setEmail("");
                                setMessage("");
                            }}
                            className="flex flex-col gap-4 flex-grow overflow-auto"
                        >
                            <label className="flex flex-col text-xs text-gray-600">
                                Name
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 p-2 rounded border border-gray-300 text-sm"
                                    required
                                />
                            </label>

                            <label className="flex flex-col text-xs text-gray-600">
                                Email
                                <input
                                    type="email"
                                    placeholder="example@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 p-2 rounded border border-gray-300 text-sm"
                                    required
                                />
                            </label>

                            <label className="flex flex-col text-xs text-gray-600 flex-grow">
                                Message
                                <textarea
                                    placeholder="Your Message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="mt-1 p-2 rounded border border-gray-300 text-sm resize-none h-full"
                                    required
                                />
                            </label>

                            <button
                                type="submit"
                                className="mt-auto bg-black hover:bg-blue-950 text-white text-sm rounded py-2 flex items-center justify-center gap-2 select-none"
                            >   <SendIcon className="w-4 h-4" />
                                Send Message
                            </button>
                        </form>

                    </>
                );
            }

            case "social":
                return (
                    <div className="flex flex-col gap-3 overflow-auto flex-1">
                        {links?.map((link, index) => {
                            const platformKey = link.platform.toLowerCase();
                            const Icon =
                                iconMap[platformKey] ||
                                builtInIcons[platformKey] ||
                                undefined;
                            return (
                                <Link
                                    key={index}
                                    href={link.url}
                                    target="blank"
                                    className="flex items-center gap-3 p-2 rounded-lg bg-white/50 hover:bg-white/80 transition-colors cursor-pointer group"
                                >
                                    {Icon && <Icon className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />}
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                                        {link.label}
                                    </span>
                                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
                                </Link>
                            );
                        })}
                    </div>
                );

            default:
                return <p>Unsupported card type</p>;
        }
    };

    return (
        <Rnd
            default={{ x, y, width, height }}
            minWidth={minWidth}
            minHeight={minHeight}
            enableResizing={{
                bottom: true,
                bottomRight: true,
                right: true,
                top: true,
                topLeft: true,
                topRight: true,
                left: true,
            }}
            dragHandleClassName="move-handle"
            onDrag={(e, d) => expandBodyHeight(d.y + height)}
            onResize={(e, direction, ref, delta, position) =>
                expandBodyHeight(position.y + ref.offsetHeight)
            }
            style={{ zIndex: getZIndex(id), transition: "z-index 0.1s" }}
            className={`absolute ${colorClass} border-2 rounded-lg shadow-lg backdrop-blur-sm`}
        >
            <div className="relative h-full w-full p-4 pt-1 flex flex-col">
                <div className="flex justify-between items-center">
                    <div className="">
                        <button className="move-handle cursor-grab active:cursor-grabbing hover:bg-gray-300 text-gray-500 aspect-square rounded-lg p-1 flex justify-center items-center">
                            <Pin size={16} className="rotate-45" />
                        </button>
                    </div>
                    <div className="flex gap-1">
                        <button
                            onClick={() => sendBackward(id)}
                            className="hover:bg-gray-300 text-gray-500 aspect-square rounded-lg p-1 flex justify-center items-center"
                            title="Send backward"
                        >
                            <ArrowBigDownDash size={16} />
                        </button>
                        <button
                            onClick={() => bringForward(id)}
                            className="hover:bg-gray-300 text-gray-500 aspect-square rounded-lg p-1 flex justify-center items-center"
                            title="Bring forward"
                        >
                            <ArrowBigUpDash size={16} />
                        </button>
                    </div>
                </div>

                {title && (
                    <h3 className="mb-3 text-gray-800 select-none text-lg font-semibold">{title}</h3>
                )}

                <div
                    className={`flex flex-col flex-grow text-lg ${scroll ? "overflow-auto" : "overflow-hidden"
                        }`}
                >
                    {renderContent()}
                </div>

                <div className="text-xs text-gray-500 mt-2 text-right select-none">Drag & Resize</div>
                <div className="text-gray-500/50 absolute bottom-0 right-0">
                    <ArrowDownRight size={16} />
                </div>
            </div>
        </Rnd>
    );
}
