import { useState } from "react";

export default function ChatInput({ onSendMessage, loading }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || loading) return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 bg-slate-950 py-5">
      <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a software engineering question..."
          className="flex-1 bg-transparent outline-none px-4 py-3 text-white placeholder:text-slate-500"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 transition px-6 py-3 rounded-xl font-medium"
        >
          Ask
        </button>
      </div>
    </div>
  );
}