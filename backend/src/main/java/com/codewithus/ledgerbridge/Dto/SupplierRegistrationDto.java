package com.codewithus.ledgerbridge.Dto;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor
public class SupplierRegistrationDto {
    private String businessPan;
    private String mobile;
    private String businessName;
    private String gstin;
    private String registeredAddress;
    private String contactName;
    private String contactDesignation;
    private String contactEmail;
    private String alternatePhone;
    private String entityType;
    private String industrySector;
    private String accountNumber;
    private String bankName;
    private String ifsc;
    private String password;
}
