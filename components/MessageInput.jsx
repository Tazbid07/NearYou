"use client";

import { useState } from "react";

export default function MessageInput({ onSend }) {
    const [text, setText] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!text.trim()) return;
        onSend(text);
        setText("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 px-4 py-4 border-t border-neutral-800"
        >
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700
          focus:outline-none focus:ring-2 focus:ring-white"
            />

            <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition"
            >
                Send
            </button>
        </form>
    );
}
