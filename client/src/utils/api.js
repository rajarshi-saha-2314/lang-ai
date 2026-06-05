// Axios instance and API helpers for communicating with the lang-ai backend.
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

/**
 * Send a chat message to the AI tutor.
 * @param {string} message - The user's latest message.
 * @param {Array} history - Prior conversation turns [{ role, content }].
 * @param {Object} settings - { targetLanguage, nativeLanguage, level }
 * @returns {Promise<{ reply, corrections, new_vocab }>}
 */
export async function sendMessage(message, history, settings) {
  console.log("[api] sendMessage →", message);
  const { data } = await api.post("/api/chat", {
    message,
    history,
    targetLanguage: settings.targetLanguage,
    nativeLanguage: settings.nativeLanguage,
    level: settings.level,
  });
  return data;
}

/**
 * Transcribe an audio Blob using Whisper via the backend.
 * @param {Blob} audioBlob - The recorded audio.
 * @returns {Promise<{ transcript: string }>}
 */
export async function transcribeAudio(audioBlob) {
  console.log("[api] transcribeAudio — blob size:", audioBlob.size);
  const formData = new FormData();
  formData.append("audio", audioBlob, "audio.webm");
  const { data } = await api.post("/api/transcribe", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export default api;
