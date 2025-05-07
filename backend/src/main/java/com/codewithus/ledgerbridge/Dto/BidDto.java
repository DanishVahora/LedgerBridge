package com.codewithus.ledgerbridge.Dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BidDto {
    private Long invoiceId;
    private BigDecimal bidAmount;
    private BigDecimal discountRate;
    private Long financierId;
}
