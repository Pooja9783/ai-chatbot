export default function PresetQuestions({ questions, onSelectQuestion }) {
  return (
    <div>
      <p className="text-sm text-slate-400 mb-4">Try asking</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.map((question) => (
          <button
            key={question}
            onClick={() => onSelectQuestion(question)}
            className="text-left bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-slate-800 transition rounded-xl p-4"
          >
            <p className="font-medium">{question}</p>
            <p className="text-xs text-slate-500 mt-2">Click to ask</p>
          </button>
        ))}
      </div>
    </div>
  );
}