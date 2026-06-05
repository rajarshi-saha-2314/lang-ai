// Chat page — owns all session state (messages, vocab, settings) and composes ChatWindow + VocabPanel.
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import VocabPanel from "../components/VocabPanel";
import { sendMessage } from "../utils/api";

export default function Chat() {
  const location = useLocation();
  const navigate = useNavigate();

  // Fall back to defaults if navigated here directly (e.g. during development)
  const settings = location.state?.settings || {
    targetLanguage: "Spanish",
    nativeLanguage: "English",
    level: "B1",
  };

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [vocab, setVocab] = useState([]);

  // On mount: fetch an initial greeting from the AI tutor
  useEffect(() => {
    async function fetchWelcome() {
      setIsLoading(true);
      try {
        const data = await sendMessage(
          `Introduce yourself briefly as my ${settings.targetLanguage} tutor and say something welcoming in ${settings.targetLanguage}. Keep it short and appropriate for a ${settings.level} learner.`,
          [],
          settings
        );
        setMessages([
          {
            role: "assistant",
            content: data.reply,
            corrections: [],
            new_vocab: data.new_vocab || [],
          },
        ]);
        if (data.new_vocab?.length) {
          setVocab((prev) => [...new Set([...prev, ...data.new_vocab])]);
        }
      } catch (err) {
        console.error("[Chat] Welcome message failed:", err.message);
        setMessages([
          {
            role: "assistant",
            content: `¡Hola! I'm your ${settings.targetLanguage} tutor. Let's start practicing!`,
            corrections: [],
            new_vocab: [],
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWelcome();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleNewMessage(msg) {
    setMessages((prev) => [...prev, msg]);

    // Accumulate new vocab across the session (deduplicate)
    if (msg.new_vocab?.length) {
      setVocab((prev) => [...new Set([...prev, ...msg.new_vocab])]);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <button
          onClick={() => navigate("/")}
          className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
        >
          ← Back
        </button>
        <div className="text-center">
          <h1 className="font-bold text-gray-800 text-sm">
            {settings.targetLanguage} Practice
          </h1>
          <p className="text-xs text-gray-400">
            {settings.level} · Native: {settings.nativeLanguage}
          </p>
        </div>
        <div className="w-10" /> {/* spacer to centre the title */}
      </header>

      {/* Chat area */}
      <div className="flex-1 flex flex-col max-w-2xl w-full mx-auto overflow-hidden">
        <ChatWindow
          messages={messages}
          onNewMessage={handleNewMessage}
          settings={settings}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>

      {/* Vocab panel sits at the bottom */}
      <div className="max-w-2xl w-full mx-auto">
        <VocabPanel vocab={vocab} />
      </div>
    </div>
  );
}
