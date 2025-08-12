import React, { useState } from "react";
import { Rnd } from "react-rnd";

const colorClasses = {
  yellow: "bg-yellow-200 border-yellow-300",
  blue: "bg-blue-200 border-blue-300",
  green: "bg-green-200 border-green-300",
  pink: "bg-pink-200 border-pink-300",
  orange: "bg-orange-200 border-orange-300",
  purple: "bg-purple-200 border-purple-300",
  cyan: "bg-cyan-200 border-cyan-300",
  lime: "bg-lime-200 border-lime-300",
  red: "bg-red-200 border-red-300",
  gray: "bg-gray-200 border-gray-300",
};
type ColorKey = keyof typeof colorClasses;

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

export default function ContactCard({
  color,
  title,
  placeholder,
}: {
  color: ColorKey;
  title: string;
  placeholder?: string;
}) {
  const colorClass = colorClasses[color] || colorClasses.yellow;

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Message sent!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <Rnd
      default={{
        x: 100,
        y: 150,
        width: 320,
        height: 420, // numeric initial height
      }}
      minWidth={280}
      minHeight={380}
      className={`absolute z-20 ${colorClass} border-2 rounded-lg shadow-lg`}
    >
      <div className="drag-handle cursor-move p-4 h-full flex flex-col">
        <h3 className="mb-4 text-gray-800 select-none text-lg font-semibold flex-shrink-0">
          {title}
        </h3>

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

        <div className="text-xs text-gray-500 mt-3 text-right select-none flex-shrink-0">
          Drag & Resize
        </div>
      </div>

      {/* Resize handle */}
      <div className="absolute bottom-0 right-0 w-5 h-5 bg-gray-500/30 cursor-se-resize rounded-tr"></div>
    </Rnd>
  );
}
