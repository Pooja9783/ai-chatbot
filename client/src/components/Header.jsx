export default function Header() {
  return (
    <div className="text-center pt-10 pb-6">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400/20 mb-4">
        ✨
      </div>
      <h1 className="text-3xl md:text-4xl font-bold">
        AI Knowledge Assistant
      </h1>
      <p className="text-slate-400 mt-2">
        Ask questions, learn concepts, and explore ideas with AI.
      </p>
    </div>
  );
}