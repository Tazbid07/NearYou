"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ChatPage() {
    const { username } = useParams();
    const router = useRouter();

    const [currentUser, setCurrentUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);

    const messagesEndRef = useRef(null);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Fetch messages
    async function fetchMessages() {
        const res = await fetch(`/api/messages/fetch?with=${username}`);
        if (res.ok) {
            const data = await res.json();
            setMessages(data);
        }
    }

    // Load auth + start polling
    useEffect(() => {
        let intervalId;

        async function init() {
            const authRes = await fetch("/api/auth/me");
            if (!authRes.ok) {
                router.push("/login");
                return;
            }

            const authData = await authRes.json();
            setCurrentUser(authData.username);

            await fetchMessages();
            setLoading(false);

            // ✅ Poll every 2 seconds
            intervalId = setInterval(fetchMessages, 2000);
        }

        init();

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [router, username]);

    // Send message
    async function sendMessage(e) {
        e.preventDefault();
        if (!text.trim()) return;

        const res = await fetch("/api/messages/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                to: username,
                text,
                type: "text",
            }),
        });

        if (res.ok) {
            setText("");
            fetchMessages(); // instant update for sender
        }
    }

    async function handleLogout() {
        await fetch("/api/logout", { method: "POST" });
        router.push("/login");
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading chat...
            </div>
        );
    }

    return (
        <main className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
                <h2 className="font-semibold text-lg">{username}</h2>
                <button
                    onClick={handleLogout}
                    className="text-sm px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
                >
                    Logout
                </button>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
                {messages.map((msg) => {
                    const isMine = msg.from === currentUser;

                    return (
                        <div
                            key={msg.id}
                            className={`flex ${isMine ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm ${isMine
                                        ? "bg-white text-black rounded-br-none"
                                        : "bg-neutral-800 text-white rounded-bl-none"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
                onSubmit={sendMessage}
                className="flex items-center gap-3 px-4 py-4 border-t border-neutral-800"
            >
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition"
                >
                    Send
                </button>
            </form>
        </main>
    );
}
