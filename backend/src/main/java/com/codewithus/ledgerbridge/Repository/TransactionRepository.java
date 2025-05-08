package com.codewithus.ledgerbridge.Repository;


import com.codewithus.ledgerbridge.Entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
