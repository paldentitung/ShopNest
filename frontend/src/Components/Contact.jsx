import MainButton from "./MainButton";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiFetch } from "../utils/api";
const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // Variants for fade + slide animation
  const slideVariant = {
    hidden: (direction = 0) => ({
      opacity: 0,
      x: direction === 1 ? 50 : -50,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const createContact = async () => {
    try {
      const res = await apiFetch(
        "/contact",
        {
          method: "POST",
          body: JSON.stringify(userData),
        },
        false,
      );

      if (!res) return;

      toast.success("Message sent!");

      setUserData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("Server error");
    }
  };
  const handleForm = async (e) => {
    e.preventDefault();

    const { name, email, message } = userData;

    if (!name || !email || !message) {
      return toast.error("All fields are required");
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Invalid email");
    }

    await createContact();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 p-6 mt-16 h-auto overflow-x-hidden">
      {/* Contact Info */}
      <motion.div
        className="flex flex-col gap-4 w-full md:w-1/2"
        custom={-1}
        initial="hidden"
        whileInView="visible"
        variants={slideVariant}
        viewport={{ once: true }}
      >
        <h2 className="text-lg md:text-2xl font-semibold">Contact Us</h2>

        <p className="text-gray-600">
          We’d love to hear from you. Reach out with any questions or feedback.
        </p>

        <ul className="space-y-2 text-gray-700">
          <li>📧 support@shopnest.com</li>
          <li>📍 Kathmandu, Nepal</li>
          <li>⏰ Mon – Fri, 9 AM – 6 PM</li>
        </ul>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="w-full md:w-1/2 "
        custom={1}
        initial="hidden"
        whileInView="visible"
        variants={slideVariant}
        viewport={{ once: true }}
      >
        <form onSubmit={handleForm} className="flex flex-col space-y-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="fullname" className="text-sm font-medium">
              Full Name *
            </label>
            <input
              id="fullname"
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="border border-(--color-border) p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="border border-(--color-border) p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm font-medium">
              Message *
            </label>
            <textarea
              id="message"
              rows={4}
              name="message"
              value={userData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="border border-(--color-border) p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
              required
            ></textarea>
          </div>

          <MainButton name="Send Message" type="submit" />
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
