package com.codewithus.ledgerbridge.helper;

import com.codewithus.ledgerbridge.Repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class InvoiceIdGenerator {
    private static int counter = 1;
    private static final SecureRandom random = new SecureRandom();
    private static final String ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    @Autowired
    private InvoiceRepository invoiceRepository;
    public String extractContactNameFromUsername(String username) {

        if (username != null && username.startsWith("Supplier_")) {

            String[] parts = username.split("_");
            if (parts.length == 3) {
                return parts[1];
            }
        }
        return "XXXX";
    }
    private String extractPrefix(String contactName) {
        if (contactName == null || contactName.length() < 4) {
            return String.format("%-4s", contactName == null ? "" : contactName.toUpperCase()).replace(' ', 'X');
        }
        return contactName.substring(0, 4).toUpperCase();
    }

    private String generateRandomAlphanumeric(int length) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(ALPHANUMERIC.charAt(random.nextInt(ALPHANUMERIC.length())));
        }
        return sb.toString();
    }
    public String generateInvoiceId(String supplierUsername) {
        String contactName = extractContactNameFromUsername(supplierUsername);
        String prefix = supplierUsername.toUpperCase();
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        return prefix + "-INV-" + date + "-" + String.format("%04d", counter++);
    }
    public String generateUniqueInvoiceId(String username) {
        String invoiceId;
        String contactName = extractContactNameFromUsername(username);
        do {
            invoiceId = generateInvoiceId(contactName);
        } while (invoiceRepository.existsByInvoiceId(invoiceId));
        return invoiceId;
    }

}
