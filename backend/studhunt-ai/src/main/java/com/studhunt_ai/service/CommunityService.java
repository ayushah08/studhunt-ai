package com.studhunt_ai.service;

import com.studhunt_ai.entity.Comment;
import com.studhunt_ai.entity.Post;
import com.studhunt_ai.repository.CommentRepository;
import com.studhunt_ai.repository.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommunityService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    // ✅ CREATE POST
    public Post createPost(Post post) {
        post.setCreatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    // ✅ GET POSTS
    public List<Post> getAllPosts() {
        return postRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    // ✅ ADD COMMENT
    public Comment addComment(Comment comment) {
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    // ✅ GET COMMENTS
    public List<Comment> getComments(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    // ✅ REACT TO POST
    public Post reactToPost(Long postId, String type) {
        Post post = postRepository.findById(postId).orElseThrow();

        switch (type) {
            case "LIKE" -> post.setLikeCount(post.getLikeCount() + 1);
            case "LAUGH" -> post.setLaughCount(post.getLaughCount() + 1);
            case "ANGRY" -> post.setAngryCount(post.getAngryCount() + 1);
            case "SAD" -> post.setSadCount(post.getSadCount() + 1);
            case "CELEBRATE" -> post.setCelebrateCount(post.getCelebrateCount() + 1);
        }

        return postRepository.save(post);
    }
}