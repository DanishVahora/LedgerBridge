package com.codewithus.ledgerbridge.Service;

import com.codewithus.ledgerbridge.Dto.BidDto;
import com.codewithus.ledgerbridge.Entity.Bid;
import com.codewithus.ledgerbridge.Entity.Financier;
import com.codewithus.ledgerbridge.Entity.Invoice;
import com.codewithus.ledgerbridge.Repository.BidRepository;
import com.codewithus.ledgerbridge.Repository.FinancierRepository;
import com.codewithus.ledgerbridge.Repository.InvoiceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BidService {

    private final InvoiceRepository invoiceRepository;
    private final FinancierRepository financierRepository;
    private final BidRepository bidRepository;

    public Bid placeBid(BidDto request) {
        Invoice invoice = invoiceRepository.findById(request.getInvoiceId())
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        if (invoice.getStatus() != Invoice.InvoiceStatus.APPROVED) {
            throw new RuntimeException("Cannot bid on unapproved invoices");
        }

        Financier financier = financierRepository.findById(request.getFinancierId())
                .orElseThrow(() -> new RuntimeException("Financier not found"));

        Bid bid = Bid.builder()
                .invoice(invoice)
                .financier(financier)
                .bidAmount(request.getBidAmount())
                .discountRate(request.getDiscountRate())
                .status(Bid.BidStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        return bidRepository.save(bid);
    }

    public List<Bid> getBidsForSupplier(String supplierUsername) {
        List<Invoice> invoices = invoiceRepository.findBySupplierusernameAndStatus(
                supplierUsername, Invoice.InvoiceStatus.APPROVED
        );

        List<Bid> bids = new ArrayList<>();
        for (Invoice invoice : invoices) {
            bids.addAll(bidRepository.findByInvoice(invoice));
        }

        return bids;
    }
    @Transactional
    public void acceptBid(Long bidId) {
        Bid selectedBid = bidRepository.findById(bidId)
                .orElseThrow(() -> new RuntimeException("Bid not found"));

        Invoice invoice = selectedBid.getInvoice();

        // Reject other bids
        List<Bid> allBids = bidRepository.findByInvoice(invoice);
        for (Bid bid : allBids) {
            if (!bid.getId().equals(bidId)) {
                bid.setStatus(Bid.BidStatus.REJECTED);
                bidRepository.save(bid);
            }
        }

        // Accept selected bid
        selectedBid.setStatus(Bid.BidStatus.ACCEPTED);
        selectedBid.getInvoice().setStatus(Invoice.InvoiceStatus.APPROVED); // or DISBURSED if needed
        bidRepository.save(selectedBid);
    }

    public void rejectBid(Long bidId) {
        Bid bid = bidRepository.findById(bidId)
                .orElseThrow(() -> new RuntimeException("Bid not found"));

        bid.setStatus(Bid.BidStatus.REJECTED);
        bidRepository.save(bid);
    }

}

