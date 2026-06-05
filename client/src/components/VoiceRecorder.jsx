// Mic button that toggles voice recording. On stop, sends audio to Whisper and returns the transcript.
import { useVoice } from "../hooks/useVoice";
import { transcribeAudio } from "../utils/api";

export default function VoiceRecorder({ onTranscript, disabled }) {
  const { isRecording, startRecording, stopRecording } = useVoice();

  async function handleToggle() {
    if (isRecording) {
      const blob = await stopRecording();
      if (!blob) return;
      try {
        const { transcript } = await transcribeAudio(blob);
        console.log("[VoiceRecorder] Transcript:", transcript);
        if (transcript) onTranscript(transcript);
      } catch (err) {
        console.error("[VoiceRecorder] Transcription failed:", err.message);
        alert("Transcription failed. Check your API key and network connection.");
      }
    } else {
      await startRecording();
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      title={isRecording ? "Stop recording" : "Start voice input"}
      className={`p-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:opacity-50 ${
        isRecording
          ? "bg-red-500 hover:bg-red-600 animate-pulse text-white"
          : "bg-gray-100 hover:bg-gray-200 text-gray-600"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
        <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
      </svg>
    </button>
  );
}
