package com.codewithus.ledgerbridge.Service;


import com.codewithus.ledgerbridge.Dto.*;
import com.codewithus.ledgerbridge.Entity.*;
import com.codewithus.ledgerbridge.Repository.*;
import com.codewithus.ledgerbridge.Utility.JwtUtils;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class RegistrationService {
    private final SupplierRepository supplierRepo;
    private final BuyerRepository buyerRepo;
    private final FinancierRepository financierRepo;
    private final AdminRepository adminRepo;
    private final BCryptPasswordEncoder encoder;
    private final UserNameGenerator userNameGenerator;
    @Autowired
    private JwtUtils jwtUtils;
    public RegistrationService(SupplierRepository s, BuyerRepository b,
                               FinancierRepository f, AdminRepository a,
                               BCryptPasswordEncoder enc, UserNameGenerator userNameGenerator) {
        this.supplierRepo = s;
        this.buyerRepo    = b;
        this.financierRepo= f;
        this.adminRepo    = a;
        this.encoder      = enc;
        this.userNameGenerator = userNameGenerator;
    }


    public String verifySupplier(String activationToken, String otp) {
        Claims c = jwtUtils.parseToken(activationToken);
        if (!c.get("otp", String.class).equals(otp)) {
            throw new IllegalArgumentException("Invalid OTP");
        }
        Supplier s = new Supplier();
        s.setBusinessPan(c.get("businessPan", String.class));
        s.setMobile(c.get("mobile", String.class));
        s.setBusinessName(c.get("businessName", String.class));
        s.setGstin(c.get("gstin", String.class));
        s.setRegisteredAddress(c.get("registeredAddress", String.class));
        s.setContactName(c.get("contactName", String.class));
        s.setContactDesignation(c.get("contactDesignation", String.class));
        s.setContactEmail(c.get("contactEmail", String.class));
        s.setAlternatePhone(c.get("alternatePhone", String.class));
        s.setEntityType(c.get("entityType", String.class));
        s.setIndustrySector(c.get("industrySector", String.class));
        s.setAccountNumber(c.get("accountNumber", String.class));
        s.setBankName(c.get("bankName", String.class));
        s.setIfsc(c.get("ifsc", String.class));
        s.setUserName(c.get("userName", String.class));
        s.setPassword(c.get("password", String.class));
        s.setUserName(userNameGenerator.generateUniqueUsernameForSupplier(c.get("contactName", String.class)));
        supplierRepo.save(s);
        return s.getUserName();
    }


    public String verifyBuyer(String activationToken, String otp) {
        Claims c = jwtUtils.parseToken(activationToken);

        if (!c.get("otp", String.class).equals(otp)) {
            throw new IllegalArgumentException("Invalid OTP");
        }

        Buyer buyer = new Buyer();
        buyer.setBuyerPan(c.get("buyerPan", String.class));
        buyer.setGstin(c.get("gstin", String.class));
        buyer.setMobile(c.get("mobile", String.class));
        buyer.setCompanyName(c.get("companyName", String.class));
        buyer.setRegisteredAddress(c.get("registeredAddress", String.class));
        buyer.setContactName(c.get("contactName", String.class));
        buyer.setContactDesignation(c.get("contactDesignation", String.class));
        buyer.setContactEmail(c.get("contactEmail", String.class));
        buyer.setContactPhone(c.get("contactPhone", String.class));
        buyer.setIndustrySector(c.get("industrySector", String.class));
        buyer.setTurnoverBracket(c.get("turnoverBracket", String.class));
        buyer.setDesiredCreditLimit(c.get("desiredCreditLimit", String.class));
        buyer.setAccountNumber(c.get("accountNumber", String.class));
        buyer.setBankName(c.get("bankName", String.class));
        buyer.setIfsc(c.get("ifsc", String.class));
        buyer.setPassword(c.get("password", String.class));

        // Generate and set username
        String generatedUsername = userNameGenerator.generateUniqueUsernameForBuyer(c.get("contactName", String.class));
        buyer.setUserName(generatedUsername);

        // Save the buyer
        buyerRepo.save(buyer);

        return generatedUsername;
    }


    public String verifyFinancier(String activationToken, String otp) {
        Claims c = jwtUtils.parseToken(activationToken);

        if (!c.get("otp", String.class).equals(otp)) {
            throw new IllegalArgumentException("Invalid OTP");
        }

        Financier financier = new Financier();
        financier.setInstitutionPan(c.get("institutionPan", String.class));
        financier.setMobile(c.get("mobile", String.class));
        financier.setInstitutionName(c.get("institutionName", String.class));
        financier.setRbiLicenseNumber(c.get("rbiLicenseNumber", String.class));
        financier.setContactName(c.get("contactName", String.class));
        financier.setContactDesignation(c.get("contactDesignation", String.class));
        financier.setContactEmail(c.get("contactEmail", String.class));
        financier.setContactPhone(c.get("contactPhone", String.class));
        financier.setAccountNumber(c.get("accountNumber", String.class));
        financier.setBankName(c.get("bankName", String.class));
        financier.setIfsc(c.get("ifsc", String.class));
        financier.setRiskAppetite(c.get("riskAppetite", String.class));
        financier.setCreditLimitPerSupplier(c.get("creditLimitPerSupplier", String.class));
        financier.setPassword(c.get("password", String.class));

        // Generate username
        String generatedUsername = userNameGenerator.generateUniqueUsernameForFinancier(c.get("contactName", String.class));
        financier.setUserName(generatedUsername);

        // Save financier
        financierRepo.save(financier);

        return generatedUsername;
    }

    public void registerAdmin(AdminRegistrationDto dto) {
        if (adminRepo.existsByUsername(dto.getUsername())) {
            throw new IllegalArgumentException("Username already taken");
        }
        Admin a = new Admin();
        a.setFullName(dto.getFullName());
        a.setEmail(dto.getEmail());
        a.setUsername(dto.getUsername());
        a.setRole(dto.getRole());
        a.setPassword(encoder.encode(dto.getPassword()));
        adminRepo.save(a);
    }

    public boolean isSupplierPanExists(String pan) {
        return supplierRepo.existsByBusinessPan(pan);
    }

    public boolean isSupplierMobileExists(String mobile) {
        return supplierRepo.existsByMobile(mobile);
    }

    public boolean isBuyerPanExists(String pan) {
        return buyerRepo.existsByBuyerPan(pan);
    }

    public boolean isBuyerMobileExists(String mobile) {
        return buyerRepo.existsByMobile(mobile);
    }

    public boolean isFinancierPanExists(String pan) {
        return financierRepo.existsByInstitutionPan(pan);
    }

    public boolean isFinancierMobileExists(String phone) {
        return financierRepo.existsByMobile(phone);
    }
}
