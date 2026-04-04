package com.studhunt_ai.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String recipientEmail;
    private String senderEmail;
    private String notificationType; // LIKE, COMMENT, REACTION
    private String message;
    private Long postId;
    private boolean isRead = false;
    private LocalDateTime createdAt;

    public Notification(String recipientEmail, String senderEmail, String notificationType, String message, Long postId) {
        this.recipientEmail = recipientEmail;
        this.senderEmail = senderEmail;
        this.notificationType = notificationType;
        this.message = message;
        this.postId = postId;
        this.createdAt = LocalDateTime.now();
    }
}
