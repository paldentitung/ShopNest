import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../../Hooks/useAuth";
const AccountOverview = () => {
  const { user } = useAuth();
  return (
    <div className="bg-white p-6 text-sm rounded-md shadow-md">
      <div className="font-semibold  md:text-lg">Account OVerview</div>
      <div className="flex flex-col gap-3 p-2">
        <div className="flex items-center gap-2">
          <div>
            <FaEnvelope />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">EMAIL</span>
            <span>{user.email || "abcgmail.com"}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <FaPhoneAlt />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">PHONE</span>
            <span>+{user?.phone || 1234567890}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <FaMapMarkerAlt />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">ADDRESS</span>
            <span>{user?.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
