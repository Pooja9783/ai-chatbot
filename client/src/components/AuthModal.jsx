// src/components/AuthModal.jsx

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSwitchTab = (toLogin) => {
    setError("");
    setSuccessMsg("");
    setIsLogin(toLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (isLogin) {
        // Logging in triggers state change in AuthContext -> loads Chatbot
        await login(email, password);
      } else {
        // Register user -> show success banner & switch to login view
        await register(name, email, password);
        setSuccessMsg("Account created successfully! Please sign in.");
        setIsLogin(true);
        setPassword(""); // clear password for login step
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Glassmorphic Container */}
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative z-10">
        
        {/* Brand Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25 mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isLogin ? "Welcome Back" : "Join the Platform"}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isLogin
              ? "Sign in to access your AI Chatbot"
              : "Create an account to get started"}
          </p>
        </div>

        {/* Sliding Tab Control */}
        <div className="relative flex bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800/60 mb-6">
          <div
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-indigo-600 rounded-xl transition-all duration-300 ease-in-out shadow-md ${
              isLogin ? "left-1.5" : "left-[calc(50%+3px)]"
            }`}
          />
          <button
            type="button"
            onClick={() => handleSwitchTab(true)}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl relative z-10 transition-colors ${
              isLogin ? "text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleSwitchTab(false)}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl relative z-10 transition-colors ${
              !isLogin ? "text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Register
          </button>
        </div>

        {/* Dynamic Success Banner */}
        {successMsg && (
          <div className="mb-5 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs text-center font-medium">
            {successMsg}
          </div>
        )}

        {/* Dynamic Error Banner */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300 ml-1">
                Username
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required={!isLogin}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300 ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@company.com"
              required
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300 ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white font-medium text-sm py-3 rounded-xl transition shadow-lg shadow-indigo-600/25 mt-2 flex items-center justify-center gap-2"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

      </div>
    </div>
  );
}