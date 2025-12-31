export default function LoginCard({ children }) {
    return (
        <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur border border-neutral-700 rounded-2xl p-8 shadow-xl">
            {children}
        </div>
    );
}
