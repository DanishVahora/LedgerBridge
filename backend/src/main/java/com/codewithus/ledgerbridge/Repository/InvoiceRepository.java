package com.codewithus.ledgerbridge.Repository;

import com.codewithus.ledgerbridge.Entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    Optional<Invoice> findByInvoiceId(String invoiceId);
    List<Invoice> findBySupplierusernameOrBuyerusername(String supplierusername, String buyerusername);
    boolean existsByInvoiceId(String invoiceNumber);
    List<Invoice> findByStatus(Invoice.InvoiceStatus status);
    List<Invoice> findBySupplierusernameAndStatus(String supplierUsername, Invoice.InvoiceStatus status);

}
