package com.codewithus.ledgerbridge.Controller;

import com.codewithus.ledgerbridge.Dto.*;
import com.codewithus.ledgerbridge.Dto.BuyerDashboard.*;
import com.codewithus.ledgerbridge.Entity.Invoice;
import com.codewithus.ledgerbridge.Entity.Supplier;
import com.codewithus.ledgerbridge.Repository.BuyerRepository;
import com.codewithus.ledgerbridge.Repository.InvoiceRepository;
import com.codewithus.ledgerbridge.Repository.SupplierRepository;
import org.springframework.web.bind.annotation.*;
import java.util.Base64;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/buyers")
public class BuyerController {

    private final BuyerRepository buyerRepo;
    private final InvoiceRepository invoiceRepo;
    private final SupplierRepository supplierRepo;

    public BuyerController(BuyerRepository buyerRepo,
                           InvoiceRepository invoiceRepo,
                           SupplierRepository supplierRepo) {
        this.buyerRepo = buyerRepo;
        this.invoiceRepo = invoiceRepo;
        this.supplierRepo = supplierRepo;
    }

    @GetMapping
    public List<BuyerDto> getAllBuyers() {
        return buyerRepo.findAll()
                .stream()
                .map(b -> new BuyerDto(
                        b.getId(),
                        b.getUserName(),
                        b.getCompanyName()
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/{buyerUsername}/dashboard")
    public BuyerDashboardDto getBuyerDashboard(@PathVariable String buyerUsername) {

        LocalDate now = LocalDate.now();
        LocalDate sixMonthsAgo = now.minusMonths(6);

        // Fetch invoices for this buyer
        List<Invoice> invoices = invoiceRepo.findByBuyerusername(buyerUsername);
        List<Invoice> recentInvoices = invoiceRepo.findByBuyerusernameAndUploadDateAfter(buyerUsername, sixMonthsAgo);

        // Prepare dashboard data
        BuyerDashboardDto dashboard = new BuyerDashboardDto();

        // 1. Stats Cards
        dashboard.setStatsCards(prepareStatsCards(invoices, recentInvoices));

        // 2. Payment History (last 6 months)
        dashboard.setPaymentHistory(preparePaymentHistory(recentInvoices));

        // 3. Payment Distribution
        dashboard.setPaymentDistribution(preparePaymentDistribution(invoices));

        // 4. Pending Invoices
        dashboard.setPendingInvoices(preparePendingInvoices(invoices));

        // 5. Approved Invoices
        dashboard.setApprovedInvoices(prepareApprovedInvoices(invoices));

        // 6. Rejected Invoices
        dashboard.setRejectedInvoices(prepareRejectedInvoices(invoices));

        return dashboard;
    }

    private StatsCardDto[] prepareStatsCards(List<Invoice> allInvoices, List<Invoice> recentInvoices) {
        StatsCardDto[] cards = new StatsCardDto[4];

        BigDecimal totalPayable = allInvoices.stream()
                .filter(i -> i.getStatus() == Invoice.InvoiceStatus.APPROVED)
                .map(Invoice::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long pendingCount = allInvoices.stream()
                .filter(i -> i.getStatus() == Invoice.InvoiceStatus.PENDING)
                .count();

        BigDecimal dueThisMonth = allInvoices.stream()
                .filter(i -> i.getStatus() == Invoice.InvoiceStatus.APPROVED)
                .filter(i -> i.getDueDate().getMonth() == LocalDate.now().getMonth())
                .map(Invoice::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal creditLimit = new BigDecimal("2500000");
        double utilizationPercentage = (totalPayable.doubleValue() / creditLimit.doubleValue()) * 100;

        cards[0] = new StatsCardDto("Total Payable", "₹" + formatAmount(totalPayable), "+8.5% vs last month", "dollar", "up");
        cards[1] = new StatsCardDto("Pending Approvals", String.valueOf(pendingCount), pendingCount > 0 ? "2 urgent" : "All clear", "clock", "neutral");
        cards[2] = new StatsCardDto("Due This Month", "₹" + formatAmount(dueThisMonth), getInvoiceCountForMonth(allInvoices, LocalDate.now().getMonthValue()) + " invoices", "calendar", "up");
        cards[3] = new StatsCardDto("Credit Utilization", String.format("%.0f%%", utilizationPercentage), "of ₹25L limit", "credit-card", utilizationPercentage > 70 ? "up" : "down");

        return cards;
    }

    private List<PaymentHistoryDto> preparePaymentHistory(List<Invoice> recentInvoices) {
        Map<YearMonth, BigDecimal> monthlyPayments = recentInvoices.stream()
                .filter(i -> i.getStatus() == Invoice.InvoiceStatus.APPROVED)
                .collect(Collectors.groupingBy(
                        i -> YearMonth.from(i.getUploadDate()),
                        Collectors.reducing(BigDecimal.ZERO, Invoice::getAmount, BigDecimal::add)
                ));

        LocalDate now = LocalDate.now();
        List<PaymentHistoryDto> history = new ArrayList<>();

        for (int i = 5; i >= 0; i--) {
            YearMonth month = YearMonth.from(now.minusMonths(i));
            String monthName = month.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
            BigDecimal amount = monthlyPayments.getOrDefault(month, BigDecimal.ZERO);

            PaymentHistoryDto dto = new PaymentHistoryDto();
            dto.setMonth(monthName);
            dto.setAmount(amount.doubleValue());
            history.add(dto);
        }

        return history;
    }

    private List<PaymentDistributionDto> preparePaymentDistribution(List<Invoice> invoices) {
        List<Invoice> approvedInvoices = invoices.stream()
                .filter(i -> i.getStatus() == Invoice.InvoiceStatus.APPROVED)
                .collect(Collectors.toList());

        long totalApproved = approvedInvoices.size();
        if (totalApproved == 0) {
            return Collections.singletonList(new PaymentDistributionDto("No Approved Invoices", 100, "#CCCCCC"));
        }

        LocalDate today = LocalDate.now();
        long onTime = approvedInvoices.stream()
                .filter(i -> !today.isAfter(i.getDueDate()))
                .count();
        long late = approvedInvoices.stream()
                .filter(i -> today.isAfter(i.getDueDate()) && ChronoUnit.DAYS.between(i.getDueDate(), today) <= 30)
                .count();
        long overdue = approvedInvoices.stream()
                .filter(i -> ChronoUnit.DAYS.between(i.getDueDate(), today) > 30)
                .count();

        return Arrays.asList(
                new PaymentDistributionDto("On Time", (int) onTime, "#006A71"),
                new PaymentDistributionDto("Late", (int) late, "#FFA500"),
                new PaymentDistributionDto("Overdue", (int) overdue, "#FF4444")
        );
    }

    private List<PendingInvoiceDto> preparePendingInvoices(List<Invoice> invoices) {
        // Fetch supplier details in bulk
        Set<String> sellerUsernames = invoices.stream()
                .filter(i -> i.getStatus() == Invoice.InvoiceStatus.PENDING)
                .map(Invoice::getSupplierusername)
                .collect(Collectors.toSet());
        Map<String, Supplier> supplierMap = supplierRepo.findByUserNameIn(sellerUsernames)
                .stream()
                .collect(Collectors.toMap(Supplier::getUserName, s -> s));

        return invoices.stream()
                .filter(i -> i.getStatus() == Invoice.InvoiceStatus.PENDING)
                .map(i -> {
                    Supplier supplier = supplierMap.get(i.getSupplierusername());
                    String companyName = supplier != null ? supplier.getBusinessName() : "Unknown";
                    byte[] docBytes = i.getInvoiceDocument();
                    String encodedPdf = (docBytes != null)
                            ? Base64.getEncoder().encodeToString(docBytes)
                            : null;
                    return new PendingInvoiceDto(
                            i.getInvoiceId(),
                            i.getSupplierusername(),
                            "₹" + formatAmount(i.getAmount()),
                            i.getDueDate().toString(),
                            i.getStatus().toString(),
                            companyName,
                            encodedPdf,
                            i.isFactoring()
                    );
                })
                .collect(Collectors.toList());
    }

    private List<ApprovedInvoiceDto> prepareApprovedInvoices(List<Invoice> invoices) {
        Set<String> sellers = invoices.stream()
                .filter(i -> i.getStatus() == Invoice.InvoiceStatus.APPROVED)
                .map(Invoice::getSupplierusername)
                .collect(Collectors.toSet());
        Map<String, Supplier> supplierMap = supplierRepo.findByUserNameIn(sellers)
                .stream().collect(Collectors.toMap(Supplier::getUserName, s -> s));

        return invoices.stream()
                .filter(i -> i.getStatus() == Invoice.InvoiceStatus.APPROVED)
                .map(i -> {
                    Supplier sup = supplierMap.get(i.getSupplierusername());
                    String company = sup != null ? sup.getBusinessName() : "Unknown";
                    byte[] docBytes = i.getInvoiceDocument();
                    String encodedPdf = (docBytes != null)
                            ? Base64.getEncoder().encodeToString(docBytes)
                            : null;
                    return new ApprovedInvoiceDto(
                            i.getInvoiceId(),
                            i.getSupplierusername(),

                            "₹" + formatAmount(i.getAmount()),
                            i.getUploadDate().toString(),
                            i.getStatus().toString(),
                            company,
                            encodedPdf,
                            i.isFactoring()
                    );
                })
                .collect(Collectors.toList());
    }

    private List<RejectedInvoiceDto> prepareRejectedInvoices(List<Invoice> invoices) {
        Set<String> sellers = invoices.stream()
                .filter(i -> i.getStatus() == Invoice.InvoiceStatus.REJECTED)
                .map(Invoice::getSupplierusername)
                .collect(Collectors.toSet());
        Map<String, Supplier> supplierMap = supplierRepo.findByUserNameIn(sellers)
                .stream().collect(Collectors.toMap(Supplier::getUserName, s -> s));

        return invoices.stream()
                .filter(i -> i.getStatus() == Invoice.InvoiceStatus.REJECTED)
                .map(i -> {
                    Supplier sup = supplierMap.get(i.getSupplierusername());
                    String company = sup != null ? sup.getBusinessName() : "Unknown";
                    byte[] docBytes = i.getInvoiceDocument();
                    String encodedPdf = (docBytes != null)
                            ? Base64.getEncoder().encodeToString(docBytes)
                            : null;
                    return new RejectedInvoiceDto(
                            i.getInvoiceId(),
                            i.getSupplierusername(),
                            "₹" + formatAmount(i.getAmount()),
                            i.getUploadDate().toString(),
                            i.getStatus().toString(),
                            company,
                            encodedPdf,
                            i.isFactoring()
                    );
                })
                .collect(Collectors.toList());
    }

    private String formatAmount(BigDecimal amount) {
        if (amount == null) return "0";
        if (amount.compareTo(new BigDecimal("100000")) >= 0) {
            return String.format("%.1fL", amount.divide(new BigDecimal("100000")).doubleValue());
        } else {
            return String.format("%,.0f", amount.doubleValue());
        }
    }

    private String getInvoiceCountForMonth(List<Invoice> invoices, int month) {
        long count = invoices.stream()
                .filter(i -> i.getDueDate().getMonthValue() == month)
                .count();
        return String.valueOf(count);
    }
}
