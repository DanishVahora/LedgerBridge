package com.codewithus.ledgerbridge.Service;

import com.codewithus.ledgerbridge.Dto.SupplierRegistrationDto;
import com.codewithus.ledgerbridge.Repository.SupplierRepository;
import com.codewithus.ledgerbridge.Service.MailService;
import com.codewithus.ledgerbridge.Utility.JwtUtils;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

@Service
public class SupplierMailOtpService {
    @Autowired
    private SupplierRepository supplierRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private MailService mailService;
    @Autowired
    private JwtUtils jwtUtils;

    public String initiateRegistration(SupplierRegistrationDto dto) throws MessagingException {
        // 1. Check for existing mobile or PAN
        if (supplierRepo.existsByBusinessPan(dto.getBusinessPan())) {
            throw new RuntimeException("PAN already registered");
        }

        // 2. Build JWT claims
        Map<String, Object> claims = new HashMap<>();
        claims.put("businessPan", dto.getBusinessPan());
        claims.put("mobile", dto.getMobile());
        claims.put("businessName", dto.getBusinessName());
        claims.put("gstin", dto.getGstin());
        claims.put("registeredAddress", dto.getRegisteredAddress());
        claims.put("contactName", dto.getContactName());
        claims.put("contactDesignation", dto.getContactDesignation());
        claims.put("contactEmail", dto.getContactEmail());
        claims.put("alternatePhone", dto.getAlternatePhone());
        claims.put("entityType", dto.getEntityType());
        claims.put("industrySector", dto.getIndustrySector());
        claims.put("accountNumber", dto.getAccountNumber());
        claims.put("bankName", dto.getBankName());
        claims.put("ifsc", dto.getIfsc());
        // Hash password
        claims.put("password", passwordEncoder.encode(dto.getPassword()));

        // 3. Generate OTP
        String otp = String.format("%06d", new SecureRandom().nextInt(1_000_000));
        claims.put("otp", otp);
        String token = jwtUtils.generateToken(claims);

        // 5. Send OTP
        mailService.sendOtpEmail(dto.getContactEmail(), dto.getContactName(), otp);

        return token;
    }
}

