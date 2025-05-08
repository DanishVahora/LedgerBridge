
package com.codewithus.ledgerbridge.helper;

import com.codewithus.ledgerbridge.Dto.InvoiceCreateDto;
import com.codewithus.ledgerbridge.Dto.InvoiceDto;
import com.codewithus.ledgerbridge.Entity.Invoice;

import java.io.IOException;

public class InvoiceMapper {

    public static Invoice toEntity(InvoiceCreateDto dto) {
        byte[] documentBytes = null;
        if (dto.getInvoiceDocument() != null && !dto.getInvoiceDocument().isEmpty()) {
            try {
                documentBytes = dto.getInvoiceDocument().getBytes();
            } catch (IOException e) {
                throw new RuntimeException("Failed to read invoice document", e);
            }
        }

        return Invoice.builder()
                .invoiceId(dto.getInvoiceId())
                .supplierusername(dto.getSupplierusername())
                .buyerusername(dto.getBuyerusername())
                .amount(dto.getAmount())
                .dueDate(dto.getDueDate())
                .uploadDate(dto.getUploadDate())
                .remarks(dto.getRemarks())
                .invoiceDocument(documentBytes)
                .status(Invoice.InvoiceStatus.PENDING)
                .factoring(dto.isFactoringType())
                .build();
    }

    public static InvoiceDto toDto(Invoice inv) {
        return InvoiceDto.builder()
                .id(inv.getId())
                .invoiceId(inv.getInvoiceId())
                .supplierusername(inv.getSupplierusername())
                .buyerusername(inv.getBuyerusername())
                .amount(inv.getAmount())
                .dueDate(inv.getDueDate())
                .uploadDate(inv.getUploadDate())
                .status(inv.getStatus())
                .remarks(inv.getRemarks())
                .invoiceDocument(inv.getInvoiceDocument())
                .approvedDate(inv.getApprovedDate())
                .approvedBy(inv.getApprovedBy())
                .build();
    }

}
