package com.studhunt_ai.service;

import com.studhunt_ai.dto.RoadmapRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoadmapService {

    @Autowired
    private OpenAIService openAIService;

    public String generateRoadmap(RoadmapRequest request) {

        String prompt = """
            I want a COMPLETE and VERY DETAILED roadmap.

            Goal: %s
            Current Level: %s
            Timeline: %s

            Instructions:
            - Divide into phases (Beginner → Intermediate → Advanced)
            - Each phase should include:
              • Topics to learn
              • Tools/technologies
              • Projects to build
              • Resources (optional)
            - Add weekly or monthly breakdown
            - Include real-world projects
            - Include revision strategy
            - Include interview preparation phase
            - Make it structured with headings and bullet points
            - Make it long and detailed (at least 800–1200 words)

            Make it practical and beginner-friendly.
            """
                .formatted(
                        request.getGoal(),
                        request.getCurrentKnowledge(),
                        request.getAcademicYear()
                );

        return openAIService.getRoadmap(prompt);
    }
}