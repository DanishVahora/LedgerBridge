package com.codewithus.ledgerbridge.Controller;

import com.codewithus.ledgerbridge.Dto.BidDto;
import com.codewithus.ledgerbridge.Entity.Bid;
import com.codewithus.ledgerbridge.Service.BidService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bid")
public class BidController {
    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }
    @GetMapping("/supplier/{username}")
    public ResponseEntity<?> getBidsForSupplier(@PathVariable String username) {
        List<Bid> bids = bidService.getBidsForSupplier(username);
        return ResponseEntity.ok(bids);
    }

    @PostMapping("/place")
    public ResponseEntity<?> placeBid(@RequestBody @Valid BidDto request) {
        Bid placedBid = bidService.placeBid(request);
        return ResponseEntity.ok(placedBid);
    }

    @PutMapping("/{bidId}/accept")
    public ResponseEntity<?> acceptBid(@PathVariable Long bidId) {
        bidService.acceptBid(bidId);
        return ResponseEntity.ok("Bid accepted successfully.");
    }

//    @PutMapping("/{bidId}/reject")
//    public ResponseEntity<?> rejectBid(@PathVariable Long bidId) {
//        bidService.rejectBid(bidId);
//        return ResponseEntity.ok("Bid rejected successfully.");
//    }


}
