package com.studhunt_ai.service;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
public class NotesService {

    private final String BASE_URL = "https://studhunt-ai-1.onrender.com";
    private final RestTemplate restTemplate = new RestTemplate();

    private String sendToAI(MultipartFile file, String task) {
        try {
            String url = BASE_URL + "/study-material";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            ByteArrayResource fileResource = new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            };

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", fileResource);
            body.add("task", task);

            HttpEntity<MultiValueMap<String, Object>> requestEntity =
                    new HttpEntity<>(body, headers);

            ResponseEntity<String> response =
                    restTemplate.postForEntity(url, requestEntity, String.class);

            return response.getBody();

        } catch (Exception e) {
            return "Error processing file: " + e.getMessage();
        }
    }

    public String generateSummary(MultipartFile file) {
        return sendToAI(file, "summary");
    }

    public String generateMCQ(MultipartFile file) {
        return sendToAI(file, "mcq");
    }
}