// Encapsulates MediaRecorder logic for capturing microphone audio in the browser.
import { useState, useRef } from "react";

export function useVoice() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.start();
      setIsRecording(true);
      console.log("[useVoice] Recording started");
    } catch (err) {
      console.error("[useVoice] Microphone permission denied or unavailable:", err.message);
      alert("Microphone access denied. Please allow microphone permissions in your browser.");
    }
  }

  function stopRecording() {
    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder) return resolve(null);

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        console.log("[useVoice] Recording stopped, blob size:", blob.size);
        // Stop all tracks to release the mic indicator in the browser
        recorder.stream.getTracks().forEach((t) => t.stop());
        setIsRecording(false);
        resolve(blob);
      };

      recorder.stop();
    });
  }

  return { isRecording, startRecording, stopRecording };
}
