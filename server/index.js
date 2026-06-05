// Express entry point — mounts all routes and starts the server.
import "dotenv/config";
import express from "express";
import cors from "cors";

import chatRouter from "./routes/chat.js";
import transcribeRouter from "./routes/transcribe.js";
import authMiddleware from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://lang-ai-weld.vercel.app",
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
}));
app.use(express.json());

// Health check — useful for Railway deploys and local testing
app.get("/api/health", (req, res) => {
  console.log("[health] Health check called");
  res.json({ status: "ok" });
});

// Auth middleware is applied per-route (optional for now)
app.use("/api/chat", authMiddleware, chatRouter);
app.use("/api/transcribe", authMiddleware, transcribeRouter);

app.listen(PORT, () => {
  console.log(`[server] lang-ai backend running on http://localhost:${PORT}`);
});
