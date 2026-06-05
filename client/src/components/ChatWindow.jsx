// Main chat interface — renders the message list, typing indicator, text input, and voice recorder button.
import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import VoiceRecorder from "./VoiceRecorder";
import { sendMessage } from "../utils/api";

export default function ChatWindow({ messages, onNewMessage, settings, isLoading, setIsLoading }) {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSend(text) {
    const trimmed = (text || input).trim();
    if (!trimmed || isLoading) return;

    setInput("");

    // Build the history array from existing messages (exclude the initial AI welcome if needed)
    const history = messages.map((m) => ({ role: m.role, content: m.content }));

    // Optimistically add user message
    onNewMessage({ role: "user", content: trimmed });
    setIsLoading(true);

    try {
      const data = await sendMessage(trimmed, history, settings);
      onNewMessage({
        role: "assistant",
        content: data.reply,
        corrections: data.corrections || [],
        new_vocab: data.new_vocab || [],
      });
    } catch (err) {
      console.error("[ChatWindow] sendMessage error:", err.message);
      onNewMessage({
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
        corrections: [],
        new_vocab: [],
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleTranscript(text) {
    // Put transcript into the input field so user can review before sending
    setInput(text);
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-start mb-4">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center h-4">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="border-t border-gray-200 bg-white px-4 py-3 flex items-center gap-2">
        <VoiceRecorder onTranscript={handleTranscript} disabled={isLoading} />

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Type in ${settings?.targetLanguage || "the target language"}…`}
          disabled={isLoading}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:bg-gray-50"
        />

        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 text-white rounded-full px-4 py-2 text-sm font-semibold transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
