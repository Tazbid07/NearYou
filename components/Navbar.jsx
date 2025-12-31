"use client";

import { useRouter } from "next/navigation";

export default function Navbar({ title }) {
    const router = useRouter();

    async function handleLogout() {
        await fetch("/api/logout", { method: "POST" });
        router.push("/login");
    }

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
            <h1 className="text-lg font-semibold">{title}</h1>

            <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
            >
                Logout
            </button>
        </header>
    );
}
