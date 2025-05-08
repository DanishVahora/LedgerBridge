package com.codewithus.ledgerbridge.Controller;


import com.codewithus.ledgerbridge.Dto.BidRequest;
import com.codewithus.ledgerbridge.Dto.TransactionGroupedResponse;
import com.codewithus.ledgerbridge.Entity.*;
import com.codewithus.ledgerbridge.Repository.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/financier")
@RequiredArgsConstructor
public class FinancierController {


    private final InvoiceRepository invoiceRepository;
    private final FinancierRepository financierRepository;
    private final BidRepository bidRepository;


    private final TransactionRepository transactionRepository;
    // 1. View all approved invoices
    @GetMapping("/invoices")
    public ResponseEntity<List<Invoice>> getAllApprovedInvoices() {
        List<Invoice> invoices = invoiceRepository.findByStatus(Invoice.InvoiceStatus.APPROVED);
        return ResponseEntity.ok(invoices);
    }


    // 2. Place a bid on a specific invoice
    @PostMapping("/invoices/{invoiceId}/{username}/bid")
    public ResponseEntity<?> placeBid(
            @PathVariable Long invoiceId,
            @PathVariable String username,
            @RequestBody BidRequest bidRequest
    ) {
        Optional<Invoice> invoiceOpt = invoiceRepository.findById(invoiceId);
        if (invoiceOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invoice not found");
        }


        Invoice invoice = invoiceOpt.get();


        if (invoice.getStatus() != Invoice.InvoiceStatus.APPROVED) {
            return ResponseEntity.badRequest().body("Cannot bid on unapproved invoices");
        }


        // Only one bid allowed
        List<Bid> existingBids = bidRepository.findByInvoiceId(invoiceId);
        if (!existingBids.isEmpty()) {
            return ResponseEntity.badRequest().body("A bid already exists for this invoice");
        }


        Optional<Financier> financierOpt = financierRepository.findByUserName(username);
        if (financierOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Financier not found");
        }


        Financier financier = financierOpt.get();


        // Create the bid and save it
        Bid bid = Bid.builder()
                .invoice(invoice)
                .fusername(username)
                .bidAmount(bidRequest.getBidAmount())
                .discountRate(bidRequest.getDiscountRate())
                .status(Bid.BidStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .creditedTo(invoice.isFactoring() ? "Supplier" : "Buyer")
                .validityPeriod(bidRequest.getValidityPeriod())  // Save validity period
                .terms(bidRequest.getTerms())                    // Save terms
                .build();


        bidRepository.save(bid);


        return ResponseEntity.ok("Bid placed successfully");
    }


    // 3. View only approved invoices with no bids
    @GetMapping("/invoices/available")
    public ResponseEntity<List<Invoice>> getAvailableInvoicesForBidding() {
        List<Invoice> invoices = invoiceRepository.findApprovedInvoicesWithoutBids();
        return ResponseEntity.ok(invoices);
    }


    @GetMapping("/grouped")
    public ResponseEntity<TransactionGroupedResponse> getGroupedTransactions() {
        List<Transaction> pending = transactionRepository.findByStatusOrderByTransactionTimeDesc(Transaction.TransactionStatus.PENDING);
        List<Transaction> success = transactionRepository.findByStatusOrderByTransactionTimeDesc(Transaction.TransactionStatus.SUCCESS);


        TransactionGroupedResponse response = new TransactionGroupedResponse(pending, success);
        return ResponseEntity.ok(response);
    }
}
