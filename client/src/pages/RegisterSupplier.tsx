import React, { useState, useEffect } from 'react';
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
} from '@mui/material';

import { GridLegacy as Grid } from '@mui/material';

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
  Person
} from '@mui/icons-material';

// Validation regex patterns
const PATTERNS = {
  PAN: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
  MOBILE: /^[6-9]\d{9}$/,
  GSTIN: /\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}/,
  IFSC: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

// Entity types
const ENTITY_TYPES = [
  "Private Limited Company",
  "Public Limited Company",
  "Limited Liability Partnership (LLP)",
  "Partnership Firm",
  "Sole Proprietorship",
  "One Person Company",
  "Trust",
  "Others"
];

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
  "Others"
];

// Steps for the stepper
const steps = [
  {
    label: 'Contact Details',
    icon: <ContactPhone />
  },
  {
    label: 'Business Information',
    icon: <BusinessCenter />
  }, 
  
  {
    label: 'Company Profile',
    icon: <Person />
  },
  {
    label: 'Bank Settlement',
    icon: <AccountBalance />
  },
  {
    label: 'Security',
    icon: <VpnKey />
  }
];

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

interface ValidationErrors {
  [key: string]: string;
}

const SupplierRegister: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<SupplierFormData>({
    userName: null,
    businessPan: '',
    mobile: '',
    businessName: '',
    gstin: '',
    registeredAddress: '',
    contactName: '',
    contactDesignation: '',
    contactEmail: '',
    alternatePhone: '',
    entityType: '',
    industrySector: '',
    accountNumber: '',
    bankName: '',
    ifsc: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingBusinessInfo, setFetchingBusinessInfo] = useState(false);
  
  // OTP verification states
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [mobileOtp, setMobileOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpType, setOtpType] = useState<'mobile' | 'email'>('mobile');
  
  // Registration success state
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData({
        ...formData,
        [name]: value
      });
      
      // Clear error for this field when user types
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
    }
  };

  // Fetch business information based on PAN
  const fetchBusinessInfo = async () => {
    if (!formData.businessPan || !PATTERNS.PAN.test(formData.businessPan)) {
      setErrors({
        ...errors,
        businessPan: 'Please enter a valid PAN'
      });
      return;
    }
    
    setFetchingBusinessInfo(true);
    
    try {
      // This would be a real API call to fetch business details based on PAN
      // For demo, we'll simulate it
      const mockResponse = {
        businessName: "Demo Business Pvt Ltd",
        gstin: "27AAAAA0000A1Z5",
        registeredAddress: "123 Business Park, Corporate Avenue, Mumbai, Maharashtra - 400001"
      };
      
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormData({
        ...formData,
        ...mockResponse
      });
      
      setFetchingBusinessInfo(false);
    } catch (error) {
      console.error("Error fetching business info:", error);
      setErrors({
        ...errors,
        businessPan: 'Failed to fetch business information'
      });
      setFetchingBusinessInfo(false);
    }
  };

  // Validate form data for current step
  const validateCurrentStep = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    switch (activeStep) {
      case 0: // Business Information
        if (!formData.businessPan) {
          newErrors.businessPan = 'PAN is required';
        } else if (!PATTERNS.PAN.test(formData.businessPan)) {
          newErrors.businessPan = 'Invalid PAN format (e.g., ABCDE1234F)';
        }
        
        if (!formData.mobile) {
          newErrors.mobile = 'Mobile number is required';
        } else if (!PATTERNS.MOBILE.test(formData.mobile)) {
          newErrors.mobile = 'Invalid Indian mobile number';
        }
        
        if (!formData.businessName) {
          newErrors.businessName = 'Business name is required';
        }
        
        if (!formData.gstin) {
          newErrors.gstin = 'GSTIN is required';
        } else if (!PATTERNS.GSTIN.test(formData.gstin)) {
          newErrors.gstin = 'Invalid GSTIN format';
        }
        
        if (!formData.registeredAddress) {
          newErrors.registeredAddress = 'Registered address is required';
        }
        
        if (!mobileVerified) {
          newErrors.mobile = 'Mobile number verification is required';
        }
        break;
        
      case 1: // Contact Details
        if (!formData.contactName) {
          newErrors.contactName = 'Contact name is required';
        }
        
        if (!formData.contactEmail) {
          newErrors.contactEmail = 'Contact email is required';
        } else if (!PATTERNS.EMAIL.test(formData.contactEmail)) {
          newErrors.contactEmail = 'Invalid email format';
        }
        
        if (formData.alternatePhone && !PATTERNS.MOBILE.test(formData.alternatePhone)) {
          newErrors.alternatePhone = 'Invalid Indian phone number';
        }
        
        if (!emailVerified) {
          newErrors.contactEmail = 'Email verification is required';
        }
        break;
        
      case 2: // Company Profile
        if (!formData.entityType) {
          newErrors.entityType = 'Entity type is required';
        }
        
        if (!formData.industrySector) {
          newErrors.industrySector = 'Industry sector is required';
        }
        break;
        
      case 3: // Bank Settlement
        if (!formData.accountNumber) {
          newErrors.accountNumber = 'Account number is required';
        } else if (formData.accountNumber.length < 9 || formData.accountNumber.length > 18) {
          newErrors.accountNumber = 'Account number must be 9-18 digits';
        }
        
        if (!formData.bankName) {
          newErrors.bankName = 'Bank name is required';
        }
        
        if (!formData.ifsc) {
          newErrors.ifsc = 'IFSC is required';
        } else if (!PATTERNS.IFSC.test(formData.ifsc)) {
          newErrors.ifsc = 'Invalid IFSC (e.g., SBIN0001234)';
        }
        break;
        
      case 4: // Security
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
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
  const sendOtp = async (type: 'mobile' | 'email') => {
    setOtpType(type);
    setSendingOtp(true);
    
    try {
      // Validate contact information first
      if (type === 'mobile' && !PATTERNS.MOBILE.test(formData.mobile)) {
        setErrors({
          ...errors,
          mobile: 'Please enter a valid mobile number'
        });
        setSendingOtp(false);
        return;
      }
      
      if (type === 'email' && !PATTERNS.EMAIL.test(formData.contactEmail)) {
        setErrors({
          ...errors,
          contactEmail: 'Please enter a valid email'
        });
        setSendingOtp(false);
        return;
      }
      
      // This would be an actual API call to send OTP
      // For demo, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear any previous OTP errors
      setOtpError('');
      
      // Reset OTP values
      if (type === 'mobile') {
        setMobileOtp('');
      } else {
        setEmailOtp('');
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
      const otp = otpType === 'mobile' ? mobileOtp : emailOtp;
      
      if (otp !== '123456') {
        setOtpError('Invalid OTP. Please try again.');
        setVerifyingOtp(false);
        return;
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otpType === 'mobile') {
        setMobileVerified(true);
      } else {
        setEmailVerified(true);
      }
      
      setOtpDialogOpen(false);
      setVerifyingOtp(false);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('Failed to verify OTP. Please try again.');
      setVerifyingOtp(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      setLoading(true);
      
      try {
        // This would be an actual API call to register the supplier
        // For demo, we'll simulate it
        // Remove confirmPassword from the data being sent to the API
        const { confirmPassword, ...supplierData } = formData;
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Supplier registration data:', supplierData);
        
        // Show success message
        setRegistrationSuccess(true);
        setLoading(false);
        
        // Navigate to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        console.error('Error registering supplier:', error);
        setLoading(false);
        // Handle error appropriately
      }
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
                Business Information
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Please enter your business PAN and basic information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="businessPan"
                label="Business PAN*"
                value={formData.businessPan}
                onChange={handleChange}
                error={!!errors.businessPan}
                helperText={errors.businessPan}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button 
                        size="small" 
                        onClick={fetchBusinessInfo} 
                        disabled={fetchingBusinessInfo}
                      >
                        {fetchingBusinessInfo ? <CircularProgress size={20} /> : 'Fetch Info'}
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
                error={!!errors.mobile}
                helperText={errors.mobile}
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button 
                        size="small" 
                        onClick={() => sendOtp('mobile')} 
                        disabled={sendingOtp || mobileVerified}
                        color={mobileVerified ? "success" : "primary"}
                      >
                        {sendingOtp && otpType === 'mobile' ? (
                          <CircularProgress size={20} />
                        ) : mobileVerified ? (
                          <>
                            <CheckCircle fontSize="small" />
                            &nbsp;Verified
                          </>
                        ) : (
                          'Verify'
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
                name="businessName"
                label="Business Name*"
                value={formData.businessName}
                onChange={handleChange}
                error={!!errors.businessName}
                helperText={errors.businessName}
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
                Contact Details
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
                        onClick={() => sendOtp('email')} 
                        disabled={sendingOtp || emailVerified}
                        color={emailVerified ? "success" : "primary"}
                      >
                        {sendingOtp && otpType === 'email' ? (
                          <CircularProgress size={20} />
                        ) : emailVerified ? (
                          <>
                            <CheckCircle fontSize="small" />
                            &nbsp;Verified
                          </>
                        ) : (
                          'Verify'
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
                name="alternatePhone"
                label="Alternate Phone (Optional)"
                value={formData.alternatePhone}
                onChange={handleChange}
                error={!!errors.alternatePhone}
                helperText={errors.alternatePhone}
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91</InputAdornment>,
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
                Company Profile
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Please provide additional details about your company
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.entityType}>
                <InputLabel>Entity Type*</InputLabel>
                <Select
                  name="entityType"
                  value={formData.entityType}
                  label="Entity Type*"
                  onChange={handleChange}
                >
                  {ENTITY_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors.entityType && <FormHelperText>{errors.entityType}</FormHelperText>}
              </FormControl>
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
                {errors.industrySector && <FormHelperText>{errors.industrySector}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
        );
        
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Bank Settlement Details
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Please provide your bank account details for settlements
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
                Note: Please ensure that the bank account is registered in the name of your business.
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
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password || "Password must be at least 8 characters"}
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
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                By registering, you agree to our <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>.
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
          Verify {otpType === 'mobile' ? 'Mobile Number' : 'Email'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {otpType === 'mobile'
              ? `Please enter the 6-digit OTP sent to your mobile number ${formData.mobile}`
              : `Please enter the 6-digit OTP sent to your email ${formData.contactEmail}`}
          </DialogContentText>
          <Box mt={2}>
            <TextField
              fullWidth
              label="Enter OTP"
              value={otpType === 'mobile' ? mobileOtp : emailOtp}
              onChange={(e) => {
                if (otpType === 'mobile') {
                  setMobileOtp(e.target.value);
                } else {
                  setEmailOtp(e.target.value);
                }
                setOtpError('');
              }}
              error={!!otpError}
              helperText={otpError}
              placeholder="123456"
              inputProps={{ maxLength: 6 }}
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="textSecondary">
              Didn't receive the OTP?
            </Typography>
            <Button
              onClick={() => sendOtp(otpType)}
              disabled={sendingOtp}
            >
              Resend OTP
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOtpDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={verifyOtp}
            color="primary"
            variant="contained"
            disabled={verifyingOtp || (otpType === 'mobile' ? mobileOtp.length !== 6 : emailOtp.length !== 6)}
          >
            {verifyingOtp ? <CircularProgress size={20} /> : 'Verify'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  // Success Dialog
  const renderSuccessDialog = () => {
    return (
      <Dialog open={registrationSuccess}>
        <DialogTitle>Registration Successful!</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            <CheckCircle color="success" style={{ fontSize: 60, marginBottom: 16 }} />
            <DialogContentText align="center">
              Your supplier account has been successfully created.
              <br />
              You will be redirected to the login page shortly.
            </DialogContentText>
          </Box>
        </DialogContent>
      </Dialog>
    );
  };
  
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Box mb={4} textAlign="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Supplier Registration
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Join our platform to access financing solutions for your business
          </Typography>
        </Box>
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel 
                StepIconProps={{ 
                  icon: step.icon 
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box mt={4} mb={4}>
          {getStepContent(activeStep)}
        </Box>
        
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={handleBack}
            startIcon={<ArrowBack />}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CheckCircle />}
              disabled={loading}
            >
              {loading ? 'Submitting' : 'Complete Registration'}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              endIcon={<ArrowForward />}
            >
              Next
            </Button>
          )}
        </Box>
        
        {/* Progress at the bottom of the form */}
        <Box mt={3} display="flex" justifyContent="center">
          <Typography variant="body2" color="textSecondary">
            Step {activeStep + 1} of {steps.length}
          </Typography>
        </Box>
      </Paper>
      
      {/* Already have an account? */}
      <Box textAlign="center" mt={2} mb={4}>
        <Typography variant="body1">
          Already have an account?{' '}
          <Link component="button" onClick={() => navigate('/login')}>
            Login here
          </Link>
        </Typography>
      </Box>
      
      {/* OTP Dialog */}
      {renderOtpDialog()}
      
      {/* Success Dialog */}
      {renderSuccessDialog()}
    </Container>
  );
};

export default SupplierRegister;