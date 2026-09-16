export default function PresetQuestions({ questions, onSelectQuestion }) {
  return (
    <div>
      <p className="text-sm text-[#85858B] mb-4">
        Try asking
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.map((question) => (
          <button
            key={question}
            onClick={() => onSelectQuestion(question)}
            className="
              text-left
              bg-[#151516]
              border border-[#29292B]
              hover:border-[#F97360]
              hover:bg-[#1A1A1C]
              transition
              rounded-xl
              p-4
              group
            "
          >
            <p className="font-medium text-[#D4D4D8] group-hover:text-white transition">
              {question}
            </p>

            <p className="text-xs text-[#5F5F64] mt-2">
              Click to ask
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}