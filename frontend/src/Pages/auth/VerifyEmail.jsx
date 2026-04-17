import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/auth/verify-email/${token}`,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Verification failed");
        }

        setMessage(data.message);
        toast.success(data.message || "Email verified!");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        toast.error(err.message);
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        {loading ? (
          <>
            <h2 className="text-xl font-semibold">Verifying Email...</h2>
            <p className="text-gray-500 mt-2">Please wait</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">Verification Status</h2>
            <p className="mt-2 text-gray-600">{message}</p>

            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-4 py-2 bg-black text-white rounded-md"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
