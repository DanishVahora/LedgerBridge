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


    // Reference to the bid
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bid_id", nullable = false)
    private Bid bid;


    // Reference to invoice (optional, but helpful)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;


    // Reference to the financier who funded
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "financier_id", nullable = false)
    private Financier financier;


    @Column(nullable = false)
    private BigDecimal bidAmount;


    @Column(nullable = false)
    private BigDecimal discountRate;


    @Column(nullable = false)
    private String creditedTo; // "Buyer" or "Supplier"


    @Column(nullable = false)
    private LocalDateTime transactionTime;


    @Column
    private String notes; // Optional field to log any additional data or remarks
}
