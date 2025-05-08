package com.codewithus.ledgerbridge.Entity;


import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;


@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data

public class Notification {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private String recipientUsername; // e.g., financier's username


    @Column(nullable = false)
    private String message;


    @Column(nullable = false)
    private boolean seen = false;


    @Column(nullable = false)
    private LocalDateTime createdAt;
}
