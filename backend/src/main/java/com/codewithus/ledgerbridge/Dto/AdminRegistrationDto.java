package com.codewithus.ledgerbridge.Dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminRegistrationDto {
    private String fullName;
    private String email;
    private String username;
    private String role;    // SUPPORT, AUDITOR, etc.
    private String password;
}
