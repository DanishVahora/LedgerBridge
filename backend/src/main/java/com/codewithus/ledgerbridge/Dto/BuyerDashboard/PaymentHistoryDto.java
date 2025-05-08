
package com.codewithus.ledgerbridge.Dto.BuyerDashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentHistoryDto {
    private String month;
    private double amount;
}