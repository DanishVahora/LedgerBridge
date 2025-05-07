package com.codewithus.ledgerbridge.Dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerifyDto {
    @NotBlank String activationToken;
    @NotBlank String otp;
}

