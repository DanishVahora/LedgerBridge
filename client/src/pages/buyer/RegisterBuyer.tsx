import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Paper,
  Link,
} from "@mui/material";

import { GridLegacy as Grid } from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  ArrowBack,
  ArrowForward,
  CheckCircle,
  BusinessCenter,
  ContactPhone,
  AccountBalance,
  VpnKey,
  Storefront,
  Assessment,
} from "@mui/icons-material";

// Validation regex patterns
const PATTERNS = {
  PAN: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
  MOBILE: /^[6-9]\d{9}$/,
  GSTIN: /\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}/,
  IFSC: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

// Industry sectors
const INDUSTRY_SECTORS = [
  "Manufacturing",
  "Retail",
  "IT & Software",
  "Healthcare",
  "Education",
  "Financial Services",
  "E-commerce",
  "Construction",
  "Hospitality",
  "Logistics",
  "Automotive",
  "Textile",
  "Agriculture",
  "Food Processing",
  "Pharmaceutical",
  "Telecom",
  "Others",
];

// Turnover brackets
const TURNOVER_BRACKETS = [
  "Less than ₹10 Crore",
  "₹10 Crore - ₹50 Crore",
  "₹50 Crore - ₹100 Crore",
  "₹100 Crore - ₹500 Crore",
  "More than ₹500 Crore",
];

// Credit limit options
const CREDIT_LIMIT_OPTIONS = [
  "Up to ₹10 Lakh",
  "₹10 Lakh - ₹50 Lakh",
  "₹50 Lakh - ₹1 Crore",
  "₹1 Crore - ₹5 Crore",
  "More than ₹5 Crore",
];

// Steps for the stepper
const steps = [
  {
    label: "Contact Details",
    icon: <ContactPhone />,
  },
  {
    label: "Business Information",
    icon: <BusinessCenter />,
  },
  {
    label: "Financial Details",
    icon: <Assessment />,
  },
  {
    label: "Bank Details",
    icon: <AccountBalance />,
  },
  {
    label: "Security",
    icon: <VpnKey />,
  },
];

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

interface ValidationErrors {
  [key: string]: string;
}
// Axios instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/auth`,
  headers: { "Content-Type": "application/json" },
});

