package com.codewithus.ledgerbridge.Service;

import com.codewithus.ledgerbridge.Dto.FinancierRegistrationDto;
import com.codewithus.ledgerbridge.Entity.Financier;
import com.codewithus.ledgerbridge.Repository.FinancierRepository;
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
public class FinancierMailOtpService {

    @Autowired
    private FinancierRepository financierRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MailService mailService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserNameGenerator userNameGenerator;

    public String initiateRegistration(FinancierRegistrationDto dto) throws MessagingException {
        if (financierRepo.existsByInstitutionPan(dto.getInstitutionPan())) {
            throw new RuntimeException("PAN already registered");
        }

        // Build claims from DTO
        Map<String, Object> claims = new HashMap<>();
        claims.put("institutionPan", dto.getInstitutionPan());
        claims.put("mobile", dto.getMobile());
        claims.put("institutionName", dto.getInstitutionName());
        claims.put("rbiLicenseNumber", dto.getRbiLicenseNumber());
        claims.put("contactName", dto.getContactName());
        claims.put("contactDesignation", dto.getContactDesignation());
        claims.put("contactEmail", dto.getContactEmail());
        claims.put("contactPhone", dto.getContactPhone());
        claims.put("accountNumber", dto.getAccountNumber());
        claims.put("bankName", dto.getBankName());
        claims.put("ifsc", dto.getIfsc());
        claims.put("riskAppetite", dto.getRiskAppetite());
        claims.put("creditLimitPerSupplier", dto.getCreditLimitPerSupplier());
        claims.put("password", passwordEncoder.encode(dto.getPassword()));

        // Generate OTP and token
        String otp = String.format("%06d", new SecureRandom().nextInt(1_000_000));
        claims.put("otp", otp);
        String token = jwtUtils.generateToken(claims);

        // Send OTP email
        mailService.sendOtpEmail(dto.getContactEmail(), dto.getContactName(), otp);

        return token;
    }
}