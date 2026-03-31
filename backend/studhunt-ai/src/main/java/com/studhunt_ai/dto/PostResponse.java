package com.studhunt_ai.dto;

import java.time.LocalDateTime;

public class PostResponse {

    private Long id;
    private String content;
    private Long userId;
    private int likeCount;
    private boolean liked;
    private LocalDateTime createdAt;

    public PostResponse(Long id, String content, String userId, int likeCount, boolean liked, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.userId = userId;
        this.likeCount = likeCount;
        this.liked = liked;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public String getContent() { return content; }
    public Long getUserId() { return userId; }
    public int getLikeCount() { return likeCount; }
    public boolean isLiked() { return liked; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}