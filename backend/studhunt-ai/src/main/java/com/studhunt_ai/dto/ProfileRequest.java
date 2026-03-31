package com.studhunt_ai.dto;

import lombok.*;

@Getter
@Setter
public class ProfileRequest {

    private String academicYear;
    private String fieldOfInterest;
    private String goal;
    private String preferredField;
    private String language;
    private String currentKnowledge;
    private String target;
    private Long userId;
}