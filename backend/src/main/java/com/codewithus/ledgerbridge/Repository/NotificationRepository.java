package com.codewithus.ledgerbridge.Repository;


import com.codewithus.ledgerbridge.Entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;


public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipientUsernameAndSeenFalse(String recipientUsername);
}
