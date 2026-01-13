import { useState } from "react";
import { RiEyeLine, RiEyeOffLine, RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { FaDev } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const { baseURL, login } = useApp();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      message.warning("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        message.error(data?.message || "Login failed");
        return;
      }

      if (typeof login === "function")
        login({ user: data.user, token: data.token });
      message.success("Login successful");

      // Navigate based on role
      if (data?.user?.role === "admin") navigate("/admin");
      else navigate("/login"); // Redirect regular users to Home, not unauthorized
    } catch (error) {
      message.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="text-center mb-8">
        <FaDev className="text-indigo-600 dark:text-indigo-500 text-[50px] mx-auto mb-4" />
        {/* Fixed: text-gray-900 for light mode so it's visible */}
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Join the DEV community
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          A community of 3,635,533 amazing developers
        </p>
      </div>

      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 border border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Email address
            </label>
            <div className="relative">
              <MdOutlineAlternateEmail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <RiLockPasswordFill className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-11 pr-12 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-indigo-500 transition-colors"
              >
                {showPassword ? (
                  <RiEyeOffLine size={20} />
                ) : (
                  <RiEyeLine size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-bold flex cursor-pointer items-center justify-center gap-3 shadow-md transition-all active:scale-[0.98] ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 dark:hover:shadow-none"
            }`}
          >
            {loading ? (
              <>
                <Spin size="small" />
                <span className="tracking-wide">Logging in...</span>
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
            <span>Admin Control Panel</span>
            <span>•</span>
            <span>Secure Access</span>
          </div>
          <p className="mt-4 text-center text-xs text-gray-400 italic">
            Default credentials: min 6 characters required.
          </p>
        </div>
      </div>
    </div>
  );
}
