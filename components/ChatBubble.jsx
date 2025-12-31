export default function ChatBubble({ message, isMine }) {
    return (
        <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm break-words
          ${isMine
                        ? "bg-white text-black rounded-br-none"
                        : "bg-neutral-800 text-white rounded-bl-none"
                    }`}
            >
                {message}
            </div>
        </div>
    );
}
