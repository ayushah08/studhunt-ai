package com.studhunt_ai.service;

import com.studhunt_ai.dto.ProfileRequest;
import com.studhunt_ai.entity.Profile;
import com.studhunt_ai.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private ProfileRepository profileRepository;

    public String saveProfile(ProfileRequest request) {

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

        profileRepository.save(profile);

        return "Profile saved/updated successfully";
    }
}