"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InboxPage() {
    const router = useRouter();
    const [contact, setContact] = useState(null);
    const [lastMessage, setLastMessage] = useState("");

    useEffect(() => {
        async function loadInbox() {
            const res = await fetch("/api/auth/me");

            if (!res.ok) {
                router.push("/login");
                return;
            }

            const data = await res.json();

            const otherUser =
                data.username === "Tazbid" ? "Tanzum" : "Tazbid";
            setContact(otherUser);

            const msgRes = await fetch(
                `/api/messages/last?with=${otherUser}`
            );

            if (msgRes.ok) {
                const msgData = await msgRes.json();
                setLastMessage(msgData.text || "");
            }
        }

        loadInbox();
    }, [router]);

    async function handleLogout() {
        await fetch("/api/logout", { method: "POST" });
        router.push("/login");
    }

    return (
        <main className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
                <h1 className="text-xl font-semibold">Inbox</h1>
                <button
                    onClick={handleLogout}
                    className="text-sm px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
                >
                    Logout
                </button>
            </header>

            {/* Contacts */}
            <div className="flex-1 p-4">
                {contact && (
                    <Link href={`/chat/${contact}`}>
                        <div className="p-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 transition cursor-pointer">
                            <p className="font-semibold">
                                {contact}
                            </p>
                            <p className="text-sm text-neutral-400">
                                {lastMessage || "Start a conversation"}
                            </p>
                        </div>
                    </Link>
                )}
            </div>
        </main>
    );
}
