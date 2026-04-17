import { useState } from "react";
import toast from "react-hot-toast";
import { apiFetch } from "../../utils/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    try {
      setLoading(true);
      await apiFetch(
        "/auth/forgot-password",
        { method: "POST", body: JSON.stringify({ email }) },
        false,
      );
      setSent(true);
      toast.success("Reset link sent to your email (if account exists)");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Font import — one tiny style tag just for the Google Font URL, no design CSS */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      <div
        className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#f5f3ef] px-4"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute -top-40 -right-40 size-130 rounded-full bg-[radial-gradient(circle,#d4c5b0,transparent_70%)] opacity-70" />
        <div className="pointer-events-none absolute -bottom-32 -left-28 size-90 rounded-full bg-[radial-gradient(circle,#c9bfb0,transparent_70%)] opacity-60" />

        <div className="relative z-10 w-full max-w-105 bg-white rounded-2xl px-8 py-10 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.08)] animate-[slideUp_0.45s_cubic-bezier(0.22,1,0.36,1)_both]">
          <style>{`
            @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
            @keyframes fadeIn  { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }
            @keyframes spin    { to{transform:rotate(360deg)} }
          `}</style>

          {!sent ? (
            <>
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
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>

              <h2
                className="text-center text-[1.85rem] leading-tight text-[#1a1612] mb-1"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Forgot password?
              </h2>
              <p className="text-center text-sm text-[#8a8075] leading-relaxed mb-8">
                No worries — enter your email and we'll send you a reset link.
              </p>

              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="fp-email"
                  className="block text-[0.72rem] font-semibold uppercase tracking-[0.07em] text-[#6b6258] mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="fp-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-[10px] border border-[#e5dfd7] bg-[#faf9f7] px-4 py-3 text-[0.95rem] text-[#1a1612] placeholder-[#bab4ad] outline-none transition-all duration-200 focus:border-[#8a7560] focus:bg-white focus:shadow-[0_0_0_3px_rgba(138,117,96,0.12)]"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full flex items-center justify-center gap-2 rounded-[10px] bg-[#2d2420] py-3 text-[0.95rem] font-medium tracking-wide text-[#f5f0eb] transition-all duration-200 hover:bg-[#1a1612] hover:shadow-[0_4px_14px_rgba(45,36,32,0.25)] hover:-translate-y-px active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span
                        className="size-4 rounded-full border-2 border-[rgba(245,240,235,0.35)] border-t-[#f5f0eb]"
                        style={{ animation: "spin 0.7s linear infinite" }}
                      />
                      Sending…
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
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>

              <div className="my-6 h-px bg-[#ede9e3]" />
              <p className="text-center text-sm text-[#a09890]">
                Remember it?{" "}
                <a
                  href="/login"
                  className="font-medium text-[#8a7560] no-underline transition-colors duration-200 hover:text-[#2d2420]"
                >
                  Back to login
                </a>
              </p>
            </>
          ) : (
            <div
              className="text-center"
              style={{ animation: "fadeIn 0.4s ease both" }}
            >
              <div className="mx-auto mb-5 size-14 flex items-center justify-center rounded-full bg-[#eaf5ee]">
                <svg
                  className="size-6 stroke-[#3a8a55]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>

              <h3
                className="mb-2 text-[1.4rem] text-[#1a1612]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Check your inbox
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-[#8a8075]">
                If an account exists for{" "}
                <strong className="font-semibold text-[#1a1612]">
                  {email}
                </strong>
                , a password reset link is on its way.
              </p>

              <button
                onClick={() => {
                  setEmail("");
                  setSent(false);
                }}
                className="border-none bg-transparent cursor-pointer text-sm font-medium text-[#8a7560] underline underline-offset-2 transition-colors duration-200 hover:text-[#2d2420]"
              >
                Try a different email
              </button>

              <div className="my-6 h-px bg-[#ede9e3]" />
              <p className="text-sm text-[#a09890]">
                <a
                  href="/login"
                  className="font-medium text-[#8a7560] no-underline transition-colors duration-200 hover:text-[#2d2420]"
                >
                  ← Back to login
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
