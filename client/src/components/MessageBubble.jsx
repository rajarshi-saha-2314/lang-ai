// Renders a single chat message — user messages on the right (purple), AI messages on the left (white).
// Shows correction cards and new vocabulary badges when present.
export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-4`}>
      {/* Bubble */}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-violet-600 text-white rounded-br-sm"
            : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
        }`}
      >
        {message.content}
      </div>

      {/* Corrections */}
      {message.corrections && message.corrections.length > 0 && (
        <div className="mt-2 max-w-[75%] bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-sm space-y-1.5">
          <p className="font-semibold text-yellow-800 text-xs uppercase tracking-wide mb-2">
            Corrections
          </p>
          {message.corrections.map((c, i) => (
            <p key={i} className="text-gray-700">
              ✏️ <span className="line-through text-red-500">{c.original}</span>{" "}
              → <span className="text-green-700 font-medium">{c.corrected}</span>
              {c.explanation && (
                <span className="text-gray-500"> — {c.explanation}</span>
              )}
            </p>
          ))}
        </div>
      )}

      {/* New vocabulary badges */}
      {message.new_vocab && message.new_vocab.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5 max-w-[75%]">
          {message.new_vocab.map((word, i) => (
            <span
              key={i}
              className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full border border-teal-200"
            >
              {word}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
