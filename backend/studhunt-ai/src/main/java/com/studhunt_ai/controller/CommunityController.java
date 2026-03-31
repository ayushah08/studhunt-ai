package com.studhunt_ai.controller;

import com.studhunt_ai.dto.PostResponse;
import com.studhunt_ai.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/community")
@CrossOrigin("*")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    // 🔥 GET ALL POSTS (with user context)
    @GetMapping("/posts")
    public ResponseEntity<List<PostResponse>> getAllPosts(
            @RequestParam Long userId
    ) {
        return ResponseEntity.ok(communityService.getAllPosts(userId));
    }

    // 🔥 GET POSTS BY USER
    @GetMapping("/posts/user/{userId}")
    public ResponseEntity<List<PostResponse>> getPostsByUser(
            @PathVariable Long userId,
            @RequestParam Long currentUserId
    ) {
        return ResponseEntity.ok(
                communityService.getPostsByUser(userId, currentUserId)
        );
    }
}