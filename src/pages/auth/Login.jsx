import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import {
  FaApple,
  FaDev,
  FaFacebookF,
  FaFonticons,
  FaGithub,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import Header from "@/components/Header";
import DevAppsSidebar from "@/components/DevAppsSidebar";

export default function Login() {
  const navigate = useNavigate();
  const { baseURL, login } = useApp();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        message.error(data?.message || "Login failed");
        return;
      }

      // Save auth data via context helper
      if (typeof login === "function")
        login({ user: data.user, token: data.token });

      message.success("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      message.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Social buttons array
  const socialButtons = [
    {
      text: "Continue with Apple",
      icon: <FaApple size={20} />,
      extraPadding: true,
    },
    { text: "Continue with Facebook", icon: <FaFacebookF size={20} /> },
    { text: "Continue with Forem", icon: <FaFonticons size={20} /> },
    { text: "Continue with Github", icon: <FaGithub size={20} /> },
    { text: "Continue with Google", icon: <FaGoogle size={20} /> },
    { text: "Continue with Twitter (X)", icon: <FaTwitter size={20} /> },
  ];

  return (
    <div className="bg-[white]">
      <Header />
      <DevAppsSidebar />
      <div className="bg-white p-8 rounded-sm border border-gray-200 max-w-[1280px] mx-auto shadow-xs">
        <div className="max-w-3xl mx-auto space-y-5">
          {/* Logo */}
          <FaDev className="text-black text-[42px] cursor-pointer flex items-center justify-center mx-auto" />
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center mb-1">
            Join the DEV community
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            DEV Community is a community of 3,635,533 amazing developers
          </p>

          {/* Social Buttons */}
          <div className="space-y-4">
            {socialButtons.map((btn, idx) => (
              <button
                key={idx}
                className="relative w-full flex items-center justify-center gap-2 border border-gray-400 py-4 rounded-sm hover:bg-gray-100 cursor-pointer"
              >
                {/* Icon at the far left */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  {btn.icon}
                </div>

                {/* Text centered */}
                <span className="w-full text-center">{btn.text}</span>
              </button>
            ))}
          </div>

          <p className="text-center my-4 text-gray-500 underline">OR</p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <MdOutlineAlternateEmail className="absolute left-4 top-1/2 text-gray-400 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-4 border border-gray-400 rounded-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <RiLockPasswordFill className="absolute left-4 top-1/2 text-gray-400 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-4 border border-gray-400 rounded-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-sm text-white font-medium flex cursor-pointer justify-center gap-3 transition-all active:scale-[0.98] ${
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

          <p className="text-center text-sm text-gray-600 mt-5">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
