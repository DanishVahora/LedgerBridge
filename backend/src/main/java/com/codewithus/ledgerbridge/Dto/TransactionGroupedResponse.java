package com.codewithus.ledgerbridge.Dto;


import com.codewithus.ledgerbridge.Entity.Transaction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionGroupedResponse {
    private List<Transaction> pendingTransactions;
    private List<Transaction> successTransactions;
}
