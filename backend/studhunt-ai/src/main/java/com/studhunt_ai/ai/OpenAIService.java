package com.studhunt_ai.ai;

import com.studhunt_ai.dto.RoadmapRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Map;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateRoadmap(RoadmapRequest request) {

        return """
    {
      "title": "Full Stack Developer Roadmap",
      "steps": [
        {
          "title": "Core Java",
          "description": "Learn OOP, collections, multithreading",
          "duration": "2-3 weeks"
        },
        {
          "title": "Spring Boot",
          "description": "Build REST APIs, learn JPA, security basics",
          "duration": "3-4 weeks"
        },
        {
          "title": "Database",
          "description": "Learn SQL, joins, indexing, basic NoSQL",
          "duration": "2 weeks"
        },
        {
          "title": "Frontend Basics",
          "description": "HTML, CSS, JavaScript fundamentals",
          "duration": "2 weeks"
        },
        {
          "title": "React",
          "description": "Components, hooks, API integration",
          "duration": "3 weeks"
        },
        {
          "title": "Projects",
          "description": "Build full stack apps and deploy",
          "duration": "3-4 weeks"
        }
      ]
    }
    """;
    }
}