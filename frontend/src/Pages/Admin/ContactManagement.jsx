import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt, FaSearch, FaCheckCircle } from "react-icons/fa";
import { useEffect } from "react";
import { apiFetch } from "../../utils/api";
import toast from "react-hot-toast";
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    classes: "bg-amber-50 text-amber-600 border border-amber-200",
    dot: "bg-amber-400",
  },
  read: {
    label: "Read",
    classes: "bg-blue-50 text-blue-600 border border-blue-200",
    dot: "bg-blue-400",
  },
  resolved: {
    label: "Resolved",
    classes: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    dot: "bg-emerald-400",
  },
};

const StatCard = ({ label, count, color }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex flex-col gap-1">
    <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
      {label}
    </span>
    <span className={`text-3xl font-extrabold tracking-tight ${color}`}>
      {count}
    </span>
  </div>
);

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await apiFetch("/contact", {}, false);
      setContacts(res);
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    const res = await apiFetch(`/contact/${id}`, {
      method: "DELETE",
    });

    toast.success("contact delete");

    setContacts((prev) => prev.filter((c) => c._id !== id));
  };

  const markRead = async (id) => {
    const res = await apiFetch(`/contact/${id}`, {
      method: "PATCH",
    });

    toast.success("contact mark as read");

    setContacts((prev) =>
      prev.map((c) => (c._id === id ? { ...c, status: "read" } : c)),
    );
  };

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  const counts = {
    pending: contacts.filter((c) => c.status === "pending").length,
    read: contacts.filter((c) => c.status === "read").length,
    resolved: contacts.filter((c) => c.status === "resolved").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:px-10">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Admin Panel
        </p>
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Pending"
          count={counts.pending}
          color="text-amber-500"
        />
        <StatCard label="Read" count={counts.read} color="text-blue-500" />
        <StatCard
          label="Resolved"
          count={counts.resolved}
          color="text-emerald-500"
        />
      </div>

      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm mb-5">
        <FaSearch className="text-gray-300 text-sm shrink-0" />
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent"
        />
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-gray-400 text-sm"
            >
              No messages match your search.
            </motion.div>
          ) : (
            filtered.map((contact, index) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`bg-white border rounded-2xl shadow-sm px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-200 hover:shadow-md ${
                  contact.status === "pending"
                    ? "border-amber-100"
                    : "border-gray-100"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-gray-900">
                      {contact.name}
                    </p>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${STATUS_CONFIG[contact.status].classes}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[contact.status].dot}`}
                      />
                      {STATUS_CONFIG[contact.status].label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {contact.email}
                  </p>
                  <p className="text-sm text-gray-500 mt-1.5 line-clamp-1">
                    {contact.message}
                  </p>
                </div>

                <p className="text-xs text-gray-300 whitespace-nowrap hidden md:block">
                  {contact.date}
                </p>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => markRead(contact._id)}
                    disabled={contact.status === "read"}
                    title="Mark as read"
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition ${
                      contact.status === "read"
                        ? "border-blue-200 text-blue-400 cursor-default"
                        : "border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-500"
                    }`}
                  >
                    <FaCheckCircle className="text-sm" />
                  </button>

                  <button
                    onClick={() => handleDelete(contact._id)}
                    title="Delete"
                    className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:border-rose-400 hover:text-rose-500 transition shrink-0"
                  >
                    <FaTrashAlt className="text-sm" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactManagement;
