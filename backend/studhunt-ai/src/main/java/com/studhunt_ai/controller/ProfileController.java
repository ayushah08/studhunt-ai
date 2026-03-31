package com.studhunt_ai.controller;

import com.studhunt_ai.dto.ProfileRequest;
import com.studhunt_ai.entity.Profile;
import com.studhunt_ai.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    // CREATE / UPDATE
    @PostMapping("/profile")
    public Profile saveProfile(@RequestBody ProfileRequest request) {
        return profileService.saveProfile(request);
    }

    // GET PROFILE
    @GetMapping("/profile/{userId}")
    public Profile getProfile(@PathVariable Long userId) {
        return profileService.getProfile(userId);
    }

    // 🔥 NEW: Generate roadmap from profile
    @GetMapping("/profile/{userId}/roadmap")
    public String getRoadmap(@PathVariable Long userId) {
        return profileService.generateRoadmapFromProfile(userId);
    }
}