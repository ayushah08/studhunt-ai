package com.studhunt_ai.controller;

import com.studhunt_ai.service.OpenAIService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/chat")
@CrossOrigin("*")
public class ChatController {

    @Autowired
    private OpenAIService openAIService;

    @PostMapping
    public ResponseEntity<String> chat(@RequestBody Map<String, String> request) throws Exception {

        String message = request.get("message");
        String mode = request.getOrDefault("mode", "study");

        return ResponseEntity.ok(openAIService.getChatResponse(message, mode));
    }
}