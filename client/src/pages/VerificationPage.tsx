import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";


const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/auth`,
  headers: { "Content-Type": "application/json" },
});


interface VerificationPageProps {
  // You can add props here if needed
}


export const VerificationPage: React.FC<VerificationPageProps> = () => {
  const [otp, setOtp] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [verificationSuccess, setVerificationSuccess] =
    useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>(5);


  useEffect(() => {
    let timer: number; // Changed to number type for browser environments


    if (verificationSuccess && countdown > 0) {
      timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (verificationSuccess && countdown === 0) {
      navigate("/login");
    }


    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [verificationSuccess, countdown, navigate]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setBtnLoading(true);
      const activationToken = sessionStorage.getItem("activationToken");
      const role = sessionStorage.getItem("role");


      const { data } = await api.post(`/verify/${role}`, {
        otp,
        activationToken,
      });


      console.log(data.username);
      setUsername(data.username);
      setVerificationSuccess(true);
      setBtnLoading(false);


      // Clear session storage except username if needed
      sessionStorage.removeItem("activationToken");
      sessionStorage.removeItem("role");


      // Redirect after 5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err: any) {
      alert(err.response?.data?.error || "Verification failed");
      setBtnLoading(false);
    }
  };


  const onChange = (value: string | null) => {
    setShow(value !== null);
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {verificationSuccess ? (
          <div className="text-center bg-white py-8 px-4 shadow rounded-lg sm:px-10">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Verification Successful!
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Welcome! Your username is:{" "}
              <strong className="text-indigo-600">{username}</strong>
            </p>
            <p className="text-gray-500 mb-2">
              Please remember your username for future logins.
            </p>
            <p className="text-gray-500">
              Redirecting to login in{" "}
              <span className="font-bold text-indigo-500">{countdown}</span>{" "}
              seconds...
            </p>
          </div>
        ) : (
          <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Verify Your Account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter the 6-digit OTP sent to your email
              </p>
            </div>


            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  OTP Code
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    pattern="\d{6}"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center tracking-widest text-lg"
                    placeholder="••••••"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter the 6-digit code without any spaces or dashes
                </p>
              </div>


              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={onChange}
                />
              </div>


              {show && (
                <div>
                  <button
                    type="submit"
                    disabled={btnLoading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      btnLoading ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {btnLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      "Verify Account"
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};


export default VerificationPage;