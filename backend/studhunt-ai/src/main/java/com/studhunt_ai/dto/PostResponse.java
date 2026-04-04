package com.studhunt_ai.dto;

import java.time.LocalDateTime;

public class PostResponse {

    private Long id;
    private String content;
    private String userEmail;
    private int likeCount;
    private int laughCount;
    private int angryCount;
    private int sadCount;
    private int celebrateCount;
    private boolean liked;
    private LocalDateTime createdAt;

    public PostResponse(Long id, String content, String userEmail,
                        int likeCount, int laughCount, int angryCount, 
                        int sadCount, int celebrateCount, boolean liked, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.userEmail = userEmail;
        this.likeCount = likeCount;
        this.laughCount = laughCount;
        this.angryCount = angryCount;
        this.sadCount = sadCount;
        this.celebrateCount = celebrateCount;
        this.liked = liked;
        this.createdAt = createdAt;
    }

    // getters
    public Long getId() { return id; }
    public String getContent() { return content; }
    public String getUserEmail() { return userEmail; }
    public int getLikeCount() { return likeCount; }
    public int getLaughCount() { return laughCount; }
    public int getAngryCount() { return angryCount; }
    public int getSadCount() { return sadCount; }
    public int getCelebrateCount() { return celebrateCount; }
    public int getTotalReactions() {
        return likeCount + laughCount + angryCount + sadCount + celebrateCount;
    }
    public boolean isLiked() { return liked; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}