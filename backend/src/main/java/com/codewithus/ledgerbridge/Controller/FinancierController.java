package com.codewithus.ledgerbridge.Controller;


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


    // 1. View all approved invoices
    @GetMapping("/invoices")
    public ResponseEntity<List<Invoice>> getAllApprovedInvoices() {
        List<Invoice> invoices = invoiceRepository.findByStatus(Invoice.InvoiceStatus.APPROVED);
        return ResponseEntity.ok(invoices);
    }


    // 2. Place a bid on a specific invoice
    @PostMapping("/invoices/{invoiceId}/bid")
    public ResponseEntity<?> placeBid(
            @PathVariable Long invoiceId,
            @RequestParam Long financierId,
            @RequestParam BigDecimal bidAmount,
            @RequestParam BigDecimal discountRate
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


        Optional<Financier> financierOpt = financierRepository.findById(financierId);
        if (financierOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Financier not found");
        }


        Financier financier = financierOpt.get();


        // Create the bid
        Bid bid = Bid.builder()
                .invoice(invoice)
                .financier(financier)
                .bidAmount(bidAmount)
                .discountRate(discountRate)
                .status(Bid.BidStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .creditedTo(invoice.isFactoring() ? "Supplier" : "Buyer")
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


}
