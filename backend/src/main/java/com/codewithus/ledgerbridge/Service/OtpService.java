//package com.codewithus.ledgerbridge.Service;
//
//import jakarta.mail.Message;
//import lombok.Value;
//import org.springframework.stereotype.Service;
//
//@Service
//class OtpService {
//    @Value("${twilio.account_sid}")
//    private String accountSid;
//
//    @Value("${twilio.auth_token}")
//    private String authToken;
//
//    @Value(staticConstructor = "${twilio.phone_number}")
//    private String PhoneNumber;
//
//    public boolean sendOtp(String to, String otp){
//        Twilio.init(accountSid,authToken);
//        try{
//            Message.creator(new PhoneNumber(to),new PhoneNumber(twillioPhoneNumber),"Your OTP is:"+ otp).create();
//            return true;
//        }catch (Exception e){
//            e.printStackTrace();
//            return false;
//        }
//    }
//
//}
