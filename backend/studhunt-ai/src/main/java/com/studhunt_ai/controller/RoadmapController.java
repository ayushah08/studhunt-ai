package com.studhunt_ai.controller;

import com.studhunt_ai.dto.RoadmapRequest;
import com.studhunt_ai.service.RoadmapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roadmap")
public class RoadmapController {

    @Autowired
    private RoadmapService roadmapService;

    @PostMapping("/generate")
    public String generate(@RequestBody RoadmapRequest request) {
        return roadmapService.generateRoadmap(request);
    }
}