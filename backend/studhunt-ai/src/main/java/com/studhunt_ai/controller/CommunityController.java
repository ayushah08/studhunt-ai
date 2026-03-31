package com.studhunt_ai.controller;

import com.studhunt_ai.entity.Comment;
import com.studhunt_ai.entity.Post;
import com.studhunt_ai.service.CommunityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/community")
public class CommunityController {

    @Autowired
    private CommunityService service;

    @PostMapping("/post")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        return ResponseEntity.ok(service.createPost(post));
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getPosts() {
        return ResponseEntity.ok(service.getAllPosts());
    }

    @PostMapping("/comment")
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(service.addComment(comment));
    }

    @GetMapping("/comments/{postId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(service.getComments(postId));
    }

    // ✅ ADD THIS
    @PostMapping("/react/{postId}")
    public ResponseEntity<Post> reactToPost(
            @PathVariable Long postId,
            @RequestParam String type
    ) {
        return ResponseEntity.ok(service.reactToPost(postId, type));
    }
}