import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, RefreshCw } from "lucide-react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useUserContext } from "../context/UserContext";

interface BuyerFormData {
  userName: string | null;
  buyerPan: string;
  mobile: string;
  companyName: string;
  gstin: string;
  registeredAddress: string;
  contactName: string;
  contactDesignation: string;
  contactEmail: string;
  contactPhone: string;
  industrySector: string;
  turnoverBracket: string;
  desiredCreditLimit: string;
  accountNumber: string;
  bankName: string;
  ifsc: string;
  password: string;
  confirmPassword: string;
}
interface FinancierFormData {
  userName: string | null;
  institutionPan: string;
  mobile: string;
  institutionName: string;
  rbiLicenseNumber: string;
  contactName: string;
  contactDesignation: string;
  contactEmail: string;
  contactPhone: string;
  accountNumber: string;
  bankName: string;
  ifsc: string;
  riskAppetite: string;
  creditLimitPerSupplier: string;
  password: string;
  confirmPassword: string;
}

interface SupplierFormData {
  userName: string | null;
  businessPan: string;
  mobile: string;
  businessName: string;
  gstin: string;
  registeredAddress: string;
  contactName: string;
  contactDesignation: string;
  contactEmail: string;
  alternatePhone: string;
  entityType: string;
  industrySector: string;
  accountNumber: string;
  bankName: string;
  ifsc: string;
  password: string;
  confirmPassword: string;
}

type User = SupplierFormData | FinancierFormData | BuyerFormData;

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/auth`,
  headers: { "Content-Type": "application/json" },
});
const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const { setUser, setRole, setAuth } = useUserContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captchaInput: "",
  });

  // Carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    customPaging: (i: number) => (
      <div className="w-2 h-2 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-200" />
    ),
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.captchaInput !== captcha) {
      alert("Invalid captcha!");
      generateCaptcha();
      return;
    }

    setLoading(true);
    try {
      // Correct POST request format with JSON body
      const response = await api.post("/login", {
        usernameOrEmail: formData.email,
        password: formData.password,
      });

      const { role, user } = response.data;
      // Check if the response is successful
      if (response.status === 200) {
        let typedUser: User;

        if (role === "SUPPLIER") {
          typedUser = user as SupplierFormData;
        } else if (role === "FINANCIER") {
          typedUser = user as FinancierFormData;
        } else if (role === "BUYER") {
          typedUser = user as BuyerFormData;
        } else {
          throw new Error("Unknown role");
        }

        console.log(typeof typedUser);
        setUser(typedUser);
        setRole(role);
        setAuth(true);
        // Store user and role in localStorage
        sessionStorage.setItem("user", JSON.stringify(typedUser));
        sessionStorage.setItem("role", role);
        if (role == "SUPPLIER") {
          navigate("/seller/dashboard");
        }
        else if (role == "BUYER") {
          navigate("/buyer/dashboard");
        }else if (role == "FINANCIER") {
          navigate("/buyer/dashboard");
        }
         else {
          // Default navigation if the role doesn't match expected ones
          navigate("/dashboard");
        }
      } else {
        alert("Login failed: " + response.data);
      }
    } catch (error: any) {
      alert("Error during login: " + error.message);
      console.error("Login error:", error);
      generateCaptcha(); // regenerate captcha on error
    } finally {
      setLoading(false);
    }
  };

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (formData.captchaInput !== captcha) {
  //       alert("Invalid captcha!");
  //       generateCaptcha();
  //       return;
  //     }

  //     setLoading(true);
  //     try {
  //       // TODO: Implement login API call
  //       navigate("/seller/dashboard");
  //     } catch (error) {
  //       console.error("Login failed:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Carousel */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-[#006A71]">
        <Slider {...sliderSettings} className="h-full">
          {[
            {
              image: "/Car2.jpeg",
              title: "Invoice Discounting Made Easy",
              description: "Get instant financing for your invoices",
            },
            {
              image: "/Car2.jpeg",
              title: "Quick Settlement",
              description: "Receive funds within 24-48 hours",
            },
            {
              image: "/Car2.jpeg",
              title: "Secure Platform",
              description: "Bank-grade security for your transactions",
            },
          ].map((slide, index) => (
            <div key={index} className="h-screen relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#006A71] to-transparent opacity-90" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-20 left-12 right-12 text-white">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl text-white/80">{slide.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Login to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email or Username
              </label>
              <input
                type="text" // <-- allow both email and username
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#006A71]/20 
           focus:border-[#006A71] transition-all duration-200"
                placeholder="Enter your email or username"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#006A71]/20 
                           focus:border-[#006A71] transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Captcha Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Captcha
              </label>
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex-1 bg-white border border-gray-200 rounded-lg p-3">
                  <div
                    className="font-mono text-lg font-bold tracking-wider text-gray-700 
                                select-none italic bg-gray-50 py-1 text-center"
                  >
                    {captcha}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 
                           transition-colors duration-200"
                >
                  <RefreshCw size={20} className="text-gray-500" />
                </button>
              </div>
              <input
                type="text"
                required
                value={formData.captchaInput}
                onChange={(e) =>
                  setFormData({ ...formData, captchaInput: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 
                         focus:ring-[#006A71]/20 focus:border-[#006A71] transition-all duration-200"
                placeholder="Enter captcha text"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#006A71] text-white py-3 rounded-xl font-medium
                       hover:bg-[#005a61] focus:ring-4 focus:ring-[#006A71]/20 
                       transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Login to Dashboard</span>
              <ArrowRight size={20} />
            </button>

            {/* Links */}
            <div className="flex items-center justify-between text-sm">
              <a
                href="/forgot-password"
                className="text-[#006A71] hover:underline"
              >
                Forgot Password?
              </a>
              <a href="/register" className="text-[#006A71] hover:underline">
                Create Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;