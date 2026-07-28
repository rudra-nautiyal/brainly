// src/pages/Signin.tsx
import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

// --- Icons ---

const BrainIcon = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="cursor-pointer"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="cursor-pointer"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Error States
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function signin(e: React.FormEvent) {
    e.preventDefault();

    // 1. Reset all errors and start loading
    setUsernameError("");
    setPasswordError("");
    setGeneralError("");
    setIsLoading(true);

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username,
        password,
      });

      // Store the JWT token (adjust "token" based on what your backend sends)
      const jwt = response.data.token;
      if (jwt) {
        localStorage.setItem("token", jwt);
        window.location.href = "/dashboard";
      } else {
        setGeneralError("Authentication succeeded, but no token was received.");
      }
    } catch (error: any) {
      // 2. Handle Validation Errors (if backend sends 400 Bad Request)
      if (error.response?.data?.errors) {
        const errorMessages: string[] = error.response.data.errors;

        errorMessages.forEach((msg) => {
          const lowerMsg = msg.toLowerCase();
          if (lowerMsg.includes("username")) {
            setUsernameError(msg);
          } else if (
            lowerMsg.includes("password") ||
            lowerMsg.includes("character")
          ) {
            setPasswordError(msg);
          } else {
            setGeneralError(msg);
          }
        });
      }
      // 3. Handle Unauthorized / Incorrect Credentials (usually 403 or 401)
      else if (
        error.response?.status === 403 ||
        error.response?.status === 401
      ) {
        setGeneralError("Incorrect username or password.");
      }
      // 4. Fallback for specific backend messages or Network Errors
      else if (error.response?.data?.message) {
        setGeneralError(error.response.data.message);
      } else {
        setGeneralError("Log in failed. Please check your network connection.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#f4f5f6] flex flex-col justify-center items-center p-6">
      {/* Main Form Card */}
      <div className="w-full max-w-md bg-white rounded-2xl border-4 border-[#101820] p-8 shadow-[8px_8px_0px_0px_rgba(16,24,32,1)] flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 text-center items-center">
          {/* Black & White Brain Logo Badge */}
          <div className="w-20 h-20 bg-[#101820] text-white rounded-2xl border-4 border-[#101820] flex justify-center items-center shadow-[4px_4px_0px_0px_rgba(16,24,32,0.3)]">
            <BrainIcon />
          </div>

          {/* Text Area */}
          <div className="flex flex-col gap-1 mt-2">
            <h1 className="text-3xl font-black text-[#101820] tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500 font-semibold px-2">
              Sign in to access your notes and second brain.
            </p>
          </div>
        </div>

        {/* General Form Error (e.g., "Incorrect credentials") */}
        {generalError && (
          <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {generalError}
          </div>
        )}

        {/* Form Section */}
        <form className="flex flex-col gap-5" onSubmit={signin}>
          {/* Username / Email Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="text-sm font-bold text-[#101820] ml-1"
            >
              Username
            </label>
            <Input
              ref={usernameRef}
              id="username"
              placeholder="Enter your username"
              type="text"
              startIcon={<UserIcon />}
              className={
                usernameError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : ""
              }
            />
            {/* Display Username Error */}
            {usernameError && (
              <span className="text-sm text-red-500 font-semibold ml-1 flex items-center gap-1 mt-1">
                {usernameError}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center ml-1">
              <label
                htmlFor="password"
                className="text-sm font-bold text-[#101820]"
              >
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-xs font-bold text-gray-500 hover:text-[#101820] transition-colors"
              >
                Forgot?
              </a>
            </div>
            <Input
              ref={passwordRef}
              id="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              startIcon={<LockIcon />}
              className={
                passwordError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : ""
              }
              endIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none text-gray-500 hover:text-[#101820] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />
            {/* Display Password Error */}
            {passwordError && (
              <span className="text-sm text-red-500 font-semibold ml-1 flex items-center gap-1 mt-1">
                {passwordError}
              </span>
            )}
          </div>

          {/* Signin Button */}
          <div className="pt-2">
            <Button
              loading={isLoading}
              variant="primary"
              text="Log In"
              fullWidth={true}
              type="submit"
            />
          </div>
        </form>

        {/* Footer Section */}
        <div className="text-center -mt-2.5 flex flex-col items-center gap-1">
          <p className="text-sm font-bold text-gray-500">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-[#101820] hover:text-[#D4BE00] underline underline-offset-4 transition-colors"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
