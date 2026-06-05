// Collapsible vocabulary panel — shows all unique words the AI has introduced during the session.
import { useState } from "react";

export default function VocabPanel({ vocab }) {
  const [isOpen, setIsOpen] = useState(true);

  if (vocab.length === 0) return null;

  return (
    <div className="bg-white border-t border-gray-200 shadow-inner">
      {/* Toggle bar */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <span>📚 {vocab.length} word{vocab.length !== 1 ? "s" : ""} learned today</span>
        <span className="text-gray-400">{isOpen ? "▾" : "▴"}</span>
      </button>

      {/* Word pills */}
      {isOpen && (
        <div className="flex flex-wrap gap-2 px-4 pb-3 pt-1">
          {vocab.map((word, i) => (
            <span
              key={i}
              className="bg-teal-50 text-teal-700 border border-teal-200 text-xs font-medium px-3 py-1 rounded-full"
            >
              {word}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
