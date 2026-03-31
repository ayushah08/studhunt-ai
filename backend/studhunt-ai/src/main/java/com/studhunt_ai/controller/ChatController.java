package com.studhunt_ai.controller;

import com.studhunt_ai.service.OpenAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ChatController {

    private final OpenAIService openAIService;

    @PostMapping
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> request) {

        String message = request.get("message");
        String mode = request.getOrDefault("mode", "study");

        if (message == null || message.isBlank()) {
            return ResponseEntity.badRequest().body(
                    Map.of("error", "Message cannot be empty")
            );
        }

        String response = openAIService.getChatResponse(message, mode);

        return ResponseEntity.ok(
                Map.of(
                        "status", "success",
                        "mode", mode,
                        "response", response
                )
        );
    }
}