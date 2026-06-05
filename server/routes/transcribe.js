// Handles POST /api/transcribe — receives an audio file and returns a Whisper transcript via Groq.
import { Router } from "express";
import multer from "multer";
import Groq from "groq-sdk";
import { Readable } from "stream";

const router = Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Store upload in memory (buffer) — no disk writes needed
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("audio"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No audio file provided. Send it as multipart/form-data with field name 'audio'." });
  }

  console.log(`[transcribe] Received audio: ${req.file.originalname}, size: ${req.file.size} bytes`);

  try {
    // Groq Whisper requires a File-like object — wrap the buffer in a Readable with a name/path property
    const audioStream = Readable.from(req.file.buffer);
    audioStream.path = req.file.originalname || "audio.webm";

    const transcription = await groq.audio.transcriptions.create({
      model: "whisper-large-v3",
      file: audioStream,
    });

    console.log("[transcribe] Transcript:", transcription.text);
    return res.json({ transcript: transcription.text });
  } catch (err) {
    console.error("[transcribe] Error calling Groq Whisper:", err.message);
    return res.status(500).json({ error: "Transcription failed. Please try again." });
  }
});

export default router;
