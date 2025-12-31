import Link from "next/link";

export default function HomePage() {
    return (
        <main className="flex items-center justify-center min-h-screen px-4">
            <div className="text-center space-y-6">
                <h1 className="text-5xl font-bold tracking-tight">NearYou</h1>
                <p className="text-neutral-300 max-w-md mx-auto">
                    A private and simple way to stay connected.
                </p>

                <Link href="/login">
                    <button className="px-8 py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition">
                        Login
                    </button>
                </Link>
            </div>
        </main>
    );
}
