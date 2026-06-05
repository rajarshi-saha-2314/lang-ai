# lang-ai

A conversational AI language learning partner built with React, Node.js, OpenAI, and Supabase.

## Features

- Chat with an AI tutor in Spanish, French, Japanese, Hindi, German, or Mandarin
- Inline grammar corrections explained in your native language
- Voice input via microphone (OpenAI Whisper transcription)
- AI responses read aloud via browser TTS
- Vocabulary tracker across each session
- Email auth via Supabase

## Tech Stack

| Layer    | Technology                         |
|----------|------------------------------------|
| Frontend | React (Vite) + TailwindCSS         |
| Backend  | Node.js + Express                  |
| AI       | OpenAI GPT-4o + Whisper            |
| Database | Supabase (PostgreSQL + Auth)       |

## Getting Started

### 1. Clone and install

```bash
# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 2. Set up environment variables

```bash
# Server
cp server/.env.example server/.env
# Fill in OPENAI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY

# Client
cp client/.env.example client/.env
# Fill in VITE_API_URL
```

### 3. Run locally

```bash
# Terminal 1 — start backend
cd server && npm run dev

# Terminal 2 — start frontend
cd client && npm run dev
```

Server runs on `http://localhost:5000`, client on `http://localhost:5173`.

## Project Structure

```
lang-ai/
├── client/          # React + Vite frontend
└── server/          # Express backend
```

## Deploy

- Frontend → Vercel
- Backend → Railway
