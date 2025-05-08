package com.codewithus.ledgerbridge.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Entity
@Table(name = "bids")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link to invoice
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;

    // Link to financier
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "financier_id", nullable = false)
    private Financier financier;

    @NotNull(message = "Bid amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be positive")
    @Digits(integer = 13, fraction = 2)
    private BigDecimal bidAmount;

    @NotNull(message = "Discount rate is required")
    @DecimalMin(value = "0.1", message = "Minimum discount rate is 0.1%")
    @DecimalMax(value = "100.0", message = "Max discount rate is 100%")
    private BigDecimal discountRate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BidStatus status;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public enum BidStatus {
        PENDING,
        ACCEPTED,
        REJECTED
    }
    @Column(name = "credited_to")
    private String creditedTo; // Either "Buyer" or "Supplier"
}
