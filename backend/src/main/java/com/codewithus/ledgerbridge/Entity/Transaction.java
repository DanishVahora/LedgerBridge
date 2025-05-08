package com.codewithus.ledgerbridge.Entity;


import jakarta.persistence.*;
import lombok.*;


import java.math.BigDecimal;
import java.time.LocalDateTime;


@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "bid_id", nullable = false)
    private Long bidId; // Store only the ID


    @Column(name = "invoice_id", nullable = false)
    private Long invoiceId; // Store only the ID


    @Column(name = "financier_username", nullable = false)
    private String financierUsername; // Store only the username


    @Column(nullable = false)
    private BigDecimal bidAmount;


    @Column(nullable = false)
    private BigDecimal discountRate;


    @Column(nullable = false)
    private String creditedTo; // "Buyer" or "Supplier"


    @Column(nullable = false)
    private LocalDateTime transactionTime;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionStatus status;


    public enum TransactionStatus {
        SUCCESS, PENDING, FAILED
    }
    @Column
    private String notes;
}

