package com.studhunt_ai.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class OpenAIService {

    @Value("${OPENAI_API_KEY}")
    private String apiKey;

    public String getChatResponse(String message, String mode) throws Exception {

        String systemPrompt = switch (mode.toLowerCase()) {

            case "interview" -> """
                    You are StudHunt AI Interview Coach.
                    Give:
                    - Most asked interview questions
                    - Short answers
                    - Tips to answer confidently
                    Keep it crisp.
                    """;

            case "roadmap" -> """
                    You are StudHunt AI Career Guide.
                    Give:
                    - Step-by-step roadmap
                    - Beginner → Advanced
                    - Include tools & timeline
                    Keep it structured.
                    """;

            default -> """
                    You are StudHunt AI Study Assistant.
                    Explain:
                    - In simple terms
                    - Use bullet points
                    - Add examples
                    Keep it easy to understand.
                    """;
        };

        RestTemplate restTemplate = new RestTemplate();

        String url = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        String body = """
                {
                  "model": "gpt-4o-mini",
                  "messages": [
                    {
                      "role": "system",
                      "content": "%s"
                    },
                    {
                      "role": "user",
                      "content": "%s"
                    }
                  ]
                }
                """.formatted(systemPrompt, message);

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response =
                restTemplate.postForEntity(url, entity, String.class);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response.getBody());

        return root.get("choices").get(0).get("message").get("content").asText();
    }
}