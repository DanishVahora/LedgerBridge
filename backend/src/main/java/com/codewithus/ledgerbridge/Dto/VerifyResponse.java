package com.codewithus.ledgerbridge.Dto;

import lombok.Data;

@Data
public class VerifyResponse {
    private String message;
    private String userId;
    private String role;
}