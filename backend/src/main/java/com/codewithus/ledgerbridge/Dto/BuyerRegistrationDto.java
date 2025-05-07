package com.codewithus.ledgerbridge.Dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BuyerRegistrationDto {
    private String buyerPan;
    private String gstin;
    private String mobile;

    private String companyName;
    private String registeredAddress;

    private String contactName;
    private String contactDesignation;
    private String contactEmail;
    private String contactPhone;

    private String industrySector;
    private String turnoverBracket;
    private String desiredCreditLimit;

    private String accountNumber;
    private String bankName;
    private String ifsc;

    private String password;
}
