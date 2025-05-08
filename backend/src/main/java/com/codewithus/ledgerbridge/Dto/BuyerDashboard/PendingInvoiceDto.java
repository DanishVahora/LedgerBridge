package com.codewithus.ledgerbridge.Dto.BuyerDashboard;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PendingInvoiceDto {
    private String id;
    private String seller;
    private String amount;
    private String dueDate;
    private String status;
    private String sellerCompany;
    private String invoiceDocument;
    private boolean factoring;
}
