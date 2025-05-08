package com.codewithus.ledgerbridge.Repository;


import com.codewithus.ledgerbridge.Entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;


public interface TransactionRepository extends JpaRepository<Transaction, Long> {


    List<Transaction> findByStatusOrderByTransactionTimeDesc(Transaction.TransactionStatus status);
}
