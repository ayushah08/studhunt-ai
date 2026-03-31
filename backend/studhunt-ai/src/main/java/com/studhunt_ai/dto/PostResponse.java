package com.studhunt_ai.dto;

import java.time.LocalDateTime;

public class PostResponse {

    private Long id;
    private String content;
    private String userEmail;
    private int likeCount;
    private boolean liked;
    private LocalDateTime createdAt;

    public PostResponse(Long id, String content, String userEmail,
                        int likeCount, boolean liked, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.userEmail = userEmail;
        this.likeCount = likeCount;
        this.liked = liked;
        this.createdAt = createdAt;
    }

    // getters
    public Long getId() { return id; }
    public String getContent() { return content; }
    public String getUserEmail() { return userEmail; }
    public int getLikeCount() { return likeCount; }
    public boolean isLiked() { return liked; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}