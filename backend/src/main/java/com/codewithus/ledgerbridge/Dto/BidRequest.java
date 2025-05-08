
package com.codewithus.ledgerbridge.Dto;


import lombok.Getter;
import lombok.Setter;


import java.math.BigDecimal;


@Getter
@Setter
public class BidRequest {


    private Long financierId;
    private BigDecimal bidAmount;
    private BigDecimal discountRate;
    private String validityPeriod;
    private String terms;
}
