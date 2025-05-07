package com.codewithus.ledgerbridge.Dto;
import  lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto {
    // Getters and Setters
    private String usernameOrEmail;
    private String password;

}