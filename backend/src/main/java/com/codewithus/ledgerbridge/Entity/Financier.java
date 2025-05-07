package com.codewithus.ledgerbridge.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "financiers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Financier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userName ;
    @NotBlank(message = "PAN is required")
    @Pattern(regexp = "[A-Z]{5}[0-9]{4}[A-Z]{1}", message = "Invalid PAN format (e.g., ABCDE1234F)")
    private String institutionPan;

    @NotBlank(message = "Mobile is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid Indian mobile number")
    private String mobile;

    @NotBlank(message = "Institution name is required")
    @Size(max = 100, message = "Name must be ≤ 100 characters")
    private String institutionName;

    @NotBlank(message = "RBI license number is required")
    @Size(min = 10, max = 20, message = "License number must be 10-20 characters")
    private String rbiLicenseNumber;

    @NotBlank(message = "Contact name is required")
    @Size(max = 50, message = "Name must be ≤ 50 characters")
    private String contactName;

    @Size(max = 50, message = "Designation must be ≤ 50 characters")
    private String contactDesignation;

    @NotBlank(message = "Contact email is required")
    @Email(message = "Invalid email format")
    private String contactEmail;

    @NotBlank(message = "Contact phone is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid Indian phone number")
    private String contactPhone;

    @NotBlank(message = "Account number is required")
    @Size(min = 9, max = 18, message = "Account number must be 9-18 digits")
    private String accountNumber;

    @NotBlank(message = "Bank name is required")
    @Size(max = 50, message = "Bank name must be ≤ 50 characters")
    private String bankName;

    @NotBlank(message = "IFSC is required")
    @Pattern(regexp = "^[A-Z]{4}0[A-Z0-9]{6}$", message = "Invalid IFSC (e.g., SBIN0001234)")
    private String ifsc;

    @NotBlank(message = "Risk appetite is required")
    private String riskAppetite;

    @NotBlank(message = "Credit limit is required")
//    @Pattern(regexp = "^\\d+(\\.\\d{1,2})?$", message = "Invalid amount format")
    private String creditLimitPerSupplier;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be ≥ 8 characters")
    private String password;
}