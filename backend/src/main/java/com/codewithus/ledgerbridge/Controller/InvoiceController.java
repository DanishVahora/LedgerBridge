package com.codewithus.ledgerbridge.Controller;
import com.codewithus.ledgerbridge.Dto.InvoiceActionDto;
import com.codewithus.ledgerbridge.Dto.InvoiceRecentDto;
import com.codewithus.ledgerbridge.Entity.Invoice;
import com.codewithus.ledgerbridge.Service.InvoiceService;
import com.codewithus.ledgerbridge.Dto.InvoiceCreateDto;
import com.codewithus.ledgerbridge.Dto.InvoiceDto;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    @Autowired
    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    // 1) Create
    @PostMapping(
            path = "/create",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<InvoiceDto> createInvoice(
            @Valid @ModelAttribute InvoiceCreateDto dto) {

        InvoiceDto created = invoiceService.createInvoice(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    // 2) List all for a given username (supplier or buyer)
    @GetMapping("/user/{username}")
    public ResponseEntity<List<InvoiceDto>> listByUser(
            @PathVariable String username) {
        return ResponseEntity.ok(
                invoiceService.getInvoicesByUsername(username)
        );
    }

    @GetMapping("/approved")
    public ResponseEntity<List<Invoice>> getApprovedInvoices() {
        List<Invoice> invoices = invoiceService.getAllApprovedInvoices();
        return ResponseEntity.ok(invoices);
    }
    // 3) Get one by invoiceId
    @GetMapping("/{invoiceId}")
    public ResponseEntity<InvoiceDto> getByInvoiceId(
            @PathVariable String invoiceId) {
        return ResponseEntity.ok(
                invoiceService.getInvoiceByInvoiceId(invoiceId)
        );
    }

    @PatchMapping("/{invoiceId}/approve")
    public ResponseEntity<InvoiceDto> approveInvoice(
            @PathVariable String invoiceId,
            @Valid @RequestBody InvoiceActionDto action) {
        InvoiceDto updated = invoiceService.approveInvoice(invoiceId, action);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{invoiceId}/reject")
    public ResponseEntity<InvoiceDto> rejectInvoice(
            @PathVariable String invoiceId,
            @Valid @RequestBody InvoiceActionDto action) {
        InvoiceDto updated = invoiceService.rejectInvoice(invoiceId, action);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/recent/{supplierUsername}")
    public List<InvoiceRecentDto> getRecent(@PathVariable String supplierUsername) {
        System.out.println("inside controller");
        return invoiceService.getRecentInvoices(supplierUsername);
    }

}
