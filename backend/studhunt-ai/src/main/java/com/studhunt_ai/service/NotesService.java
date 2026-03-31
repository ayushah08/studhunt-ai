package com.studhunt_ai.service;

import org.springframework.stereotype.Service;

@Service
public class NotesService {

    public String generateSummary(String content) {
        return "This is a short summary of the uploaded notes.";
    }

    public String generateMCQ(String content) {
        return """
        Q1. What is Java?
        A) Language
        B) OS
        C) Browser
        D) Compiler
        Answer: A
        """;
    }
}