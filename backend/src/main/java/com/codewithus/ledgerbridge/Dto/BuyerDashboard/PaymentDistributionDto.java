package com.codewithus.ledgerbridge.Dto.BuyerDashboard;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDistributionDto {
    private String name;
    private int value;
    private String color;
}
