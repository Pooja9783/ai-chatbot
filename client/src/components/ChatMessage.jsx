import ReactMarkdown from "react-markdown";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-5 py-4 rounded-2xl ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-md"
            : "bg-slate-800 text-slate-200 rounded-bl-md"
        }`}
      >
        <p className="text-xs text-slate-400 mb-2">
          {isUser ? "You" : "AI Assistant"}
        </p>
        <div className="leading-7 prose prose-invert max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}