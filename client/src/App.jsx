// src/App.jsx
import { useAuth } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";
import MainChat from "./components/MainChat"



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