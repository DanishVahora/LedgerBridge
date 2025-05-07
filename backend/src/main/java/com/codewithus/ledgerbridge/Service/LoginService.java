package com.codewithus.ledgerbridge.Service;


import com.codewithus.ledgerbridge.Dto.LoginDto;
import com.codewithus.ledgerbridge.Entity.Admin;
import com.codewithus.ledgerbridge.Entity.Buyer;
import com.codewithus.ledgerbridge.Entity.Financier;
import com.codewithus.ledgerbridge.Entity.Supplier;
import com.codewithus.ledgerbridge.Repository.AdminRepository;
import com.codewithus.ledgerbridge.Repository.BuyerRepository;
import com.codewithus.ledgerbridge.Repository.FinancierRepository;
import com.codewithus.ledgerbridge.Repository.SupplierRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    private final SupplierRepository supplierRepo;
    private final BuyerRepository buyerRepo;
    private final FinancierRepository financierRepo;
    private final AdminRepository adminRepo;
    private final BCryptPasswordEncoder encoder;

    public LoginService(SupplierRepository s, BuyerRepository b,
                        FinancierRepository f, AdminRepository a,
                        BCryptPasswordEncoder enc) {
        this.supplierRepo = s;
        this.buyerRepo    = b;
        this.financierRepo= f;
        this.adminRepo    = a;
        this.encoder      = enc;
    }


    public Object authenticate(LoginDto loginDto) {
        // Try to find user in all repositories
        Admin admin = adminRepo.findByUsernameOrEmail(loginDto.getUsernameOrEmail());
        Buyer buyer = buyerRepo.findByUserNameOrContactEmail(loginDto.getUsernameOrEmail());
        Supplier supplier = supplierRepo.findByUserNameOrContactEmail(loginDto.getUsernameOrEmail());
        Financier financier = financierRepo.findByUserNameOrContactEmail(loginDto.getUsernameOrEmail());

        // Check credentials for each user type
        if (admin != null && encoder.matches(loginDto.getPassword(), admin.getPassword())) {
            return admin;
        }
        if (buyer != null && encoder.matches(loginDto.getPassword(), buyer.getPassword())) {
            return buyer;
        }
        if (supplier != null && encoder.matches(loginDto.getPassword(), supplier.getPassword())) {
            return supplier;
        }
        if (financier != null && encoder.matches(loginDto.getPassword(), financier.getPassword())) {
            return financier;
        }

        throw new RuntimeException("Invalid username/email or password");
    }
}



