package com.studhunt_ai.controller;

import com.studhunt_ai.dto.PostResponse;
import com.studhunt_ai.entity.Comment;
import com.studhunt_ai.entity.Post;
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

    // ✅ CREATE POST
    @PostMapping("/post")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        return ResponseEntity.ok(communityService.createPost(post));
    }

    // ✅ GET ALL POSTS
    @GetMapping("/posts")
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        return ResponseEntity.ok(communityService.getAllPosts());
    }

    // ✅ GET POSTS BY USER
    @GetMapping("/posts/user/{userId}")
    public ResponseEntity<List<PostResponse>> getPostsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(communityService.getPostsByUser(userId));
    }

    // ✅ ADD COMMENT
    @PostMapping("/comment")
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(communityService.addComment(comment));
    }

    // ✅ GET COMMENTS
    @GetMapping("/comments/{postId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(communityService.getComments(postId));
    }

    // ✅ LIKE POST
    @PostMapping("/react/{postId}")
    public ResponseEntity<Post> react(
            @PathVariable Long postId,
            @RequestParam String type
    ) {
        return ResponseEntity.ok(communityService.reactToPost(postId, type));
    }
}