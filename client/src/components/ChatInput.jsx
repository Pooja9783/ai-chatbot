import { useState } from "react";
import { ArrowUp } from "lucide-react";

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
    <div className="sticky bottom-0 bg-[#0F0F10] py-5">
      <div className="flex items-center gap-3 bg-[#151516] border border-[#303033] rounded-xl p-2 transition focus-within:border-[#F97360]">

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a software engineering question..."
          className="flex-1 bg-transparent outline-none px-4 py-3 text-sm text-white placeholder:text-[#66666B]"
        />

        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="w-10 h-10 flex items-center justify-center bg-[#F97360] hover:bg-[#FB806E] disabled:bg-[#303033] disabled:text-[#66666B] text-[#171717] rounded-lg transition"
          aria-label="Send message"
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </button>

      </div>

      <p className="text-center text-[11px] text-[#55555A] mt-2">
        Press Enter to send
      </p>
    </div>
  );
}