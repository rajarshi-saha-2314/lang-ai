// Handles POST /api/chat — sends user message to Groq (llama-3.3-70b) and returns reply, corrections, and new vocab.
import { Router } from "express";
import Groq from "groq-sdk";

const router = Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/", async (req, res) => {
  const { message, history = [], targetLanguage, nativeLanguage, level } = req.body;

  if (!message || !targetLanguage || !nativeLanguage || !level) {
    return res.status(400).json({ error: "Missing required fields: message, targetLanguage, nativeLanguage, level" });
  }

  console.log(`[chat] User (${level} ${targetLanguage}): "${message}"`);

  const systemPrompt = `You are a friendly and encouraging language tutor helping a student learn ${targetLanguage}.

The student's native language is ${nativeLanguage} and their current level is ${level} (CEFR scale).

Your rules:
1. Always respond conversationally in ${targetLanguage}, keeping vocabulary and grammar appropriate for a ${level} learner.
2. If the student made any grammar or vocabulary mistakes in their message, gently correct them. Explain corrections in ${nativeLanguage} so they can understand.
3. If your response naturally introduces 1-3 new useful words the student likely hasn't seen, include them in new_vocab.
4. You MUST return ONLY valid JSON — no markdown fences, no backticks, no extra text before or after.

Return this exact JSON shape:
{
  "reply": "Your response to the student in ${targetLanguage}",
  "corrections": [
    { "original": "the mistake the student made", "corrected": "the correct form", "explanation": "brief explanation in ${nativeLanguage}" }
  ],
  "new_vocab": ["word1", "word2"]
}

If there are no corrections, return an empty array for corrections. If no new vocab, return an empty array for new_vocab.`;

  // Build messages array: system prompt + prior history + current user message
  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: message },
  ];

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const raw = completion.choices[0].message.content;
    console.log("[chat] Raw Groq response:", raw);

    const parsed = JSON.parse(raw);
    return res.json(parsed);
  } catch (err) {
    console.error("[chat] Error calling Groq:", err.message);
    return res.status(500).json({ error: "Failed to get AI response. Please try again." });
  }
});

export default router;
