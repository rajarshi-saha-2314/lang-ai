// Root app component — sets up React Router with Setup and Chat routes.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Setup from "./pages/Setup";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Setup />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
