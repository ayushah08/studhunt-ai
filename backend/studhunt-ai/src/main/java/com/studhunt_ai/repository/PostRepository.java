package com.studhunt_ai.repository;

import com.studhunt_ai.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {}
