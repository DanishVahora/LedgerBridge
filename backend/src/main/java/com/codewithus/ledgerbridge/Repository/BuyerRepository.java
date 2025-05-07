package com.codewithus.ledgerbridge.Repository;
import com.codewithus.ledgerbridge.Entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BuyerRepository extends JpaRepository<Buyer, Long> {
    Optional<Buyer> findByBuyerPan(String buyerPan);
    Optional<Buyer> findByContactEmail(String email);
    boolean existsBuyerByUserName(String userName);
    boolean existsByBuyerPan(String buyerPan);
    @Query("SELECT b FROM Buyer b WHERE b.userName = :usernameOrEmail OR b.contactEmail = :usernameOrEmail")
    Buyer findByUserNameOrContactEmail(@Param("usernameOrEmail") String usernameOrEmail);
    boolean existsByMobile(String mobile);
}
