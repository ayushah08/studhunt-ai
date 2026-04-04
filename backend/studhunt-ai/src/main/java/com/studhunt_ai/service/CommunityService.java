package com.studhunt_ai.service;

import com.studhunt_ai.dto.PostResponse;
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

    @Autowired
    private EmailService emailService;

    // ✅ CREATE POST
    public Post createPost(Post post) {
        post.setCreatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    // ✅ GET ALL POSTS (LATEST FIRST)
    public List<PostResponse> getAllPosts() {

        List<Post> posts = postRepository.findAll(
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        return posts.stream().map(post ->
                new PostResponse(
                        post.getId(),
                        post.getContent(),
                        post.getUserEmail(),
                        post.getLikeCount(),
                        post.getLaughCount(),
                        post.getAngryCount(),
                        post.getSadCount(),
                        post.getCelebrateCount(),
                        false, // no like tracking yet
                        post.getCreatedAt()
                )
        ).toList();
    }

    // ✅ GET POSTS BY USER (EMAIL BASED)
    public List<PostResponse> getPostsByUser(String userEmail) {

        List<Post> posts = postRepository.findByUserEmail(userEmail);

        return posts.stream().map(post ->
                new PostResponse(
                        post.getId(),
                        post.getContent(),
                        post.getUserEmail(),
                        post.getLikeCount(),
                        post.getLaughCount(),
                        post.getAngryCount(),
                        post.getSadCount(),
                        post.getCelebrateCount(),
                        false,
                        post.getCreatedAt()
                )
        ).toList();
    }

    // ✅ ADD COMMENT
    public Comment addComment(Comment comment) {
        comment.setCreatedAt(LocalDateTime.now());
        Comment savedComment = commentRepository.save(comment);

        // Send email notification to post owner
        Post post = postRepository.findById(comment.getPostId()).orElse(null);
        if (post != null && post.getUserEmail() != null) {
            // Don't send email to own comments
            if (!post.getUserEmail().equals(comment.getUserEmail())) {
                emailService.sendCommentNotification(
                        post.getUserEmail(),
                        comment.getUserEmail(),
                        comment.getContent()
                );
            }
        }

        return savedComment;
    }

    // ✅ GET COMMENTS
    public List<Comment> getComments(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    // ✅ LIKE POST
    public Post reactToPost(Long postId, String type) {

        Post post = postRepository.findById(postId).orElseThrow();

        if ("LIKE".equalsIgnoreCase(type)) {
            post.setLikeCount(post.getLikeCount() + 1);
        } else if ("LAUGH".equalsIgnoreCase(type)) {
            post.setLaughCount(post.getLaughCount() + 1);
        } else if ("ANGRY".equalsIgnoreCase(type)) {
            post.setAngryCount(post.getAngryCount() + 1);
        } else if ("SAD".equalsIgnoreCase(type)) {
            post.setSadCount(post.getSadCount() + 1);
        } else if ("CELEBRATE".equalsIgnoreCase(type)) {
            post.setCelebrateCount(post.getCelebrateCount() + 1);
        }

        return postRepository.save(post);
    }

    // ✅ REACT WITH EMAIL NOTIFICATION
    public Post reactToPostWithNotification(Long postId, String type, String reactorEmail) {
        Post post = reactToPost(postId, type);

        // Send email notification to post owner (not to self)
        if (post.getUserEmail() != null && !post.getUserEmail().equals(reactorEmail)) {
            emailService.sendReactionNotification(
                    post.getUserEmail(),
                    reactorEmail,
                    getReactionEmoji(type)
            );
        }

        return post;
    }

    // Helper method to get emoji for reaction type
    private String getReactionEmoji(String type) {
        return switch (type.toUpperCase()) {
            case "LIKE" -> "❤️ Like";
            case "LAUGH" -> "😂 Laugh";
            case "ANGRY" -> "😡 Angry";
            case "SAD" -> "😭 Sad";
            case "CELEBRATE" -> "🥳 Celebrate";
            default -> type;
        };
    }
}