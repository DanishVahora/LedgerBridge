package com.codewithus.ledgerbridge.Dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerifyRequest {
    @NotBlank
    String otp;
    @NotBlank String activationToken;
}
