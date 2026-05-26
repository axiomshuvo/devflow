"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MdBarChart,
  MdEmail,
  MdGroup,
  MdLock,
  MdSecurity,
  MdVisibilityOff,
} from "react-icons/md";

const features = [
  {
    icon: MdGroup,
    title: "Team Collaboration",
    description: "Work together seamlessly with your team.",
  },
  {
    icon: MdBarChart,
    title: "Powerful Analytics",
    description: "Get insights that help you deliver more.",
  },
  {
    icon: MdSecurity,
    title: "Secure & Reliable",
    description: "Enterprise-grade security for your data.",
  },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Phase 4: wire to Better Auth
  };

  return (
    <div className="w-full max-w-[1060px] bg-white rounded-2xl shadow-xl overflow-hidden flex min-h-[680px]">
      {/* ── Left panel ─────────────────────────────────────────────────── */}
      <div
        className="hidden md:flex md:w-[460px] shrink-0 flex-col p-10 relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #1e2a78 0%, #0f172a 100%)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="3" width="6" height="6" rx="1" fill="white" />
              <rect
                x="11"
                y="3"
                width="6"
                height="6"
                rx="1"
                fill="white"
                opacity="0.6"
              />
              <rect
                x="3"
                y="11"
                width="6"
                height="6"
                rx="1"
                fill="white"
                opacity="0.6"
              />
              <path
                d="M13 13 L17 13 M15 11 L15 15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-white text-xl font-bold">DevFlow</span>
        </div>

        {/* Headline */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white leading-tight mb-4">
            Track. Manage.
            <br />
            <span className="text-blue-400">Deliver.</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            DevFlow helps teams plan, track, and ship better software together.
            All your issues, projects and team collaboration in one place.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-5 mb-8">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/30 flex items-center justify-center shrink-0">
                <Icon className="text-blue-400 text-lg" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">
                  {title}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mock UI screenshot */}
        <div className="mt-auto">
          <div className="bg-[#1e2d5a] rounded-xl p-4 shadow-2xl border border-white/10">
            <div className="flex gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#253166] rounded-lg p-3">
                <p className="text-blue-300 text-[10px] font-semibold mb-2">
                  In Progress
                </p>
                <div className="space-y-1.5">
                  {[40, 70, 55].map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${["bg-blue-400", "bg-amber-400", "bg-green-400"][i]}`}
                      />
                      <div
                        className="h-1.5 bg-slate-600 rounded-full"
                        style={{ width: `${w}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#253166] rounded-lg p-3">
                <p className="text-emerald-300 text-[10px] font-semibold mb-2">
                  Done
                </p>
                <div className="space-y-1.5">
                  {[80, 60].map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <div
                        className="h-1.5 bg-slate-600 rounded-full"
                        style={{ width: `${w}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Mini chart */}
            <div className="mt-3 bg-white rounded-lg p-3 shadow-sm relative overflow-hidden">
              <svg viewBox="0 0 120 40" className="w-full h-8">
                <polyline
                  points="0,35 20,28 40,30 60,18 80,22 100,12 120,15"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex justify-between mt-1">
                {["M", "T", "W", "T", "F"].map((d) => (
                  <span key={d} className="text-gray-400 text-[8px]">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel ────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col px-10 py-8">
        {/* Top link */}
        <div className="flex justify-end mb-8">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Form area */}
        <div className="flex-1 flex flex-col justify-center max-w-[400px] w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome back! 👋
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Login to your DevFlow account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-11 pl-10 pr-4 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-11 pl-10 pr-12 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                >
                  {showPassword ? (
                    <MdVisibilityOff className="text-lg" />
                  ) : (
                    <span className="text-xs font-medium">show</span>
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 accent-blue-600"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="h-11 flex items-center justify-center gap-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              {/* Google icon */}
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                  fill="#34A853"
                />
                <path
                  d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
            <button
              type="button"
              className="h-11 flex items-center justify-center gap-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              {/* GitHub icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          © 2024 DevFlow. All rights reserved.
        </p>
      </div>
    </div>
  );
}
