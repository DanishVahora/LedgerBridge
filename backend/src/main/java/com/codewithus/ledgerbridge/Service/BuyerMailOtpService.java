package com.codewithus.ledgerbridge.Service;

import com.codewithus.ledgerbridge.Dto.BuyerRegistrationDto;
import com.codewithus.ledgerbridge.Entity.Buyer;
import com.codewithus.ledgerbridge.Repository.BuyerRepository;
import com.codewithus.ledgerbridge.Utility.JwtUtils;
import jakarta.mail.MessagingException;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

@Service
public class BuyerMailOtpService {

    @Autowired
    private BuyerRepository buyerRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MailService mailService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserNameGenerator userNameGenerator;

    public String initiateRegistration(BuyerRegistrationDto dto) throws MessagingException {
        // Check if PAN already registered
        if (buyerRepo.existsByBuyerPan(dto.getBuyerPan())) {
            throw new RuntimeException("PAN already registered");
        }

        // Prepare JWT claims
        Map<String, Object> claims = new HashMap<>();
        claims.put("buyerPan", dto.getBuyerPan());
        claims.put("gstin", dto.getGstin());
        claims.put("mobile", dto.getMobile());
        claims.put("companyName", dto.getCompanyName());
        claims.put("registeredAddress", dto.getRegisteredAddress());
        claims.put("contactName", dto.getContactName());
        claims.put("contactDesignation", dto.getContactDesignation());
        claims.put("contactEmail", dto.getContactEmail());
        claims.put("contactPhone", dto.getContactPhone());
        claims.put("industrySector", dto.getIndustrySector());
        claims.put("turnoverBracket", dto.getTurnoverBracket());
        claims.put("desiredCreditLimit", dto.getDesiredCreditLimit());
        claims.put("accountNumber", dto.getAccountNumber());
        claims.put("bankName", dto.getBankName());
        claims.put("ifsc", dto.getIfsc());
        claims.put("password", passwordEncoder.encode(dto.getPassword()));

        // Generate OTP
        String otp = String.format("%06d", new SecureRandom().nextInt(1_000_000));
        claims.put("otp", otp);

        // Generate token
        String token = jwtUtils.generateToken(claims);

        // Send OTP
        mailService.sendOtpEmail(dto.getContactEmail(), dto.getContactName(), otp);

        return token;
    }
}