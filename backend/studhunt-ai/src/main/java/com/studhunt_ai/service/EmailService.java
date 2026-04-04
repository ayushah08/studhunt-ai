package com.studhunt_ai.service;

import com.studhunt_ai.entity.Notification;
import com.studhunt_ai.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private NotificationRepository notificationRepository;

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    /**
     * Send email notification when someone likes/reacts to a post
     */
    public void sendReactionNotification(String postOwnerEmail, String reactorEmail, String reactionType, Long postId) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(postOwnerEmail);
            message.setFrom("noreply@studhunt-ai.com");
            message.setSubject("🎉 New Reaction on Your Post!");
            message.setText(
                    "Hi,\n\n" +
                            reactorEmail + " reacted to your post with " + reactionType + "! 🚀\n\n" +
                            "Keep the conversation going and engage with the community.\n\n" +
                            "Best regards,\n" +
                            "StudHunt AI Team"
            );
            mailSender.send(message);
            
            // Save notification to database
            Notification notification = new Notification(
                    postOwnerEmail,
                    reactorEmail,
                    "REACTION",
                    reactorEmail + " reacted with " + reactionType,
                    postId
            );
            notificationRepository.save(notification);
            
            logger.info("Reaction email sent to: " + postOwnerEmail);
        } catch (Exception e) {
            logger.error("Failed to send reaction email: " + e.getMessage());
        }
    }

    /**
     * Send email notification when someone comments on a post
     */
    public void sendCommentNotification(String postOwnerEmail, String commentorEmail, String commentContent, Long postId) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(postOwnerEmail);
            message.setFrom("noreply@studhunt-ai.com");
            message.setSubject("💬 New Comment on Your Post!");
            message.setText(
                    "Hi,\n\n" +
                            commentorEmail + " commented on your post:\n\n" +
                            "\"" + commentContent + "\"\n\n" +
                            "Join the discussion and reply to keep the momentum going!\n\n" +
                            "Best regards,\n" +
                            "StudHunt AI Team"
            );
            mailSender.send(message);
            
            // Save notification to database
            Notification notification = new Notification(
                    postOwnerEmail,
                    commentorEmail,
                    "COMMENT",
                    commentorEmail + " commented: " + commentContent,
                    postId
            );
            notificationRepository.save(notification);
            
            logger.info("Comment email sent to: " + postOwnerEmail);
        } catch (Exception e) {
            logger.error("Failed to send comment email: " + e.getMessage());
        }
    }
}
