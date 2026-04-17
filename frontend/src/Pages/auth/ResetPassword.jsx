import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EyeIcon = ({ open }) => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    {open ? (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    ) : (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
        />
      </>
    )}
  </svg>
);

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword)
      return toast.error("All fields are required");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");

    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Strength meter (UI only)
  const strength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 6) s++;
    if (password.length >= 10) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9!@#$%^&*]/.test(password)) s++;
    return s;
  })();
  const strengthMeta = [
    null,
    { label: "Weak", color: "#e05252" },
    { label: "Fair", color: "#e09a52" },
    { label: "Good", color: "#6ab187" },
    { label: "Strong", color: "#3a8a55" },
  ];
  const meta = strengthMeta[strength];

  const passwordsMatch = confirmPassword && password === confirmPassword;
  const passwordsMismatch = confirmPassword && password !== confirmPassword;

  const inputBase =
    "w-full rounded-[10px] border bg-[#faf9f7] pr-11 pl-4 py-3 text-[0.95rem] text-[#1a1612] placeholder-[#bab4ad] outline-none transition-all duration-200";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
      `}</style>

      <div
        className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#f5f3ef] px-4"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute -top-40 -right-40 size-130 rounded-full bg-[radial-gradient(circle,#d4c5b0,transparent_70%)] opacity-70" />
        <div className="pointer-events-none absolute -bottom-32 -left-28 size-90 rounded-full bg-[radial-gradient(circle,#c9bfb0,transparent_70%)] opacity-60" />

        <div className="relative z-10 w-full max-w-105 bg-white rounded-2xl px-8 py-10 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.08)] animate-[slideUp_0.45s_cubic-bezier(0.22,1,0.36,1)_both]">
          {/* Icon */}
          <div className="mx-auto mb-6 size-13 flex items-center justify-center rounded-[14px] bg-[#f0ebe3]">
            <svg
              className="size-6 stroke-[#8a7560]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.6}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>
          </div>

          <h2
            className="text-center text-[1.85rem] leading-tight text-[#1a1612] mb-1"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Set new password
          </h2>
          <p className="text-center text-sm text-[#8a8075] leading-relaxed mb-8">
            Choose something strong and memorable.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label
                htmlFor="rp-password"
                className="block text-[0.72rem] font-semibold uppercase tracking-[0.07em] text-[#6b6258] mb-1.5"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="rp-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputBase} border-[#e5dfd7] focus:border-[#8a7560] focus:bg-white focus:shadow-[0_0_0_3px_rgba(138,117,96,0.12)]`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a09890] transition-colors duration-200 hover:text-[#2d2420] bg-transparent border-none cursor-pointer p-0 flex items-center"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>

              {/* Strength bar */}
              {password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex flex-1 gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-0.75 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background: i <= strength ? meta?.color : "#e5dfd7",
                        }}
                      />
                    ))}
                  </div>
                  {meta && (
                    <span
                      className="text-[0.72rem] font-medium min-w-9 transition-colors duration-300"
                      style={{ color: meta.color }}
                    >
                      {meta.label}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="rp-confirm"
                className="block text-[0.72rem] font-semibold uppercase tracking-[0.07em] text-[#6b6258] mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="rp-confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${inputBase} ${
                    passwordsMatch
                      ? "border-[#3a8a55] shadow-[0_0_0_3px_rgba(58,138,85,0.1)] bg-white"
                      : passwordsMismatch
                        ? "border-[#e05252] shadow-[0_0_0_3px_rgba(224,82,82,0.1)] bg-white"
                        : "border-[#e5dfd7] focus:border-[#8a7560] focus:bg-white focus:shadow-[0_0_0_3px_rgba(138,117,96,0.12)]"
                  }`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a09890] transition-colors duration-200 hover:text-[#2d2420] bg-transparent border-none cursor-pointer p-0 flex items-center"
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>

              {passwordsMatch && (
                <p className="mt-1.5 flex items-center gap-1 text-[0.75rem] font-medium text-[#3a8a55]">
                  <svg
                    className="size-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Passwords match
                </p>
              )}
              {passwordsMismatch && (
                <p className="mt-1.5 flex items-center gap-1 text-[0.75rem] font-medium text-[#e05252]">
                  <svg
                    className="size-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Passwords don't match
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-[10px] bg-[#2d2420] py-3 text-[0.95rem] font-medium tracking-wide text-[#f5f0eb] transition-all duration-200 hover:bg-[#1a1612] hover:shadow-[0_4px_14px_rgba(45,36,32,0.25)] hover:-translate-y-px active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span
                    className="size-4 rounded-full border-2 border-[rgba(245,240,235,0.35)] border-t-[#f5f0eb]"
                    style={{ animation: "spin 0.7s linear infinite" }}
                  />
                  Resetting…
                </>
              ) : (
                <>
                  <svg
                    className="size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Reset Password
                </>
              )}
            </button>
          </form>

          <div className="my-6 h-px bg-[#ede9e3]" />
          <p className="text-center text-sm text-[#a09890]">
            <a
              href="/login"
              className="font-medium text-[#8a7560] no-underline transition-colors duration-200 hover:text-[#2d2420]"
            >
              ← Back to login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
