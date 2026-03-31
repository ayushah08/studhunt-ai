package com.studhunt_ai.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String academicYear;
    private String fieldOfInterest;
    private String goal;
    private String preferredField;
    private String language;
    private String currentKnowledge;
    private String target;

    private Long userId; // simple mapping (no relations now)
}