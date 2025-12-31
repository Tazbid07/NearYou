import Link from "next/link";

export default function ContactItem({ username, lastMessage }) {
    return (
        <Link href={`/chat/${username}`}>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 transition cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center font-bold text-lg">
                    {username.charAt(0)}
                </div>

                <div className="flex-1">
                    <p className="font-semibold">{username}</p>
                    <p className="text-sm text-neutral-400 truncate max-w-xs">
                        {lastMessage || "Start a conversation"}
                    </p>
                </div>
            </div>
        </Link>
    );
}
