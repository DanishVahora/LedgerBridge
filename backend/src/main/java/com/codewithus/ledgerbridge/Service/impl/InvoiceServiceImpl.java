
package com.codewithus.ledgerbridge.Service.impl;

import com.codewithus.ledgerbridge.Dto.InvoiceActionDto;
import com.codewithus.ledgerbridge.Dto.InvoiceRecentDto;
import com.codewithus.ledgerbridge.Entity.Buyer;
import com.codewithus.ledgerbridge.Repository.BuyerRepository;
import com.codewithus.ledgerbridge.Service.InvoiceService;
import com.codewithus.ledgerbridge.Dto.InvoiceCreateDto;
import com.codewithus.ledgerbridge.Dto.InvoiceDto;
import com.codewithus.ledgerbridge.Entity.Invoice;
import com.codewithus.ledgerbridge.Repository.InvoiceRepository;
import com.codewithus.ledgerbridge.helper.AccessDeniedException;
import com.codewithus.ledgerbridge.helper.InvoiceIdGenerator;
import com.codewithus.ledgerbridge.helper.InvoiceMapper;
import com.codewithus.ledgerbridge.helper.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final InvoiceIdGenerator invoiceIdGenerator;
    private final BuyerRepository buyerRepository;
    @Autowired
    public InvoiceServiceImpl(InvoiceRepository invoiceRepository,
                              InvoiceIdGenerator invoiceIdGenerator, BuyerRepository buyerRepository) {
        this.invoiceRepository = invoiceRepository;
        this.invoiceIdGenerator  = invoiceIdGenerator;

        this.buyerRepository = buyerRepository;
    }


    public List<Invoice> getAllApprovedInvoices() {
        return invoiceRepository.findByStatus(Invoice.InvoiceStatus.APPROVED);
    }


    @Override
    public InvoiceDto createInvoice(InvoiceCreateDto dto){

        String invoiceId = invoiceIdGenerator
                .generateUniqueInvoiceId(dto.getSupplierusername());
        dto.setInvoiceId(invoiceId);


        Invoice saved = invoiceRepository.save(
                InvoiceMapper.toEntity(dto)
        );
        return InvoiceMapper.toDto(saved);
    }


    @Override
    public List<InvoiceDto> getInvoicesByUsername(String username) {
        List<Invoice> invoices = invoiceRepository
                .findBySupplierusernameOrBuyerusername(username, username);
        return invoices.stream()
                .map(InvoiceMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceDto getInvoiceByInvoiceId(String invoiceId) {
        Invoice inv = invoiceRepository.findByInvoiceId(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice", "invoiceId", invoiceId));
        return InvoiceMapper.toDto(inv);
    }

    @Override
    public InvoiceDto approveInvoice(String invoiceId, InvoiceActionDto action){
        Invoice inv = invoiceRepository.findByInvoiceId(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice", "invoiceId", invoiceId));

        if (!inv.getBuyerusername().equals(action.getBuyerusername())) {
            throw new AccessDeniedException("Only the designated buyer can approve this invoice");
        }

        inv.setStatus(Invoice.InvoiceStatus.APPROVED);
        inv.setApprovedBy(action.getBuyerusername());
        inv.setApprovedDate(LocalDate.now());
        inv.setRemarks(action.getRemark());

        Invoice updated = invoiceRepository.save(inv);
        return InvoiceMapper.toDto(updated);
    }

    @Override
    public InvoiceDto rejectInvoice(String invoiceId, InvoiceActionDto action) {
        Invoice inv = invoiceRepository.findByInvoiceId(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice", "invoiceId", invoiceId));

        if (!inv.getBuyerusername().equals(action.getBuyerusername())) {
            throw new AccessDeniedException("Only the designated buyer can reject this invoice");
        }

        inv.setStatus(Invoice.InvoiceStatus.REJECTED);
        inv.setApprovedBy(action.getBuyerusername());
        inv.setApprovedDate(LocalDate.now());
        inv.setRemarks(action.getRemark());

        Invoice updated = invoiceRepository.save(inv);
        return InvoiceMapper.toDto(updated);
    }

    @Override
    public List<InvoiceRecentDto> getRecentInvoices(String supplierUsername) {

        return invoiceRepository.findTop10BySupplierusernameOrderByUploadDateDesc(supplierUsername)
                .stream()
                .map(inv -> {
                    Buyer buyer = buyerRepository.findByUserNameOrContactEmail(inv.getBuyerusername());
                    return new InvoiceRecentDto(
                            inv.getInvoiceId(),
                            buyer.getCompanyName(),
                            inv.getAmount(),
                            inv.getStatus(),
                            inv.getUploadDate()
                    );
                })
                .collect(Collectors.toList());
    }
}
