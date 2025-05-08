package com.codewithus.ledgerbridge.Dto;


import com.codewithus.ledgerbridge.Dto.BuyerDashboard.*;
import lombok.Data;
import java.util.List;


@Data
public class BuyerDashboardDto {
    private  StatsCardDto[] statsCards;
    private List<PaymentHistoryDto> paymentHistory;
    private List<PaymentDistributionDto> paymentDistribution;
    private List<PendingInvoiceDto> pendingInvoices;
    private List<ApprovedInvoiceDto> approvedInvoices;
    private List<RejectedInvoiceDto> rejectedInvoices;
}
