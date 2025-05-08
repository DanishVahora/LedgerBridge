package com.codewithus.ledgerbridge.Dto.BuyerDashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatsCardDto {
    private String title;
    private String value;
    private String subtext;
    private String iconType;
    private String trend;
}