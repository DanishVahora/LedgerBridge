package com.codewithus.ledgerbridge.Repository;

import com.codewithus.ledgerbridge.Entity.Bid;
import com.codewithus.ledgerbridge.Entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findByInvoiceId(Long invoiceId);
    List<Bid> findByInvoice(Invoice invoice);

}

