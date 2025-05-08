package com.codewithus.ledgerbridge.Repository;


import com.codewithus.ledgerbridge.Entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;


public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    boolean existsByBusinessPan(String pan);
    boolean existsSupplierByUserName(String userName);
    @Query("SELECT s FROM Supplier s WHERE s.userName = :usernameOrEmail OR s.contactEmail = :usernameOrEmail")
    Supplier findByUserNameOrContactEmail(@Param("usernameOrEmail") String usernameOrEmail);


    boolean existsByMobile(String mobile);
    List<Supplier> findByUserNameIn(Set<String> usernames);
}
