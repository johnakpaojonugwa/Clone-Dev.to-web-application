import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import DevAppsSidebar from "@/components/DevAppsSidebar";

export default function Register() {
  const navigate = useNavigate();
  const { baseURL } = useApp();

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullname || !form.username || !form.email || !form.password) {
      message.warning("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${baseURL}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        message.error(data?.message || "Registration failed");
        return;
      }

      message.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white px-4 py-10">
      <DevAppsSidebar />
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-sm border border-gray-200 shadow-xs">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-left mb-1">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 text-left mb-6">
            Join the DEV community
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full name */}
            <InputField
              label="Name"
              icon={<FaUser />}
              placeholder="Jane Doe"
              value={form.fullname}
              onChange={(v) => setForm({ ...form, fullname: v })}
            />

            {/* Username */}
            <InputField
              label="Username"
              icon={<FaUser />}
              placeholder="janedoe"
              value={form.username}
              onChange={(v) => setForm({ ...form, username: v })}
            />

            {/* Email */}
            <InputField
              label="Email"
              type="email"
              icon={<MdOutlineAlternateEmail />}
              placeholder="jane@example.com"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />

            {/* Password */}
            <InputField
              label="Password"
              type="password"
              icon={<RiLockPasswordFill />}
              placeholder="••••••••"
              value={form.password}
              onChange={(v) => setForm({ ...form, password: v })}
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`
              w-20 h-10 rounded-sm font-medium text-white cursor-pointer transition
              ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}
            `}
            >
              {loading ? "Loading..." : "Sign up"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full pl-10 pr-4 py-4
            border border-gray-300 rounded-sm
            text-sm
            placeholder:text-gray-400
            focus:outline-none
            focus:ring-1 focus:ring-indigo-500
            focus:border-indigo-500
          "
        />
      </div>
    </div>
  );
}
