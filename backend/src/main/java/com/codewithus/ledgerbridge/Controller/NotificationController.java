package com.codewithus.ledgerbridge.Controller;


import com.codewithus.ledgerbridge.Entity.Notification;
import com.codewithus.ledgerbridge.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/api/notifications")
public class NotificationController {


    @Autowired
    private NotificationRepository notificationRepository;


    // ✅ Get unseen notifications for a financier
    @GetMapping("/{username}")
    public ResponseEntity<List<Notification>> getUnseenNotifications(@PathVariable String username) {
        return ResponseEntity.ok(notificationRepository.findByRecipientUsernameAndSeenFalse(username));
    }


    // ✅ Optional: Mark all notifications as seen
    @PutMapping("/{username}/mark-seen")
    public ResponseEntity<String> markAllSeen(@PathVariable String username) {
        List<Notification> notifications = notificationRepository.findByRecipientUsernameAndSeenFalse(username);
        notifications.forEach(n -> n.setSeen(true));
        notificationRepository.saveAll(notifications);
        return ResponseEntity.ok("Notifications marked as seen.");
    }
}
