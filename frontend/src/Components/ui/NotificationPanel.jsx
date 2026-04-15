import { useEffect, useRef } from "react";
import {
  FaTimes,
  FaCheckDouble,
  FaBox,
  FaInfoCircle,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBell,
} from "react-icons/fa";
import {
  readAllNotification,
  readNotification,
} from "../../Services/notificationApi";

const TYPE_CONFIG = {
  info: {
    icon: FaInfoCircle,
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconColor: "text-blue-500",
    badge: "bg-blue-100 text-blue-700",
  },
  success: {
    icon: FaCheckCircle,
    bg: "bg-green-50",
    border: "border-green-200",
    iconColor: "text-green-500",
    badge: "bg-green-100 text-green-700",
  },
  warning: {
    icon: FaExclamationTriangle,
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconColor: "text-amber-500",
    badge: "bg-amber-100 text-amber-700",
  },
  order: {
    icon: FaBox,
    bg: "bg-purple-50",
    border: "border-purple-200",
    iconColor: "text-purple-500",
    badge: "bg-purple-100 text-purple-700",
  },
};

const DEFAULT_TYPE = {
  icon: FaBell,
  bg: "bg-gray-50",
  border: "border-gray-200",
  iconColor: "text-gray-400",
  badge: "bg-gray-100 text-gray-600",
};

function formatTime(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const NotificationPanel = ({
  showNotification,
  setShowNotification,
  notification,
  setNotification,
}) => {
  const panelRef = useRef(null);
  const unreadCount = notification.filter((n) => !n.read).length;

  const handleReadNotification = async (id) => {
    try {
      await readNotification(id);
      setNotification((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
      );
    } catch (error) {
      console.error("Failed to mark read:", error);
    }
  };

  // const handleMarkAllRead = async () => {
  //   const unread = notification.filter((n) => !n.read);
  //   await Promise.allSettled(unread.map((n) => readNotification(n._id)));
  //   setNotification((prev) => prev.map((n) => ({ ...n, read: true })));
  // };

  const handleMarkAllRead = async () => {
    await readAllNotification();
    setNotification((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Trap focus inside panel when open
  useEffect(() => {
    if (showNotification) {
      panelRef.current?.focus();
    }
  }, [showNotification]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowNotification(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setShowNotification]);

  if (!showNotification) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200"
        onClick={() => setShowNotification(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative flex flex-col w-full max-w-sm h-full bg-white shadow-2xl outline-none
                   animate-[slideIn_0.25s_ease-out]"
        style={{ animation: "slideIn 0.25s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-semibold text-gray-900 tracking-tight">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-blue-600 text-white text-[11px] font-semibold">
                {unreadCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                title="Mark all as read"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium
                           text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-150"
              >
                <FaCheckDouble className="w-3 h-3" />
                Mark all read
              </button>
            )}
            <button
              onClick={() => setShowNotification(false)}
              className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              aria-label="Close notifications"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
          {notification.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <FaBell className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  You're all caught up
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  No notifications yet
                </p>
              </div>
            </div>
          ) : (
            notification.map((n) => {
              const config = TYPE_CONFIG[n.type] ?? DEFAULT_TYPE;
              const Icon = config.icon;

              return (
                <div
                  key={n._id}
                  className={`
                    group relative flex gap-3 p-3.5 rounded-xl border transition-all duration-200 cursor-default
                    ${
                      n.read
                        ? "bg-white border-gray-100 opacity-70 hover:opacity-100"
                        : `${config.bg} ${config.border} shadow-sm`
                    }
                  `}
                >
                  {!n.read && (
                    <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-blue-500" />
                  )}

                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                                ${n.read ? "bg-gray-100" : "bg-white/70"}`}
                  >
                    <Icon
                      className={`w-4 h-4 ${n.read ? "text-gray-400" : config.iconColor}`}
                    />
                  </div>

                  {/* Body */}
                  <div className="flex-1 min-w-0 pr-4">
                    <p
                      className={`text-sm leading-snug ${n.read ? "text-gray-500" : "text-gray-800 font-medium"}`}
                    >
                      {n.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className={`text-[11px] font-medium px-1.5 py-0.5 rounded capitalize ${config.badge}`}
                      >
                        {n.type}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {formatTime(n.createdAt)}
                      </span>
                    </div>
                  </div>

                  {!n.read && (
                    <button
                      onClick={() => handleReadNotification(n._id)}
                      title="Mark as read"
                      className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100
                                 text-[11px] font-medium text-blue-500 hover:text-blue-700
                                 transition-opacity duration-150"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {notification.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/80">
            <p className="text-xs text-gray-400 text-center">
              {unreadCount === 0
                ? "All notifications read"
                : `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default NotificationPanel;
