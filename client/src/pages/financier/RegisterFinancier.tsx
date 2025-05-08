import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Paper,
  Link,
} from '@mui/material';

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
  Assessment
} from '@mui/icons-material';

// Validation regex patterns
const PATTERNS = {
  PAN: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
  MOBILE: /^[6-9]\d{9}$/,
  IFSC: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/
};

// Risk appetite options
const RISK_APPETITES = [
  'Low',
  'Moderate',
  'High',
  'Very High'
];

// Credit limit per supplier options
const CREDIT_LIMIT_OPTIONS = [
  'Up to ₹10 Lakh',
  '₹10 Lakh - ₹50 Lakh',
  '₹50 Lakh - ₹1 Crore',
  '₹1 Crore - ₹5 Crore',
  'More than ₹5 Crore'
];

// Steps for stepper
const steps = [
  { label: 'Institution Details', icon: <BusinessCenter /> },
  { label: 'Contact Details', icon: <ContactPhone /> },
  { label: 'Bank Details', icon: <AccountBalance /> },
  { label: 'Risk Profile', icon: <Assessment /> },
  { label: 'Security', icon: <VpnKey /> }
];

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

interface ValidationErrors {
  [key: string]: string;
}

// Axios instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/auth`,
  headers: { 'Content-Type': 'application/json' }
});

