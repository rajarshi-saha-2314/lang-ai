# 🌍 lang-ai — AI Language Learning Partner

<div align="center">

**A full-stack conversational AI app that helps you learn a new language through real-time chat, voice input, grammar corrections, and vocabulary tracking.**

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-lang--ai--weld.vercel.app-6d28d9?style=for-the-badge)](https://lang-ai-weld.vercel.app)
[![Backend](https://img.shields.io/badge/🛠%20Backend-lang--ai.onrender.com-10b981?style=for-the-badge)](https://lang-ai.onrender.com/api/health)
[![GitHub](https://img.shields.io/badge/GitHub-rajarshi--saha--2314-181717?style=for-the-badge&logo=github)](https://github.com/rajarshi-saha-2314/lang-ai)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗣️ **Conversational AI Tutor** | Chat with a Groq-powered AI tutor in your target language at your CEFR level |
| ✏️ **Inline Grammar Corrections** | Mistakes are caught and explained in your native language instantly |
| 🎙️ **Voice Input** | Speak instead of type — audio is transcribed via Whisper |
| 📚 **Vocabulary Tracker** | New words introduced by the AI are collected into a session vocab panel |
| 🌐 **6 Languages** | Spanish, French, Japanese, Hindi, German, Mandarin |
| 📊 **5 CEFR Levels** | From A1 Beginner to C1 Advanced |

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React 19** + **Vite** — fast dev experience and optimized builds
- 🎨 **Tailwind CSS v4** — utility-first styling
- 🔀 **React Router v7** — client-side routing

### Backend
- 🟢 **Node.js** + **Express** — REST API server
- 🤖 **Groq API** — `llama-3.3-70b-versatile` for chat, `whisper-large-v3` for transcription
- 🔐 **Supabase** — PostgreSQL database + JWT auth
- 📦 **Multer** — in-memory audio file handling

### Deployment
- 🔺 **Vercel** — frontend hosting with automatic GitHub deploys
- 🟣 **Render** — backend hosting

---

## 🏗️ Project Structure

```
lang-ai/
│
├── client/                          # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx       # Message list, input bar, send button
│   │   │   ├── MessageBubble.jsx    # Individual message with corrections & vocab badges
│   │   │   ├── VoiceRecorder.jsx    # Mic toggle button, calls Whisper on stop
│   │   │   └── VocabPanel.jsx       # Collapsible session vocabulary drawer
│   │   ├── pages/
│   │   │   ├── Setup.jsx            # Language & level picker
│   │   │   └── Chat.jsx             # Main chat session page
│   │   ├── hooks/
│   │   │   └── useVoice.js          # MediaRecorder logic
│   │   └── utils/
│   │       └── api.js               # Axios client — sendMessage, transcribeAudio
│   └── package.json
│
└── server/                          # Express backend
    ├── routes/
    │   ├── chat.js                  # POST /api/chat → Groq llama-3.3-70b
    │   └── transcribe.js            # POST /api/transcribe → Groq Whisper
    ├── middleware/
    │   └── auth.js                  # Optional Supabase JWT verification
    ├── lib/
    │   └── supabase.js              # Supabase client init
    └── index.js                     # Express app entry point
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- A [Groq API key](https://console.groq.com) (free tier available)
- A [Supabase](https://supabase.com) project (free tier available)

### 1. Clone the repo

```bash
git clone https://github.com/rajarshi-saha-2314/lang-ai.git
cd lang-ai
```

### 2. Install dependencies

```bash
# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 3. Set up environment variables

Create `server/.env`:
```env
GROQ_API_KEY=your_groq_api_key_here
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_SERVICE_KEY=your_supabase_service_role_key_here
PORT=5000
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Run the app

```bash
# Terminal 1 — start backend (http://localhost:5000)
cd server && npm run dev

# Terminal 2 — start frontend (http://localhost:5173)
cd client && npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/chat` | Send message, get AI reply + corrections + vocab |
| `POST` | `/api/transcribe` | Upload audio blob, get Whisper transcript |

### Example `/api/chat` request

```json
POST /api/chat
{
  "message": "Yo quiero aprender español",
  "targetLanguage": "Spanish",
  "nativeLanguage": "English",
  "level": "B1",
  "history": []
}
```

### Example response

```json
{
  "reply": "¡Qué bueno! ¿Cuánto tiempo llevas estudiando español?",
  "corrections": [
    {
      "original": "Yo quiero aprender español",
      "corrected": "Quiero aprender español",
      "explanation": "In Spanish, subject pronouns like 'Yo' are usually dropped — the verb ending already implies the subject."
    }
  ],
  "new_vocab": ["llevas", "estudiando"]
}
```

---

## 🌐 Deployment

| Service | URL |
|---|---|
| 🔺 Frontend (Vercel) | [lang-ai-weld.vercel.app](https://lang-ai-weld.vercel.app) |
| 🟣 Backend (Render) | [lang-ai.onrender.com](https://lang-ai.onrender.com/api/health) |

### Deploy your own

**Frontend → Vercel**
1. Import the GitHub repo on [vercel.com](https://vercel.com)
2. Set root directory to `client`
3. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`

**Backend → Render**
1. Create a new Web Service on [render.com](https://render.com)
2. Set root directory to `server`
3. Build command: `npm install` | Start command: `npm start`
4. Add environment variables: `GROQ_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`

---

## 🔮 Roadmap

- [ ] 🔐 Full Supabase email auth (login / signup flow)
- [ ] 💾 Persist vocabulary across sessions in Supabase
- [ ] 🔊 Text-to-speech for AI replies
- [ ] 📈 Progress dashboard with session history
- [ ] 🃏 Flashcard review mode for saved vocab

---

## 👨‍💻 Author

Built by **Rajarshi Saha** as a full-stack placement project.

[![GitHub](https://img.shields.io/badge/GitHub-rajarshi--saha--2314-181717?style=flat&logo=github)](https://github.com/rajarshi-saha-2314)
