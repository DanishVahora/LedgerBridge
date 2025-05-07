package com.codewithus.ledgerbridge.Service;

import com.codewithus.ledgerbridge.Config.TwilioConfig;
import com.codewithus.ledgerbridge.Dto.OtpRequest;
import com.codewithus.ledgerbridge.Dto.OtpResponseDto;
import com.codewithus.ledgerbridge.Dto.OtpStatus;
import com.codewithus.ledgerbridge.Dto.OtpValidationRequest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.twilio.type.PhoneNumber;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import com.twilio.rest.api.v2010.account.Message;

@Service
@Slf4j
public class SmsService {
    @Autowired
    private TwilioConfig twilioConfig;

    private final Map<String, String> otpMap = new HashMap<>();

    public OtpResponseDto sendSMS(OtpRequest otpRequest) {
        OtpResponseDto otpResponseDto;
        try {
            PhoneNumber to = new PhoneNumber(otpRequest.getPhoneNumber());
            PhoneNumber from = new PhoneNumber(twilioConfig.getPhoneNumber());

            String otp = generateOTP();
            String otpMessage = "Dear Customer, Your OTP is " + otp + ". Thank you for using our service.";

            Message.creator(to, from, otpMessage).create();

            otpMap.put(otpRequest.getUsername(), otp);

            otpResponseDto = new OtpResponseDto(OtpStatus.DELIVERED, otpMessage);
        } catch (Exception e) {

            e.printStackTrace();
            otpResponseDto = new OtpResponseDto(OtpStatus.FAILED, "Error: " + e.getMessage());
        }
        return otpResponseDto;
    }

    public String validateOtp(OtpValidationRequest otpValidationRequest) {
        String storedOtp = otpMap.get(otpValidationRequest.getUsername());
        if (storedOtp != null && storedOtp.equals(otpValidationRequest.getOtpNumber())) {
            otpMap.remove(otpValidationRequest.getUsername());
            return "OTP is valid!";
        }
        return "OTP is invalid!";
    }

    private String generateOTP() {
        return new DecimalFormat("000000").format(new Random().nextInt(999999));
    }

}
