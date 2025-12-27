"use client";

// Login Page with NextAuth
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // Redirect to intended page or home
      const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/";
      sessionStorage.removeItem("redirectAfterLogin");
      router.push(redirectPath);
      router.refresh();
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await signIn("google", {
        callbackUrl: sessionStorage.getItem("redirectAfterLogin") || "/",
      });
    } catch (err) {
      setError("Google login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl opacity-50 animate-pulse delay-1000"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-4 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 mx-auto group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">
              Welcome Back
            </h1>
          </Link>
          <p className="text-gray-500">Sign in to manage your care services</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-4xl p-8 shadow-2xl shadow-indigo-100 border border-white">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="input input-bordered w-full bg-white"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="input input-bordered w-full bg-white"
              />
              {password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[2.7rem] text-gray-400 hover:text-indigo-600 transition-colors p-1"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              )}
            </div>

            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-lg btn-primary w-full shadow-lg shadow-indigo-200 text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Or continue with
            </span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <button
            type="button"
            className="btn btn-lg w-full bg-white text-gray-700 hover:bg-gray-50 border-gray-200 flex items-center justify-center gap-3"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FcGoogle size={22} />
            <span className="font-semibold">Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-indigo-600 font-bold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
