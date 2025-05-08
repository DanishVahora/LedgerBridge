package com.codewithus.ledgerbridge.Repository;

import com.codewithus.ledgerbridge.Entity.Financier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FinancierRepository extends JpaRepository<Financier, Long> {
    Optional<Financier> findByInstitutionPan(String institutionPan);
    Optional<Financier> findByContactEmail(String email);
    boolean existsFinancierByUserName(String userName);
    boolean existsByInstitutionPan(String institutionPan);
    @Query("SELECT f FROM Financier f WHERE f.userName = :usernameOrEmail OR f.contactEmail = :usernameOrEmail")
    Financier findByUserNameOrContactEmail(@Param("usernameOrEmail") String usernameOrEmail);

    boolean existsByMobile(String phone);

    Optional<Financier> findByUserName(String username);
}
