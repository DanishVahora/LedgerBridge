package com.codewithus.ledgerbridge.Repository;


import com.codewithus.ledgerbridge.Entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    Optional<Invoice> findByInvoiceId(String invoiceId);
    List<Invoice> findBySupplierusernameOrBuyerusername(String supplierusername, String buyerusername);
    boolean existsByInvoiceId(String invoiceNumber);
    List<Invoice> findByStatus(Invoice.InvoiceStatus status);
    List<Invoice> findBySupplierusernameAndStatus(String supplierUsername, Invoice.InvoiceStatus status);
    List<Invoice> findTop10BySupplierusernameOrderByUploadDateDesc(String supplierusername);


    // New methods for buyer invoices
    List<Invoice> findByBuyerusername(String buyerUsername);
    List<Invoice> findByBuyerusernameAndUploadDateAfter(String buyerUsername, LocalDate date);
    @Query("SELECT i FROM Invoice i WHERE i.status = 'APPROVED' AND i.id NOT IN (SELECT b.invoice.id FROM Bid b)")
    List<Invoice> findApprovedInvoicesWithoutBids();


    // Additional useful queries
    @Query("SELECT i FROM Invoice i WHERE i.buyerusername = :buyerUsername AND i.dueDate BETWEEN :startDate AND :endDate")
    List<Invoice> findInvoicesByBuyerAndDueDateRange(
            @Param("buyerUsername") String buyerUsername,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );


    @Query("SELECT SUM(i.amount) FROM Invoice i WHERE i.buyerusername = :buyerUsername AND i.status = :status")
    Double sumAmountByBuyerAndStatus(
            @Param("buyerUsername") String buyerUsername,
            @Param("status") Invoice.InvoiceStatus status
    );


    @Query("SELECT COUNT(i) FROM Invoice i WHERE i.buyerusername = :buyerUsername AND i.status = :status")
    Long countByBuyerAndStatus(
            @Param("buyerUsername") String buyerUsername,
            @Param("status") Invoice.InvoiceStatus status
    );
}
