export default function Button({
    children,
    onClick,
    type = "button",
    className = "",
    disabled = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-xl font-semibold transition
        bg-white text-black hover:bg-neutral-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}`}
        >
            {children}
        </button>
    );
}
