import React, { useState } from "react";
import BaseCard from "../BaseCard";

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M4 4h16v16H4z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
const color = {
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
type colorType = keyof typeof color;
interface ContactCardProps {
  color: colorType;
  title: string;
  placeholder?: string;
  x: number;
  y: number;
  height: number;
  width: number;
}

export default function ContactCard({
  color,
  title,
  placeholder,
  x,
  y,
  height,
  width,
}: ContactCardProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Message sent!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <BaseCard
      color={color}
      title={title}
      x={x}
      y={y}
      width={width}
      height={height}
      minHeight={380}
    >
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        <MailIcon className="w-5 h-5 text-gray-600" />
        <p className="text-gray-700 text-sm select-none">
          {placeholder || "Contact us anytime!"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 flex-grow overflow-auto"
        onClick={(e) => e.stopPropagation()}
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
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 rounded border border-gray-300 text-sm"
            required
          />
        </label>

        <label className="flex flex-col text-xs text-gray-600 flex-grow">
          Message
          <textarea
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 p-2 rounded border border-gray-300 text-sm resize-none h-full"
            required
          />
        </label>

        <button
          type="submit"
          className="mt-auto bg-black hover:bg-blue-950 text-white text-sm rounded py-2 flex items-center justify-center gap-2 select-none"
        >
          <SendIcon className="w-4 h-4" />
          Send Message
        </button>
      </form>
    </BaseCard>
  );
}
