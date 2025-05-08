package com.codewithus.ledgerbridge.Dto;

import com.codewithus.ledgerbridge.Entity.Invoice;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceRecentDto {
    private String invoiceId;
    private String companyName;
    private BigDecimal amount;
    private Invoice.InvoiceStatus status;
    private LocalDate uploadDate;
}
