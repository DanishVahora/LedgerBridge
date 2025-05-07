package com.codewithus.ledgerbridge.Service;


import com.codewithus.ledgerbridge.Entity.Buyer;
import com.codewithus.ledgerbridge.Entity.Financier;
import com.codewithus.ledgerbridge.Repository.BuyerRepository;
import com.codewithus.ledgerbridge.Repository.FinancierRepository;
import com.codewithus.ledgerbridge.Repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import org.springframework.transaction.annotation.Transactional;


import java.util.UUID;


@Service
public class UserNameGenerator {


    @Autowired
    private BuyerRepository buyerRepository;
    @Autowired
    private FinancierRepository financierRepository;
    @Autowired
    private SupplierRepository supplierRepository;




    @Transactional
    public String generateUniqueUsernameForSupplier(String supplier) {
        String sanitizedBuyer = supplier.replaceAll("\\s+", "_");
        String username;
        do {
            username = "Supplier_" +sanitizedBuyer+"_"+ UUID.randomUUID().toString().substring(0, 8);
        } while (supplierRepository.existsSupplierByUserName(username));
        return username;
    }
    @Transactional
    public String generateUniqueUsernameForBuyer(String buyer) {
        String sanitizedBuyer = buyer.replaceAll("\\s+", "_");
        String username;
        do {
            username = "buyer_" +sanitizedBuyer+"_"+UUID.randomUUID().toString().substring(0, 8);
        } while (buyerRepository.existsBuyerByUserName(username));
        return username;
    }
    @Transactional
    public String generateUniqueUsernameForFinancier(String financier) {
        String sanitizedBuyer = financier.replaceAll("\\s+", "_");
        String username;
        do {
            username = "financier_" +sanitizedBuyer+"_"+ UUID.randomUUID().toString().substring(0, 8);
        } while (financierRepository.existsFinancierByUserName(username));
        return username;
    }






}
