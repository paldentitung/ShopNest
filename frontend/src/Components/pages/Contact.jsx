import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { apiFetch } from "../../utils/api";

const contactDetails = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
    label: "Email",
    value: "support@shopnest.com",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
    label: "Location",
    value: "Kathmandu, Nepal",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    label: "Hours",
    value: "Mon – Fri, 9 AM – 6 PM",
  },
];

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const createContact = async () => {
    try {
      setLoading(true);
      const res = await apiFetch(
        "/contact",
        { method: "POST", body: JSON.stringify(userData) },
        false,
      );
      if (!res) return;
      toast.success("Message sent!");
      setUserData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const { name, email, message } = userData;
    if (!name || !email || !message)
      return toast.error("All fields are required");
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) return toast.error("Invalid email");
    await createContact();
  };

  const inputClass =
    "w-full bg-white border border-black/10 text-black placeholder-black/30 text-sm px-4 py-3 rounded-xl outline-none focus:border-black/30 focus:ring-1 focus:ring-black/10 transition-all duration-200";

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden flex items-center">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f7f5f2] clip-diagonal" />
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #00000008 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 md:gap-20 items-center">
        {/* Left — Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-[40%] shrink-0 flex flex-col gap-8"
        >
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-black/30 mb-3 font-medium">
              Get in touch
            </p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-black">
              We'd love to
              <br />
              <span className="text-black/25">hear from you.</span>
            </h2>
          </div>

          <p className="text-sm text-black/50 leading-relaxed max-w-sm">
            Have a question about an order, a product, or just want to say
            hello? Drop us a message and we'll get back to you within 24 hours.
          </p>

          <div className="flex flex-col gap-4">
            {contactDetails.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-black/40 shrink-0">
                  {d.icon}
                </div>
                <div>
                  <p className="text-[11px] text-black/30 uppercase tracking-wider font-semibold">
                    {d.label}
                  </p>
                  <p className="text-sm font-medium text-black/80 mt-0.5">
                    {d.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 w-full"
        >
          <div className="bg-white rounded-3xl p-7 md:p-10 shadow-lg border border-black/10">
            <p className="text-xs tracking-[0.25em] uppercase text-black/30 mb-6 font-medium">
              Send a message
            </p>

            <form onSubmit={handleForm} className="flex flex-col gap-4">
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs text-black/50 font-semibold uppercase tracking-wider">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs text-black/50 font-semibold uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-black/50 font-semibold uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={userData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full bg-black text-white text-sm font-bold py-3.5 rounded-xl tracking-wider uppercase hover:bg-black/90 active:scale-[0.98] transition-all duration-150 disabled:opacity-50"
              >
                {loading ? "Sending…" : "Send message →"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
