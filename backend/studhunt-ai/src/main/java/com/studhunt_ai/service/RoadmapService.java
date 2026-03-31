package com.studhunt_ai.service;

import com.studhunt_ai.ai.OpenAIService;
import com.studhunt_ai.dto.RoadmapRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoadmapService {

    @Autowired
    private OpenAIService openAIService;

    public String generateRoadmap(RoadmapRequest request) {
        return openAIService.generateRoadmap(request);
    }
}