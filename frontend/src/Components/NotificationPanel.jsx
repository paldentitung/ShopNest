import { FaTimes } from "react-icons/fa";

const NotificationPanel = ({
  showNotification,
  setShowNotification,
  notification,
}) => {
  return (
    <>
      {showNotification && (
        <div className="fixed inset-0 z-50 flex justify-end h-screen">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowNotification(false)}
          ></div>

          {/* Panel */}
          <div className="relative w-87 sm:w-100 h-full bg-white shadow-lg p-4 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <button onClick={() => setShowNotification(false)}>
                <FaTimes className="text-gray-600 hover:text-black" />
              </button>
            </div>

            {/* Content */}
            <div className="mt-4 space-y-3">
              {notification.length === 0 ? (
                <p className="text-gray-500 text-sm">No notifications</p>
              ) : (
                notification.map((n) => (
                  <div
                    key={n._id}
                    className={`p-3 rounded-lg border ${
                      n.read ? "bg-gray-100" : "bg-blue-50 border-blue-300"
                    }`}
                  >
                    <p className="text-sm text-gray-800">{n.message}</p>

                    <span className="text-xs text-gray-500 capitalize">
                      {n.type}
                    </span>

                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationPanel;