const BuyerRegister: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<BuyerFormData>({
    userName: null,
    buyerPan: "",
    mobile: "",
    companyName: "",
    gstin: "",
    registeredAddress: "",
    contactName: "",
    contactDesignation: "",
    contactEmail: "",
    contactPhone: "",
    industrySector: "",
    turnoverBracket: "",
    desiredCreditLimit: "",
    accountNumber: "",
    bankName: "",
    ifsc: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [panExists, setPanExists] = useState(false);
  const [mobileExists, setMobileExists] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingBusinessInfo, setFetchingBusinessInfo] = useState(false);

  // OTP verification states
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [mobileOtp, setMobileOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpType, setOtpType] = useState<"mobile" | "email">("mobile");

  // Registration success state
  const [registrationSuccess,] = useState(false);
  const checkPan = async () => {
    if (PATTERNS.PAN.test(formData.buyerPan)) {
      try {
        const { data } = await api.get("/check/buyer/pan", {
          params: { pan: formData.buyerPan },
        });
        setPanExists(data.exists);
        setErrors((prev) => ({
          ...prev,
          buyerPan: data.exists ? "PAN already registered" : "",
        }));
      } catch {
        /* ignore */
      }
    }
  };
  const checkMobile = async () => {
    if (PATTERNS.MOBILE.test(formData.mobile)) {
      try {
        const { data } = await api.get("/check/buyer/phone", {
          params: { phone: formData.mobile },
        });
        setMobileExists(data.exists);
        setErrors((prev) => ({
          ...prev,
          mobile: data.exists ? "Mobile already registered" : "",
        }));
      } catch {
        /* ignore */
      }
    }
  };

  const handlePanBlur = () => checkPan();
  const handleMobileBlur = () => checkMobile();
  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | 
    { target: { name?: string; value: unknown } }
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value } as any));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  // Fetch business information based on PAN
  const fetchBusinessInfo = async () => {
    if (!formData.buyerPan || !PATTERNS.PAN.test(formData.buyerPan)) {
      setErrors({
        ...errors,
        buyerPan: "Please enter a valid PAN",
      });
      return;
    }

    setFetchingBusinessInfo(true);

    try {
      // This would be a real API call to fetch business details based on PAN
      // For demo, we'll simulate it
      const mockResponse = {
        companyName: "Demo Buyer Ltd",
        gstin: "27AAAAA0000A1Z5",
        registeredAddress:
          "456 Corporate Plaza, Financial District, Mumbai, Maharashtra - 400051",
      };

      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFormData({
        ...formData,
        ...mockResponse,
      });

      setFetchingBusinessInfo(false);
    } catch (error) {
      console.error("Error fetching business info:", error);
      setErrors({
        ...errors,
        buyerPan: "Failed to fetch business information",
      });
      setFetchingBusinessInfo(false);
    }
  };

  // Validate form data for current step
  const validateCurrentStep = (): boolean => {
    const newErrors: ValidationErrors = {};
    switch (activeStep) {
      case 0:
        if (!formData.buyerPan) newErrors.buyerPan = "PAN is required";
        else if (!PATTERNS.PAN.test(formData.buyerPan))
          newErrors.buyerPan = "Invalid PAN";
        if (panExists) newErrors.buyerPan = "PAN already registered";
        if (!formData.mobile) newErrors.mobile = "Mobile is required";
        else if (!PATTERNS.MOBILE.test(formData.mobile))
          newErrors.mobile = "Invalid mobile";
        if (mobileExists) newErrors.mobile = "Mobile already registered";
        if (!formData.companyName)
          newErrors.companyName = "Company name is required";
        if (!formData.gstin) newErrors.gstin = "GSTIN is required";
        else if (!PATTERNS.GSTIN.test(formData.gstin))
          newErrors.gstin = "Invalid GSTIN";
        if (!formData.registeredAddress)
          newErrors.registeredAddress = "Address is required";
        break;
      case 1:
        if (!formData.contactName)
          newErrors.contactName = "Contact name required";
        if (!formData.contactEmail) newErrors.contactEmail = "Email required";
        else if (!PATTERNS.EMAIL.test(formData.contactEmail))
          newErrors.contactEmail = "Invalid email";
        if (!formData.contactPhone)
          newErrors.contactPhone = "Contact phone required";
        else if (!PATTERNS.MOBILE.test(formData.contactPhone))
          newErrors.contactPhone = "Invalid phone";
        break;
      case 2:
        if (!formData.industrySector)
          newErrors.industrySector = "Industry required";
        if (!formData.turnoverBracket)
          newErrors.turnoverBracket = "Turnover required";
        if (!formData.desiredCreditLimit)
          newErrors.desiredCreditLimit = "Credit limit required";
        break;
      case 3:
        if (!formData.accountNumber)
          newErrors.accountNumber = "Account number required";
        if (!formData.bankName) newErrors.bankName = "Bank name required";
        if (!formData.ifsc) newErrors.ifsc = "IFSC required";
        else if (!PATTERNS.IFSC.test(formData.ifsc))
          newErrors.ifsc = "Invalid IFSC";
        break;
      case 4:
        if (!formData.password) newErrors.password = "Password required";
        else if (formData.password.length < 8)
          newErrors.password = "Minimum 8 chars";
        if (formData.password !== formData.confirmPassword)
          newErrors.confirmPassword = "Passwords must match";
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Handle next button click
  const handleNext = () => {
    if (validateCurrentStep()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  // Handle back button click
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Send OTP to mobile or email
  const sendOtp = async (type: "mobile" | "email") => {
    setOtpType(type);
    setSendingOtp(true);

    try {
      // Validate contact information first
      if (type === "mobile" && !PATTERNS.MOBILE.test(formData.mobile)) {
        setErrors({
          ...errors,
          mobile: "Please enter a valid mobile number",
        });
        setSendingOtp(false);
        return;
      }

      if (type === "email" && !PATTERNS.EMAIL.test(formData.contactEmail)) {
        setErrors({
          ...errors,
          contactEmail: "Please enter a valid email",
        });
        setSendingOtp(false);
        return;
      }

      // This would be an actual API call to send OTP
      // For demo, we'll simulate it
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear any previous OTP errors
      setOtpError("");

      // Reset OTP values
      if (type === "mobile") {
        setMobileOtp("");
      } else {
        setEmailOtp("");
      }

      setOtpDialogOpen(true);
      setSendingOtp(false);
    } catch (error) {
      console.error(`Error sending ${type} OTP:`, error);
      setOtpError(`Failed to send OTP to your ${type}. Please try again.`);
      setSendingOtp(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    setVerifyingOtp(true);

    try {
      // This would be an actual API call to verify OTP
      // For demo, we'll simulate it with a fixed OTP "123456"
      const otp = otpType === "mobile" ? mobileOtp : emailOtp;

      if (otp !== "123456") {
        setOtpError("Invalid OTP. Please try again.");
        setVerifyingOtp(false);
        return;
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (otpType === "mobile") {
        setMobileVerified(true);
      } else {
        setEmailVerified(true);
      }

      setOtpDialogOpen(false);
      setVerifyingOtp(false);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("Failed to verify OTP. Please try again.");
      setVerifyingOtp(false);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = formData;
      const res = await api.post("/register/buyer", payload);
      sessionStorage.setItem("activationToken", res.data.activationToken);
      sessionStorage.setItem("role", "Buyer");
      alert(res.data.message || "Send Otp!!");
      navigate("/verify");
    } catch (err: any) {
      alert(err.response?.data?.error || "Registration failed");
      setLoading(false);
    }
  };

  // Render the current step content
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Contact Details
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Please enter your business PAN and basic information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="buyerPan"
                label="Business PAN*"
                value={formData.buyerPan}
                onBlur={handlePanBlur}
                onChange={handleChange}
                error={!!errors.buyerPan}
                helperText={errors.buyerPan}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        onClick={fetchBusinessInfo}
                        disabled={fetchingBusinessInfo}
                      >
                        {fetchingBusinessInfo ? (
                          <CircularProgress size={20} />
                        ) : (
                          "Fetch Info"
                        )}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="mobile"
                label="Mobile Number*"
                value={formData.mobile}
                onChange={handleChange}
                onBlur={handleMobileBlur}
                error={!!errors.mobile}
                helperText={errors.mobile}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        onClick={() => sendOtp("mobile")}
                        disabled={sendingOtp || mobileVerified}
                        color={mobileVerified ? "success" : "primary"}
                      >
                        {sendingOtp && otpType === "mobile" ? (
                          <CircularProgress size={20} />
                        ) : mobileVerified ? (
                          <>
                            <CheckCircle fontSize="small" />
                            &nbsp;Verified
                          </>
                        ) : (
                          "Verify"
                        )}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="companyName"
                label="Company Name*"
                value={formData.companyName}
                onChange={handleChange}
                error={!!errors.companyName}
                helperText={errors.companyName}
                disabled={fetchingBusinessInfo}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="gstin"
                label="GSTIN*"
                value={formData.gstin}
                onChange={handleChange}
                error={!!errors.gstin}
                helperText={errors.gstin}
                disabled={fetchingBusinessInfo}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="registeredAddress"
                label="Registered Address*"
                value={formData.registeredAddress}
                onChange={handleChange}
                error={!!errors.registeredAddress}
                helperText={errors.registeredAddress}
                multiline
                rows={3}
                disabled={fetchingBusinessInfo}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Business Information
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Please provide authorized contact person details
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="contactName"
                label="Contact Person Name*"
                value={formData.contactName}
                onChange={handleChange}
                error={!!errors.contactName}
                helperText={errors.contactName}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="contactDesignation"
                label="Designation"
                value={formData.contactDesignation}
                onChange={handleChange}
                error={!!errors.contactDesignation}
                helperText={errors.contactDesignation}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="contactEmail"
                label="Email*"
                value={formData.contactEmail}
                onChange={handleChange}
                error={!!errors.contactEmail}
                helperText={errors.contactEmail}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        onClick={() => sendOtp("email")}
                        disabled={sendingOtp || emailVerified}
                        color={emailVerified ? "success" : "primary"}
                      >
                        {sendingOtp && otpType === "email" ? (
                          <CircularProgress size={20} />
                        ) : emailVerified ? (
                          <>
                            <CheckCircle fontSize="small" />
                            &nbsp;Verified
                          </>
                        ) : (
                          "Verify"
                        )}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="contactPhone"
                label="Contact Phone*"
                value={formData.contactPhone}
                onChange={handleChange}
                error={!!errors.contactPhone}
                helperText={errors.contactPhone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Financial Details
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Please provide your company's financial information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.industrySector}>
                <InputLabel>Industry Sector*</InputLabel>
                <Select
                  name="industrySector"
                  value={formData.industrySector}
                  label="Industry Sector*"
                  onChange={handleChange}
                >
                  {INDUSTRY_SECTORS.map((sector) => (
                    <MenuItem key={sector} value={sector}>
                      {sector}
                    </MenuItem>
                  ))}
                </Select>
                {errors.industrySector && (
                  <FormHelperText>{errors.industrySector}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.turnoverBracket}>
                <InputLabel>Annual Turnover*</InputLabel>
                <Select
                  name="turnoverBracket"
                  value={formData.turnoverBracket}
                  label="Annual Turnover*"
                  onChange={handleChange}
                >
                  {TURNOVER_BRACKETS.map((bracket) => (
                    <MenuItem key={bracket} value={bracket}>
                      {bracket}
                    </MenuItem>
                  ))}
                </Select>
                {errors.turnoverBracket && (
                  <FormHelperText>{errors.turnoverBracket}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.desiredCreditLimit}>
                <InputLabel>Desired Credit Limit*</InputLabel>
                <Select
                  name="desiredCreditLimit"
                  value={formData.desiredCreditLimit}
                  label="Desired Credit Limit*"
                  onChange={handleChange}
                >
                  {CREDIT_LIMIT_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {errors.desiredCreditLimit && (
                  <FormHelperText>{errors.desiredCreditLimit}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                Note: The desired credit limit is subject to approval based on
                your company's financials.
              </Typography>
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Bank Details
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Please provide your bank account details
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="accountNumber"
                label="Account Number*"
                value={formData.accountNumber}
                onChange={handleChange}
                error={!!errors.accountNumber}
                helperText={errors.accountNumber}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="bankName"
                label="Bank Name*"
                value={formData.bankName}
                onChange={handleChange}
                error={!!errors.bankName}
                helperText={errors.bankName}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="ifsc"
                label="IFSC Code*"
                value={formData.ifsc}
                onChange={handleChange}
                error={!!errors.ifsc}
                helperText={errors.ifsc}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                Note: Please ensure that the bank account is registered in the
                name of your business.
              </Typography>
            </Grid>
          </Grid>
        );

      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Set Up Your Password
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Create a secure password for your account
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="password"
                label="Password*"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={
                  errors.password || "Password must be at least 8 characters"
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="confirmPassword"
                label="Confirm Password*"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                By registering, you agree to our{" "}
                <Link href="#">Terms of Service</Link> and{" "}
                <Link href="#">Privacy Policy</Link>.
              </Typography>
            </Grid>
          </Grid>
        );

      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  // OTP Dialog
  const renderOtpDialog = () => {
    return (
      <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
        <DialogTitle>
          Verify {otpType === "mobile" ? "Mobile Number" : "Email"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {otpType === "mobile"
              ? `Please enter the 6-digit OTP sent to your mobile number ${formData.mobile}`
              : `Please enter the 6-digit OTP sent to your email ${formData.contactEmail}`}
          </DialogContentText>
          <Box mt={2}>
            <TextField
              fullWidth
              label="Enter OTP"
              value={otpType === "mobile" ? mobileOtp : emailOtp}
              onChange={(e) => {
                if (otpType === "mobile") {
                  setMobileOtp(e.target.value);
                } else {
                  setEmailOtp(e.target.value);
                }
                setOtpError("");
              }}
              error={!!otpError}
              helperText={otpError}
              placeholder="123456"
              inputProps={{ maxLength: 6 }}
            />
          </Box>
          <Box
            mt={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="textSecondary">
              Didn't receive the OTP?
            </Typography>
            <Button onClick={() => sendOtp(otpType)} disabled={sendingOtp}>
              Resend OTP
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOtpDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={verifyOtp}
            color="primary"
            variant="contained"
            disabled={
              verifyingOtp ||
              (otpType === "mobile"
                ? mobileOtp.length !== 6
                : emailOtp.length !== 6)
            }
          >
            {verifyingOtp ? <CircularProgress size={20} /> : "Verify OTP"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Success dialog
  const renderSuccessDialog = () => {
    return (
      <Dialog
        open={registrationSuccess}
        aria-labelledby="registration-success-dialog-title"
      >
        <DialogTitle id="registration-success-dialog-title">
          Registration Successful
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" py={2}>
            <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
            <DialogContentText textAlign="center">
              Your buyer account has been created successfully.
              <br />
              You will be redirected to the login page momentarily.
            </DialogContentText>
          </Box>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" mb={4}>
          <Storefront color="primary" sx={{ fontSize: 32, mr: 2 }} />
          <Typography variant="h4" component="h1">
            Buyer Registration
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={() => (
                  <Box
                    sx={{
                      color:
                        index === activeStep
                          ? "primary.main"
                          : index < activeStep
                          ? "success.main"
                          : "grey.400",
                      borderRadius: "50%",
                      p: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {step.icon}
                  </Box>
                )}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box>
          {activeStep === steps.length ? (
            <Box textAlign="center" py={3}>
              <Typography variant="h6" gutterBottom>
                All steps completed
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                Please review your information before submitting.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
                sx={{ mt: 2 }}
              >
                {loading ? "Submitting..." : "Submit Registration"}
              </Button>
            </Box>
          ) : (
            <>
              <Box>{getStepContent(activeStep)}</Box>
              <Box mt={4} display="flex" justifyContent="space-between">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  endIcon={
                    activeStep === steps.length - 1 ? null : <ArrowForward />
                  }
                >
                  {activeStep === steps.length - 1 ? "Review" : "Next"}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Paper>

      <Box mt={3} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          Already have an account?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/login")}
          >
            Log in
          </Link>
        </Typography>
      </Box>

      {renderOtpDialog()}
      {renderSuccessDialog()}
    </Container>
  );
};

export default BuyerRegister;