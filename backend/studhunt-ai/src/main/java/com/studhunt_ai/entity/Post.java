package com.studhunt_ai.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private String userEmail;
    private LocalDateTime createdAt;

    // reactions
    private int likeCount = 0;
    private int laughCount = 0;
    private int angryCount = 0;
    private int sadCount = 0;
    private int celebrateCount = 0;
}