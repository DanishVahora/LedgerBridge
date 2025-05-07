package com.codewithus.ledgerbridge.Dto;

import com.codewithus.ledgerbridge.Entity.Invoice;
import lombok.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceDto {

    private Long id;

    @NotBlank(message = "Invoice ID is required")
    private String invoiceId;

    @NotBlank(message = "Supplier username is required")
    private String supplierusername;

    @NotBlank(message = "Buyer username is required")
    private String buyerusername;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than 0")
    @Digits(integer = 13, fraction = 2, message = "Amount must be a valid monetary value")
    private BigDecimal amount;

    @NotNull(message = "Due date is required")
    @FutureOrPresent(message = "Due date must be today or a future date")
    private LocalDate dueDate;

    @NotNull(message = "Upload date is required")
    @PastOrPresent(message = "Upload date cannot be in the future")
    private LocalDate uploadDate;

    @NotNull(message = "Status is required")
    private Invoice.InvoiceStatus status;

    @Size(max = 500, message = "Remarks must not exceed 500 characters")
    private String remarks;

    private byte[] invoiceDocument;

    @PastOrPresent(message = "Approved date must be today or in the past")
    private LocalDate approvedDate;

    @Size(max = 100, message = "ApprovedBy must not exceed 100 characters")
    private String approvedBy;
}
