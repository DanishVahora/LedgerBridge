package com.codewithus.ledgerbridge.Repository;



import com.codewithus.ledgerbridge.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
    Optional<Admin> findByUsername(String username);
    boolean existsByUsername(String username);
    @Query("SELECT a FROM Admin a WHERE a.username = :usernameOrEmail OR a.email = :usernameOrEmail")
    Admin findByUsernameOrEmail(@Param("usernameOrEmail") String usernameOrEmail);
}
