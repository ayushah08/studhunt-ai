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

    @Value("${openai.api.key}")
    private String apiKey;

    public String getChatResponse(String message) throws Exception {

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
      "content": "You are StudHunt AI — a smart academic assistant built for students. Your job is to help students learn faster, prepare for exams, and crack internships. Always respond in a structured, clear, and practical way.\n\nRules:\n- Use bullet points instead of long paragraphs\n- Explain in simple terms (like teaching a 2nd year student)\n- Give real-world examples\n- If it's coding, include examples\n- If it's theory, simplify it\n- Keep answers concise but useful\n- Avoid generic textbook definitions\n- Focus on helping the student take action\n\nIf the question is about:\n- Programming → explain + example + use case\n- Interview prep → give direct answers + tips\n- Concepts → break into bullets\n\nTone:\n- Friendly but smart\n- Not robotic\n- Not too long\n\nGoal: Make the student understand quickly and feel confident."
    },
    {
      "role": "user",
      "content": "%s"
    }
  ]
}
""".formatted(message);

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response =
                restTemplate.postForEntity(url, entity, String.class);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response.getBody());

        return root
                .get("choices")
                .get(0)
                .get("message")
                .get("content")
                .asText();
    }
}