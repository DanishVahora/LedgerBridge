package com.codewithus.ledgerbridge.Dto;

import lombok.*;
import jakarta.validation.constraints.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceCreateDto {
    private String invoiceId;
    private String supplierusername;
    private String buyerusername;
    private BigDecimal amount;
    private LocalDate dueDate;
    private boolean factoringType;
    private LocalDate uploadDate;
    private String remarks;
    private MultipartFile invoiceDocument;
}
