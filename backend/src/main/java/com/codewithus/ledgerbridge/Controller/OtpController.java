package com.codewithus.ledgerbridge.Controller;

import com.codewithus.ledgerbridge.Dto.OtpRequest;
import com.codewithus.ledgerbridge.Dto.OtpResponseDto;
import com.codewithus.ledgerbridge.Dto.OtpValidationRequest;
import com.codewithus.ledgerbridge.Service.MailService;
import com.codewithus.ledgerbridge.Service.SmsService;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.mail.MessagingException;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/otp")
@Slf4j
class OtpController {

    @Autowired
    private SmsService smsService;

    @Autowired
    private MailService mailService;
    @GetMapping("/process")
    public String processSMS() {
        return "SMS sent";
    }

    @PostMapping("/send-otp")
    public OtpResponseDto sendOtp(@RequestBody OtpRequest otpRequest) {
        log.info("inside sendOtp :: "+otpRequest.getUsername());
        return smsService.sendSMS(otpRequest);
    }
    @PostMapping("/validate-otp")
    public String validateOtp(@RequestBody OtpValidationRequest otpValidationRequest) {
        log.info("inside validateOtp :: "+otpValidationRequest.getUsername()+" "+otpValidationRequest.getOtpNumber());
        return smsService.validateOtp(otpValidationRequest);
    }



}
