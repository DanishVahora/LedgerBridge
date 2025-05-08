package com.codewithus.ledgerbridge.Dto.BuyerDashboard;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApprovedInvoiceDto {
    private String id;
    private String seller;
    private String amount;
    private String dueDate;
    private String status;
    private String sellerCompany;
    private String invoiceDocument;
    private boolean factoring;
}
