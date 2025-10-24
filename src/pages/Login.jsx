import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Install via: npm i lucide-react

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const [remember, setRemember] = useState(false);
  const nav = useNavigate();

  const users = [
    { email: "admin@rehotra.app", password: "admin123", name: "Admin User" },
    { email: "user@test.com", password: "user123", name: "Test User" },
  ];

  const submit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem("pms_user", JSON.stringify(user));
      nav("/");
    } else {
      setErr("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left background image */}
      <div
        className="hidden md:block w-1/2 min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://imgcdn.stablediffusionweb.com/2025/9/30/167881a6-b6ee-493c-be97-6449c3932413.jpg')",
        }}
      ></div>

      {/* Right login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-[#ffffff]">
        <div className="w-full max-w-md rounded-3xl shadow-2xl p-10 bg-[#cce6ff]">
          <h2 className="text-3xl font-bold text-gray-800 mb-1 text-center">
            Welcome Back
          </h2>
          <p className="text-gray-700 text-center mb-8">
            Sign in to your account
          </p>

          <form onSubmit={submit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
              />
              {/* Eye icon perfectly aligned */}
              <div
                className="absolute right-3 top-[70%] transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </div>
            </div>

            {/* Error */}
            {err && <div className="text-red-600 text-sm">{err}</div>}

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="mr-2"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-indigo-600 text-sm hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-gray-700 text-sm text-center">
            Don’t have an account?{" "}
            <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
