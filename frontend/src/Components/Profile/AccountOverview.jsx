import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../../Hooks/useAuth";

const AccountOverview = () => {
  const { user } = useAuth();

  const placeholderClass = "text-gray-300 italic";

  const formatAddress = (address) => {
    if (!address) return null;

    const formatted = [
      address.street,
      address.city,
      address.state,
      address.zip,
      address.country,
    ]
      .filter(Boolean)
      .join(", ");

    return formatted || null;
  };

  return (
    <div className="bg-white p-6 text-sm rounded-md shadow-md">
      <div className="font-semibold md:text-lg">Account Overview</div>

      <div className="flex flex-col gap-3 p-2">
        {/* EMAIL */}
        <div className="flex items-center gap-2">
          <FaEnvelope />
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">EMAIL</span>
            <span className={user?.email ? "" : placeholderClass}>
              {user?.email || "No email added"}
            </span>
          </div>
        </div>

        {/* PHONE */}
        <div className="flex items-center gap-2">
          <FaPhoneAlt />
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">PHONE</span>
            <span className={user?.phone ? "" : placeholderClass}>
              {user?.phone ? `+${user.phone}` : "No phone number"}
            </span>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt />
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">ADDRESS</span>
            <span
              className={formatAddress(user?.address) ? "" : placeholderClass}
            >
              {formatAddress(user?.address) || "No address added"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
