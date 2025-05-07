package com.codewithus.ledgerbridge.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import org.jetbrains.annotations.NotNull;
import org.springframework.validation.annotation.Validated;

@Entity
@Table(name = "buyers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Buyer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName ;

    @NotBlank(message = "PAN is required")
    @Pattern(regexp = "[A-Z]{5}[0-9]{4}[A-Z]{1}", message = "PAN must be valid (e.g., ABCDE1234F)")
    private String buyerPan;

    @NotBlank(message = "GSTIN is required")
    @Pattern(regexp = "\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}\\d[Z]{1}[A-Z\\d]{1}", message = "GSTIN must be valid")
    private String gstin;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Mobile must be a valid 10-digit Indian number")
    private String mobile;

    @NotBlank(message = "Company name is required")
    @Size(max = 100, message = "Company name must be ≤ 100 characters")
    private String companyName;

    @NotBlank(message = "Registered address is required")
    @Size(max = 200, message = "Address must be ≤ 200 characters")
    private String registeredAddress;

    @NotBlank(message = "Contact name is required")
    @Size(max = 50, message = "Contact name must be ≤ 50 characters")
    private String contactName;

    @Size(max = 50, message = "Designation must be ≤ 50 characters")
    private String contactDesignation;

    @NotBlank(message = "Contact email is required")
    @Email(message = "Email must be valid")
    private String contactEmail;

    @NotBlank(message = "Contact phone is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Phone must be a valid 10-digit Indian number")
    private String contactPhone;

    @NotBlank(message = "Industry sector is required")
    private String industrySector;

    @NotBlank(message = "Turnover bracket is required")
    private String turnoverBracket;

    @NotBlank(message = "Desired credit limit is required")
    private String desiredCreditLimit;

    @NotBlank(message = "Account number is required")
    @Size(min = 9, max = 18, message = "Account number must be 9-18 digits")
    private String accountNumber;

    @NotBlank(message = "Bank name is required")
    @Size(max = 50, message = "Bank name must be ≤ 50 characters")
    private String bankName;

    @NotBlank(message = "IFSC is required")
    @Pattern(regexp = "^[A-Z]{4}0[A-Z0-9]{6}$", message = "IFSC must be valid (e.g., SBIN0001234)")
    private String ifsc;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be ≥ 8 characters")
    private String password;
}