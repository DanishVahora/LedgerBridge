package com.codewithus.ledgerbridge.Dto;

import lombok.Data;

@Data
public class RegisterResponse {
    private String message;
    private String activationToken;
}
