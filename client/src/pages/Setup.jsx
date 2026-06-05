// Setup page — lets the user choose their target language, native language, and level before starting a chat session.
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LANGUAGES = ["Spanish", "French", "Japanese", "Hindi", "German", "Mandarin"];
const NATIVE_LANGUAGES = ["English", "Hindi", "Telugu"];
const LEVELS = [
  { value: "A1", label: "A1 — Beginner" },
  { value: "A2", label: "A2 — Elementary" },
  { value: "B1", label: "B1 — Intermediate" },
  { value: "B2", label: "B2 — Upper-Intermediate" },
  { value: "C1", label: "C1 — Advanced" },
];

export default function Setup() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    targetLanguage: "Spanish",
    nativeLanguage: "English",
    level: "B1",
  });

  function handleChange(e) {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleStart() {
    // Pass settings to the chat page via router state
    navigate("/chat", { state: { settings } });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌍</div>
          <h1 className="text-3xl font-bold text-gray-800">lang-ai</h1>
          <p className="text-gray-500 mt-2">Your AI language learning partner</p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Target language */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              I want to learn
            </label>
            <select
              name="targetLanguage"
              value={settings.targetLanguage}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Native language */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              My native language is
            </label>
            <select
              name="nativeLanguage"
              value={settings.nativeLanguage}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              {NATIVE_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              My current level
            </label>
            <select
              name="level"
              value={settings.level}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              {LEVELS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* CTA */}
          <button
            onClick={handleStart}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
          >
            Start Practicing →
          </button>
        </div>
      </div>
    </div>
  );
}
