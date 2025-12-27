"use client";

// Registration Page with NextAuth
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nid: "",
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};
    if (!formData.nid) newErrors.nid = "NID is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.contact) newErrors.contact = "Contact number is required";

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors.join(". ");
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // Create user in database
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nid: formData.nid,
          name: formData.name,
          email: formData.email.toLowerCase(),
          contact: formData.contact,
          password: formData.password,
        }),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        // If response is not JSON (likely an HTML error page), handle gracefully
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server configuration error. Please check logs.");
      }

      if (!response.ok) {
        setErrors({ submit: data?.error || "Registration failed" });
        setLoading(false);
        return;
      }

      // Auto-login after registration
      const result = await signIn("credentials", {
        email: formData.email.toLowerCase(),
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({
          submit: "Account created but login failed. Please try logging in.",
        });
        setLoading(false);
        return;
      }

      // Redirect to intended page or home
      const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/";
      sessionStorage.removeItem("redirectAfterLogin");
      router.push(redirectPath);
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: "Registration failed. Please try again." });
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setErrors({});
    setLoading(true);

    try {
      await signIn("google", {
        callbackUrl: "/register?completeProfile=true",
      });
    } catch (err) {
      setErrors({ submit: "Google signup failed. Please try again." });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-[100px] opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-200/40 rounded-full blur-[100px] opacity-50 animate-pulse delay-700"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-4 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 mx-auto group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">
              Create Account
            </h1>
          </Link>
          <p className="text-gray-500">
            Join thousands of families trusting us
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-4xl p-8 shadow-2xl shadow-indigo-100 border border-white">
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                NID Number <span className="text-red-500">*</span>
              </label>
              <input
                name="nid"
                value={formData.nid}
                onChange={handleChange}
                required
                placeholder="123 456 7890"
                className="input input-bordered w-full bg-white"
              />
              {errors.nid && (
                <p className="mt-1.5 ml-1 text-sm text-red-500 font-medium">
                  {errors.nid}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="input input-bordered w-full bg-white"
              />
              {errors.name && (
                <p className="mt-1.5 ml-1 text-sm text-red-500 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="input input-bordered w-full bg-white"
              />
              {errors.email && (
                <p className="mt-1.5 ml-1 text-sm text-red-500 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="+880 1XXX-XXXXXX"
                className="input input-bordered w-full bg-white"
              />
              {errors.contact && (
                <p className="mt-1.5 ml-1 text-sm text-red-500 font-medium">
                  {errors.contact}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="input input-bordered w-full bg-white"
              />
              {formData.password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[2.7rem] text-gray-400 hover:text-indigo-600 transition-colors p-1"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              )}
              {errors.password && (
                <p className="mt-1.5 ml-1 text-sm text-red-500 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Password Requirement Hint */}
            <div className="text-xs text-gray-400 ml-1 font-medium">
              Must have 6+ chars, 1 uppercase & 1 lowercase.
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="input input-bordered w-full bg-white"
              />
              {errors.confirmPassword && (
                <p className="mt-1.5 ml-1 text-sm text-red-500 font-medium">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-lg btn-primary w-full shadow-lg shadow-indigo-200 mt-4 text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Or
            </span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <button
            type="button"
            className="btn btn-lg w-full bg-white text-gray-700 hover:bg-gray-50 border-gray-200 flex items-center justify-center gap-3"
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            <FcGoogle size={22} />
            <span className="font-semibold">Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-600 font-bold hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
