package com.codewithus.ledgerbridge.Controller;


import com.codewithus.ledgerbridge.Entity.Bid;
import com.codewithus.ledgerbridge.Entity.Financier;
import com.codewithus.ledgerbridge.Entity.Invoice;
import com.codewithus.ledgerbridge.Repository.BidRepository;
import com.codewithus.ledgerbridge.Repository.FinancierRepository;
import com.codewithus.ledgerbridge.Repository.InvoiceRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/bids")
@RequiredArgsConstructor
public class BidController {


    private final BidRepository bidRepository;
    private final InvoiceRepository invoiceRepository;
    private final FinancierRepository financierRepository;


    // 1. Place a Bid
    @PostMapping
    public ResponseEntity<?> placeBid(@Valid @RequestBody Bid bidRequest) {
        Optional<Invoice> invoiceOpt = invoiceRepository.findById(bidRequest.getInvoice().getId());
        Optional<Financier> financierOpt = financierRepository.findById(bidRequest.getFinancier().getId());


        if (invoiceOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invoice not found");
        }


        if (financierOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Financier not found");
        }


        Bid bid = Bid.builder()
                .invoice(invoiceOpt.get())
                .financier(financierOpt.get())
                .bidAmount(bidRequest.getBidAmount())
                .discountRate(bidRequest.getDiscountRate())
                .status(Bid.BidStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();


        return ResponseEntity.ok(bidRepository.save(bid));
    }


    // 2. Get All Bids
    @GetMapping
    public ResponseEntity<List<Bid>> getAllBids() {
        return ResponseEntity.ok(bidRepository.findAll());
    }


    // 3. Get Bids by Invoice ID
    @GetMapping("/invoice/{invoiceId}")
    public ResponseEntity<?> getBidsByInvoice(@PathVariable Long invoiceId) {
        Optional<Invoice> invoiceOpt = invoiceRepository.findById(invoiceId);
        if (invoiceOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invoice not found");
        }
        return ResponseEntity.ok(bidRepository.findByInvoice(invoiceOpt.get()));
    }


    // 4. Get Bids by Financier ID
    @GetMapping("/financier/{financierId}")
    public ResponseEntity<?> getBidsByFinancier(@PathVariable Long financierId) {
        Optional<Financier> financierOpt = financierRepository.findById(financierId);
        if (financierOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Financier not found");
        }


        return ResponseEntity.ok(bidRepository.findAll().stream()
                .filter(bid -> bid.getFinancier().getId().equals(financierId))
                .toList());
    }


    // 5. Update Bid Status
    @PatchMapping("/{bidId}/status")
    public ResponseEntity<?> updateBidStatus(@PathVariable Long bidId,
                                             @RequestParam Bid.BidStatus status) {
        Optional<Bid> bidOpt = bidRepository.findById(bidId);
        if (bidOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Bid not found");
        }


        Bid bid = bidOpt.get();
        bid.setStatus(status);
        return ResponseEntity.ok(bidRepository.save(bid));
    }
}