const FinancierRegister: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FinancierFormData>({
    userName: null,
    institutionPan: '',
    mobile: '',
    institutionName: '',
    rbiLicenseNumber: '',
    contactName: '',
    contactDesignation: '',
    contactEmail: '',
    contactPhone: '',
    accountNumber: '',
    bankName: '',
    ifsc: '',
    riskAppetite: '',
    creditLimitPerSupplier: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [panExists, setPanExists] = useState(false);
  const [mobileExists, setMobileExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingInstitutionInfo, setFetchingInstitutionInfo] = useState(false);

  // OTP states
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [mobileOtp, setMobileOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpType, setOtpType] = useState<'mobile' | 'email'>('mobile');
  const [registrationSuccess, ] = useState(false);

  // Check PAN uniqueness
  const checkPan = async () => {
    if (PATTERNS.PAN.test(formData.institutionPan)) {
      try {
        const { data } = await api.get('/check/financier/pan', { params: { pan: formData.institutionPan } });
        setPanExists(data.exists);
        console.log(mobileVerified);
        setErrors(prev => ({ ...prev, institutionPan: data.exists ? 'PAN already registered' : '' }));
      } catch {
        // ignore errors
      }
    }
  };

  // Check mobile uniqueness
  const checkMobile = async () => {
    if (PATTERNS.MOBILE.test(formData.mobile)) {
      try {
        const { data } = await api.get('/check/financier/phone', { params: { phone: formData.mobile } });
        setMobileExists(data.exists);
        setErrors(prev => ({ ...prev, mobile: data.exists ? 'Mobile already registered' : '' }));
      } catch {
        // ignore
      }
    }
  };

  const handlePanBlur = () => checkPan();
  const handleMobileBlur = () => checkMobile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | React.ChangeEvent<{ name?: string; value: unknown }> | { target: { name: string; value: unknown } }) => {
    const { name, value } = e.target;
    if (name) {
      setFormData(prev => ({ ...prev, [name]: value } as any));
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Simulate fetching institution info by PAN
  const fetchInstitutionInfo = async () => {
    if (!PATTERNS.PAN.test(formData.institutionPan)) {
      setErrors(prev => ({ ...prev, institutionPan: 'Please enter a valid PAN' }));
      return;
    }
    setFetchingInstitutionInfo(true);
    try {
      // Simulated response
      const mock = {
        institutionName: 'Demo Financier Ltd',
        rbiLicenseNumber: 'RBI123456'
      };
      await new Promise(res => setTimeout(res, 1000));
      setFormData(prev => ({ ...prev, ...mock }));
    } catch {
      setErrors(prev => ({ ...prev, institutionPan: 'Failed to fetch institution info' }));
    } finally {
      setFetchingInstitutionInfo(false);
    }
  };

  // Validate current step
  const validateCurrentStep = (): boolean => {
    const newErrors: ValidationErrors = {};
    switch (activeStep) {
      case 0:
        if (!formData.institutionPan) newErrors.institutionPan = 'PAN is required';
        else if (!PATTERNS.PAN.test(formData.institutionPan)) newErrors.institutionPan = 'Invalid PAN';
        if (panExists) newErrors.institutionPan = 'PAN already registered';
        if (!formData.mobile) newErrors.mobile = 'Mobile is required';
        else if (!PATTERNS.MOBILE.test(formData.mobile)) newErrors.mobile = 'Invalid mobile';
        if (mobileExists) newErrors.mobile = 'Mobile already registered';
        if (!formData.institutionName) newErrors.institutionName = 'Institution name is required';
        if (!formData.rbiLicenseNumber) newErrors.rbiLicenseNumber = 'RBI license number is required';
        break;
      case 1:
        if (!formData.contactName) newErrors.contactName = 'Contact name required';
        if (!formData.contactEmail) newErrors.contactEmail = 'Email required';
        else if (!PATTERNS.EMAIL.test(formData.contactEmail)) newErrors.contactEmail = 'Invalid email';
        if (!formData.contactPhone) newErrors.contactPhone = 'Contact phone required';
        else if (!PATTERNS.MOBILE.test(formData.contactPhone)) newErrors.contactPhone = 'Invalid phone';
        break;
      case 2:
        if (!formData.accountNumber) newErrors.accountNumber = 'Account number required';
        if (!formData.bankName) newErrors.bankName = 'Bank name required';
        if (!formData.ifsc) newErrors.ifsc = 'IFSC required';
        else if (!PATTERNS.IFSC.test(formData.ifsc)) newErrors.ifsc = 'Invalid IFSC';
        break;
      case 3:
        if (!formData.riskAppetite) newErrors.riskAppetite = 'Risk appetite required';
        if (!formData.creditLimitPerSupplier) newErrors.creditLimitPerSupplier = 'Credit limit required';
        break;
      case 4:
        if (!formData.password) newErrors.password = 'Password required';
        else if (formData.password.length < 8) newErrors.password = 'Minimum 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) setActiveStep(prev => prev + 1);
  };
  const handleBack = () => setActiveStep(prev => prev - 1);

  // Send OTP
  const sendOtp = async (type: 'mobile' | 'email') => {
    setOtpType(type);
    setSendingOtp(true);
    try {
      if (type === 'mobile' && !PATTERNS.MOBILE.test(formData.mobile)) {
        setErrors(prev => ({ ...prev, mobile: 'Enter valid mobile' }));
        setSendingOtp(false);
        return;
      }
      if (type === 'email' && !PATTERNS.EMAIL.test(formData.contactEmail)) {
        setErrors(prev => ({ ...prev, contactEmail: 'Enter valid email' }));
        setSendingOtp(false);
        return;
      }
      await new Promise(res => setTimeout(res, 1500));
      setOtpError('');
      if (type === 'mobile') setMobileOtp(''); else setEmailOtp('');
      setOtpDialogOpen(true);
    } catch {
      setOtpError(`Failed to send OTP to your ${type}`);
    } finally {
      setSendingOtp(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    setVerifyingOtp(true);
    try {
      const otp = otpType === 'mobile' ? mobileOtp : emailOtp;
      if (otp !== '123456') {
        setOtpError('Invalid OTP');
        return;
      }
      await new Promise(res => setTimeout(res, 1000));
      if (otpType === 'mobile') setMobileVerified(true); else setEmailVerified(true);
      setOtpDialogOpen(false);
    } catch {
      setOtpError('Failed to verify OTP');
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = formData;
      const res = await api.post("/register/financier", payload);
      sessionStorage.setItem("activationToken", res.data.activationToken);
      sessionStorage.setItem("role", "financier");
      alert(res.data.message || "Send Otp!!");
      navigate("/verify");
    } catch (err: any) {
      alert(err.response?.data?.error || "Registration failed");
      setLoading(false);
    }
  };



  // Step content renderer
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Institution Details</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>Enter your institution PAN and basic info</Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              <TextField
                label="Institution PAN*"
                name="institutionPan"
                value={formData.institutionPan}
                onChange={handleChange}
                onBlur={handlePanBlur}
                error={!!errors.institutionPan}
                helperText={errors.institutionPan}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={fetchInstitutionInfo} disabled={fetchingInstitutionInfo}>
                        {fetchingInstitutionInfo ? <CircularProgress size={20} /> : 'Fetch Info'}
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                label="Mobile Number*"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                onBlur={handleMobileBlur}
                error={!!errors.mobile}
                helperText={errors.mobile}
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      {/* <Button
                        size="small"
                        onClick={() => sendOtp('mobile')}
                        disabled={sendingOtp || mobileVerified}
                        color={mobileVerified ? "success" : "primary"}
                      >
                        {sendingOtp && otpType === 'mobile' ? <CircularProgress size={20} /> : mobileVerified ? <><CheckCircle fontSize="small" /> Verified</> : 'Verify'}
                      </Button> */}
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                name="institutionName"
                label="Institution Name*"
                value={formData.institutionName}
                onChange={handleChange}
                error={!!errors.institutionName}
                helperText={errors.institutionName}
                disabled={fetchingInstitutionInfo}
              />
              <TextField
                fullWidth
                name="rbiLicenseNumber"
                label="RBI License Number*"
                value={formData.rbiLicenseNumber}
                onChange={handleChange}
                error={!!errors.rbiLicenseNumber}
                helperText={errors.rbiLicenseNumber}
                disabled={fetchingInstitutionInfo}
              />
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Contact Details</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>Enter authorized contact person details</Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              <TextField
                name="contactName"
                label="Contact Name*"
                value={formData.contactName}
                onChange={handleChange}
                error={!!errors.contactName}
                helperText={errors.contactName}
              />
              <TextField
                name="contactDesignation"
                label="Designation"
                value={formData.contactDesignation}
                onChange={handleChange}
                error={!!errors.contactDesignation}
                helperText={errors.contactDesignation}
              />
              <TextField
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
                        onClick={() => sendOtp('email')}
                        disabled={sendingOtp || emailVerified}
                        color={emailVerified ? "success" : "primary"}
                      >
                        {sendingOtp && otpType === 'email' ? <CircularProgress size={20} /> : emailVerified ? <><CheckCircle fontSize="small" /> Verified</> : 'Verify'}
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                name="contactPhone"
                label="Contact Phone*"
                value={formData.contactPhone}
                onChange={handleChange}
                error={!!errors.contactPhone}
                helperText={errors.contactPhone}
                InputProps={{ startAdornment: <InputAdornment position="start">+91</InputAdornment> }}
              />
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Bank Details</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>Provide bank account information</Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              <TextField
                name="accountNumber"
                label="Account Number*"
                value={formData.accountNumber}
                onChange={handleChange}
                error={!!errors.accountNumber}
                helperText={errors.accountNumber}
              />
              <TextField
                name="bankName"
                label="Bank Name*"
                value={formData.bankName}
                onChange={handleChange}
                error={!!errors.bankName}
                helperText={errors.bankName}
              />
              <TextField
                name="ifsc"
                label="IFSC Code*"
                value={formData.ifsc}
                onChange={handleChange}
                error={!!errors.ifsc}
                helperText={errors.ifsc}
              />
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Risk Profile</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>Set your risk appetite and credit limits</Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              <FormControl error={!!errors.riskAppetite}>
                <InputLabel>Risk Appetite*</InputLabel>
                <Select
                  name="riskAppetite"
                  value={formData.riskAppetite}
                  label="Risk Appetite*"
                  onChange={handleChange}
                >
                  {RISK_APPETITES.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
                {errors.riskAppetite && <FormHelperText>{errors.riskAppetite}</FormHelperText>}
              </FormControl>
              <FormControl error={!!errors.creditLimitPerSupplier}>
                <InputLabel>Credit Limit per Supplier*</InputLabel>
                <Select
                  name="creditLimitPerSupplier"
                  value={formData.creditLimitPerSupplier}
                  label="Credit Limit per Supplier*"
                  onChange={handleChange}
                >
                  {CREDIT_LIMIT_OPTIONS.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
                {errors.creditLimitPerSupplier && <FormHelperText>{errors.creditLimitPerSupplier}</FormHelperText>}
              </FormControl>
            </Box>
          </Box>
        );
      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Set Your Password</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>Create a secure password</Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              <TextField
                name="password"
                label="Password*"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password || 'Password must be at least 8 characters'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(p => !p)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                name="confirmPassword"
                label="Confirm Password*"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(p => !p)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              By registering, you agree to our <Link href="#">Terms</Link> and <Link href="#">Privacy Policy</Link>.
            </Typography>
          </Box>
        );
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  const renderOtpDialog = () => (
    <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
      <DialogTitle>
        Verify {otpType === 'mobile' ? 'Mobile' : 'Email'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the 6-digit OTP sent to your {otpType === 'mobile' ? formData.mobile : formData.contactEmail}
        </DialogContentText>
        <Box mt={2}>
          <TextField
            fullWidth
            label="OTP"
            value={otpType === 'mobile' ? mobileOtp : emailOtp}
            onChange={e => {
              if (otpType === 'mobile') setMobileOtp(e.target.value);
              else setEmailOtp(e.target.value);
              setOtpError('');
            }}
            error={!!otpError}
            helperText={otpError}
            inputProps={{ maxLength: 6 }}
          />
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            Didn't receive OTP?
          </Typography>
          <Button onClick={() => sendOtp(otpType)} disabled={sendingOtp}>Resend</Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOtpDialogOpen(false)}>Cancel</Button>
        <Button onClick={verifyOtp} variant="contained" disabled={verifyingOtp || (otpType === 'mobile' ? mobileOtp.length !== 6 : emailOtp.length !== 6)}>
          {verifyingOtp ? <CircularProgress size={20} /> : 'Verify'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderSuccessDialog = () => (
    <Dialog open={registrationSuccess}>
      <DialogTitle>Registration Successful</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" py={2}>
          <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
          <DialogContentText textAlign="center">
            Your financier account has been created successfully.<br />Redirecting to login...
          </DialogContentText>
        </Box>
      </DialogContent>
    </Dialog>
  );

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" mb={4}>
          <BusinessCenter color="primary" sx={{ fontSize: 32, mr: 2 }} />
          <Typography variant="h4">Financier Registration</Typography>
        </Box>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((step, idx) => (
            <Step key={step.label}>
              <StepLabel StepIconComponent={() => (
                <Box
                  sx={{
                    color: idx === activeStep ? 'primary.main' : idx < activeStep ? 'success.main' : 'grey.400',
                    borderRadius: '50%', p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >{step.icon}</Box>
              )}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box>
          {activeStep === steps.length ? (
            <Box textAlign="center" py={3}>
              <Typography variant="h6" gutterBottom>All steps completed</Typography>
              <Button variant="contained" onClick={handleSubmit} disabled={loading} startIcon={loading ? <CircularProgress size={20} /> : null}>
                {loading ? 'Submitting...' : 'Submit Registration'}
              </Button>
            </Box>
          ) : (
            <>
              <Box>{getStepContent(activeStep)}</Box>
              <Box mt={4} display="flex" justifyContent="space-between">
                <Button disabled={activeStep === 0} onClick={handleBack} startIcon={<ArrowBack />}>Back</Button>
                <Button variant="contained" onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext} endIcon={activeStep < steps.length - 1 ? <ArrowForward /> : null}>
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Paper>
      <Box mt={3} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          Already have an account?{' '}
          <Link component="button" variant="body2" onClick={() => navigate('/login')}>Log in</Link>
        </Typography>
      </Box>
      {renderOtpDialog()}
      {renderSuccessDialog()}
    </Container>
  );
};

export default FinancierRegister;