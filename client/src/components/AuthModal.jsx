import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthModal() {
  const navigate = useNavigate();

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
        await login(email, password);

        navigate("/chat");

      } else {
        await register(name, email, password);

        setSuccessMsg("Account created successfully. Please sign in.");
        setIsLogin(true);
        setPassword("");
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white flex">

      {/* Left Side */}
      <section className="hidden lg:flex lg:w-[52%] bg-[#151516] border-r border-[#29292B] p-12 flex-col justify-between">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F97360] flex items-center justify-center">
            <span className="text-[#171717] font-bold">AI</span>
          </div>

          <div>
            <p className="text-white font-semibold">
              AI Learning Assistant
            </p>

            <p className="text-xs text-[#77777C] mt-0.5">
              Software Engineering
            </p>
          </div>
        </div>


        {/* Main Content */}
        <div className="max-w-lg">

          <h1 className="text-5xl xl:text-6xl font-semibold leading-tight tracking-tight text-white">
            Software Engineering
            <br />

            <span className="text-[#F97360]">
              Focused Assistant
            </span>
          </h1>

          <p className="mt-7 text-lg leading-relaxed text-[#96969C] max-w-md">
            A practical assistant for learning,
            problem-solving, and building software.
          </p>

        </div>


        {/* Bottom */}
        <div>
          <div className="w-10 h-px bg-[#F97360] mb-4" />

          <p className="text-xs text-[#5F5F64]">
            Learn • Practice • Build
          </p>
        </div>

      </section>
      {/* Right Side */}
      <section className="flex-1 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-[400px]">

          {/* Mobile Brand */}
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-[#F97360] flex items-center justify-center">
              <span className="text-[#171717] font-bold">AI</span>
            </div>

            <span className="font-semibold">
              AI Learning Assistant
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold tracking-tight">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>

            <p className="text-sm text-[#85858B] mt-2">
              {isLogin
                ? "Continue your engineering journey."
                : "Start building your engineering skills."}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-7 border-b border-[#29292B] mb-8">
            <button
              type="button"
              onClick={() => handleSwitchTab(true)}
              className={`pb-3 text-sm font-medium transition ${isLogin
                ? "text-white border-b-2 border-[#F97360]"
                : "text-[#66666B] hover:text-white"
                }`}
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={() => handleSwitchTab(false)}
              className={`pb-3 text-sm font-medium transition ${!isLogin
                ? "text-white border-b-2 border-[#F97360]"
                : "text-[#66666B] hover:text-white"
                }`}
            >
              Register
            </button>
          </div>

          {/* Messages */}
          {successMsg && (
            <div className="mb-5 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm">
              {successMsg}
            </div>
          )}

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {!isLogin && (
              <div>
                <label className="block text-sm text-[#D4D4D8] mb-2">
                  Username
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full bg-[#151516] border border-[#303033] rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#55555A] outline-none focus:border-[#F97360] transition"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-[#D4D4D8] mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-[#151516] border border-[#303033] rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#55555A] outline-none focus:border-[#F97360] transition"
              />
            </div>

            <div>
              <label className="block text-sm text-[#D4D4D8] mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full bg-[#151516] border border-[#303033] rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#55555A] outline-none focus:border-[#F97360] transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F97360] hover:bg-[#FB806E] disabled:bg-[#303033] disabled:text-[#66666B] text-[#171717] font-semibold py-3 rounded-lg transition"
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Sign In"
                  : "Create Account"}
            </button>

          </form>

          <p className="text-xs text-[#5F5F64] text-center mt-8">
            Your conversations and learning progress are saved to your account.
          </p>

        </div>
      </section>
    </div>
  );
}