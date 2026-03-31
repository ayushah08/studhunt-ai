package com.studhunt_ai.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class OpenAIService {

    private final String BASE_URL = "https://studhunt-ai-1.onrender.com";
    private final RestTemplate restTemplate = new RestTemplate();

    // 🔥 CHAT + ROADMAP + INTERVIEW
    public String getChatResponse(String message, String mode) {

        try {
            String url;
            Map<String, String> request = new HashMap<>();

            switch (mode.toLowerCase()) {

                case "roadmap" -> {
                    url = BASE_URL + "/generate-roadmap";
                    request.put("prompt", message);
                }

                case "interview" -> {
                    url = BASE_URL + "/chat";
                    request.put("message",
                            "Give interview questions, answers, and tips for: " + message);
                }

                default -> {
                    url = BASE_URL + "/chat";
                    request.put("message", message);
                }
            }

            ResponseEntity<String> response =
                    restTemplate.postForEntity(url, request, String.class);

            return response.getBody() != null
                    ? response.getBody()
                    : "No response from AI";

        } catch (Exception e) {
            return "⚠️ AI service is busy right now. Try again later.";
        }
    }

    // 🔥 DIRECT ROADMAP (USED BY PROFILE)
    public String getRoadmap(String prompt) {

        try {
            String url = BASE_URL + "/generate-roadmap";

            Map<String, String> request = new HashMap<>();
            request.put("prompt", prompt);

            ResponseEntity<String> response =
                    restTemplate.postForEntity(url, request, String.class);

            return response.getBody() != null
                    ? response.getBody()
                    : "No roadmap generated";

        } catch (Exception e) {
            return "⚠️ Roadmap generation failed.";
        }
    }

    // 🔥 RESUME TEXT
    public String getResume(Map<String, Object> data) {

        try {
            String url = BASE_URL + "/resume";

            ResponseEntity<String> response =
                    restTemplate.postForEntity(url, data, String.class);

            return response.getBody() != null
                    ? response.getBody()
                    : "No resume generated";

        } catch (Exception e) {
            return "⚠️ Resume generation failed.";
        }
    }

    // 🔥 RESUME PDF DOWNLOAD
    public byte[] getResumePDF(Map<String, Object> data) {

        try {
            String url = BASE_URL + "/resume/pdf";

            ResponseEntity<byte[]> response =
                    restTemplate.postForEntity(url, data, byte[].class);

            return response.getBody();

        } catch (Exception e) {
            return null;
        }
    }
}