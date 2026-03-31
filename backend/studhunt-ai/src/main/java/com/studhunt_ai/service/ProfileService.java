package com.studhunt_ai.service;

import com.studhunt_ai.dto.ProfileRequest;
import com.studhunt_ai.entity.Profile;
import com.studhunt_ai.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    // CREATE or UPDATE
    public Profile saveProfile(ProfileRequest request) {

        Profile profile = profileRepository
                .findByUserId(request.getUserId())
                .orElse(new Profile());

        profile.setUserId(request.getUserId());
        profile.setAcademicYear(request.getAcademicYear());
        profile.setFieldOfInterest(request.getFieldOfInterest());
        profile.setGoal(request.getGoal());
        profile.setPreferredField(request.getPreferredField());
        profile.setLanguage(request.getLanguage());
        profile.setCurrentKnowledge(request.getCurrentKnowledge());
        profile.setTarget(request.getTarget());

        return profileRepository.save(profile);
    }

    // GET
    public Profile getProfile(Long userId) {
        return profileRepository
                .findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }
}