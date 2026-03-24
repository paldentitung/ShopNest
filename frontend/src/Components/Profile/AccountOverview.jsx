import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
const AccountOverview = () => {
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
            <span>alexchen@gmail.com</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <FaPhoneAlt />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">PHONE</span>
            <span>+1 234 567 890</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <FaMapMarkerAlt />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">ADDRESS</span>
            <span>123 Main Street, New York, NY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
