package com.codewithus.ledgerbridge.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "suppliers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userName=null ;

    @NotBlank(message = "PAN is required")
    @Pattern(regexp = "[A-Z]{5}[0-9]{4}[A-Z]{1}", message = "Invalid PAN format (e.g., ABCDE1234F)")
    private String businessPan;

    @NotBlank(message = "Mobile is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid Indian mobile number")
    private String mobile;

    // Auto-Fetched Company Details
    @NotBlank(message = "Business name is required")
    @Size(max = 100, message = "Name must be ≤ 100 characters")
    private String businessName;

    @NotBlank(message = "GSTIN is required")
    @Pattern(regexp = "\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}\\d[Z]{1}[A-Z\\d]{1}",
            message = "Invalid GSTIN format")
    private String gstin;

    @NotBlank(message = "Registered address is required")
    @Size(max = 200, message = "Address must be ≤ 200 characters")
    private String registeredAddress;

    // Contact Person
    @NotBlank(message = "Contact name is required")
    @Size(max = 50, message = "Name must be ≤ 50 characters")
    private String contactName;

    @Size(max = 50, message = "Designation must be ≤ 50 characters")
    private String contactDesignation;

    @NotBlank(message = "Contact email is required")
    @Email(message = "Invalid email format")
    private String contactEmail;

    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid Indian phone number")
    private String alternatePhone;

    // Company Profile
    @NotBlank(message = "Entity type is required")
    private String entityType;

    @NotBlank(message = "Industry sector is required")
    private String industrySector;

    // Bank-Settlement
    @NotBlank(message = "Account number is required")
    @Size(min = 9, max = 18, message = "Account number must be 9-18 digits")
    private String accountNumber;

    @NotBlank(message = "Bank name is required")
    @Size(max = 50, message = "Bank name must be ≤ 50 characters")
    private String bankName;

    @NotBlank(message = "IFSC is required")
    @Pattern(regexp = "^[A-Z]{4}0[A-Z0-9]{6}$", message = "Invalid IFSC (e.g., SBIN0001234)")
    private String ifsc;

    // Credentials
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be ≥ 8 characters")
    private String password;
}