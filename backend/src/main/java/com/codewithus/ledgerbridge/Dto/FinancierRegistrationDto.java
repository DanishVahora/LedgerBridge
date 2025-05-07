package com.codewithus.ledgerbridge.Dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinancierRegistrationDto {
    private String institutionPan;
    private String mobile;

    private String institutionName;
    private String rbiLicenseNumber;

    private String contactName;
    private String contactDesignation;
    private String contactEmail;
    private String contactPhone;

    private String accountNumber;
    private String bankName;
    private String ifsc;

    private String riskAppetite;
    private String creditLimitPerSupplier;

    private String password;
}
