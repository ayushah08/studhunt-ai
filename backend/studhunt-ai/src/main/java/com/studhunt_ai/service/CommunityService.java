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
                        false,
                        post.getCreatedAt()
                )
        ).toList();
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

    // ✅ LIKE POST
    public Post reactToPost(Long postId, String type) {

        Post post = postRepository.findById(postId).orElseThrow();

        if ("LIKE".equalsIgnoreCase(type)) {
            post.setLikeCount(post.getLikeCount() + 1);
        }

        return postRepository.save(post);
    }
}