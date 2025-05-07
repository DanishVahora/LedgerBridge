package com.codewithus.ledgerbridge.Entity;



import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "invoices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, unique = true)
    private String invoiceId;

    @NotBlank(message = "Supplier ID is required")
    private String supplierusername;

    @NotBlank(message = "Buyer ID is required")
    private String buyerusername;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than 0")
    @Digits(integer = 13, fraction = 2, message = "Amount must be a valid monetary value")
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @NotNull(message = "Due date is required")
    @FutureOrPresent(message = "Due date must be today or a future date")
    @Column(nullable = false)
    private LocalDate dueDate;

    @NotNull(message = "Upload date is required")
    @PastOrPresent(message = "Upload date cannot be in the future")
    @Column(nullable = false)
    private LocalDate uploadDate;

    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    private InvoiceStatus status;

    @Size(max = 500, message = "Remarks must not exceed 500 characters")
    @Column(length = 500)
    private String remarks;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] invoiceDocument;

    @PastOrPresent(message = "Approved date must be today or in the past")
    private LocalDate approvedDate;

    @Size(max = 100, message = "ApprovedBy must not exceed 100 characters")
    private String approvedBy;

    public enum InvoiceStatus {
        PENDING,
        APPROVED,
        REJECTED
    }
}
