package com.studhunt_ai.controller;

import com.studhunt_ai.service.NotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/notes")
public class NotesController {

    @Autowired
    private NotesService notesService;

    @PostMapping("/summary")
    public String summary(@RequestParam("file") MultipartFile file) {
        return notesService.generateSummary("dummy content");
    }

    @PostMapping("/mcq")
    public String mcq(@RequestParam("file") MultipartFile file) {
        return notesService.generateMCQ("dummy content");
    }
}