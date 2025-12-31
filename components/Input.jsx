export default function Input({
    type = "text",
    value,
    onChange,
    placeholder = "",
    className = "",
    required = false,
}) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700
        focus:outline-none focus:ring-2 focus:ring-white
        ${className}`}
        />
    );
}
