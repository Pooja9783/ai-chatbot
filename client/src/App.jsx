// src/App.jsx
import { useAuth } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";
import Header from "./components/Header";
import PresetQuestions from "./components/PresetQuestions";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import { useState } from "react";

const PRESET_QUESTIONS = [
  "Explain React hooks",
  "What is RAG?",
  "How does Node.js event loop work?",
  "Explain system design basics",
];

function MainChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const { logout, user } = useAuth();

  const sendMessage = async (textToSend) => {
    if (!textToSend.trim() || loading) return;

    const updatedMessages = [
      ...messages,
      { role: "user", content: textToSend },
    ];

    setMessages(updatedMessages);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          conversationId: activeConversationId,
          messages: updatedMessages,
        }),
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data = await response.json();
      if (data.conversationId) setActiveConversationId(data.conversationId);

      setMessages([...updatedMessages, { role: "assistant", content: data.message }]);
    } catch (err) {
      console.error("Chat API Error:", err);
      setMessages(messages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <div className="max-w-4xl mx-auto min-h-screen flex flex-col px-4">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center pt-6 px-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-400">
              <strong className="text-slate-200">{user?.username || user?.email}</strong>
            </span>
          </div>
          <button
            onClick={logout}
            className="text-xs bg-slate-900 border border-slate-800 hover:border-red-500/40 hover:text-red-400 px-3.5 py-1.5 rounded-xl transition-all"
          >
            Sign Out
          </button>
        </div>

        <Header />

        <div className="flex-1 overflow-y-auto py-6">
          {messages.length === 0 ? (
            <PresetQuestions
              questions={PRESET_QUESTIONS}
              onSelectQuestion={sendMessage}
            />
          ) : (
            <div className="space-y-6">
              {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
              ))}
            </div>
          )}

          {loading && (
            <div className="flex justify-start my-6">
              <div className="bg-slate-900 px-5 py-4 rounded-2xl border border-slate-800">
                <p className="text-slate-400 animate-pulse text-sm">
                  AI Assistant is thinking...
                </p>
              </div>
            </div>
          )}
        </div>

        <ChatInput onSendMessage={sendMessage} loading={loading} />
      </div>
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-3">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs tracking-wide">Loading workspace...</span>
      </div>
    );
  }

  return !user ? <AuthModal /> : <MainChat />;
}