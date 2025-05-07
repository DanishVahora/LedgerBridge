package com.codewithus.ledgerbridge.Service;

import com.codewithus.ledgerbridge.Dto.InvoiceActionDto;
import com.codewithus.ledgerbridge.Dto.InvoiceCreateDto;
import com.codewithus.ledgerbridge.Dto.InvoiceDto;
import com.codewithus.ledgerbridge.Entity.Invoice;

import java.util.List;

public interface InvoiceService {
    InvoiceDto createInvoice(InvoiceCreateDto dto);
    List<InvoiceDto> getInvoicesByUsername(String username);
    InvoiceDto getInvoiceByInvoiceId(String invoiceId);
    List<Invoice> getAllApprovedInvoices();

    InvoiceDto approveInvoice(String invoiceId, InvoiceActionDto action);
    InvoiceDto rejectInvoice(String invoiceId, InvoiceActionDto action);
}
