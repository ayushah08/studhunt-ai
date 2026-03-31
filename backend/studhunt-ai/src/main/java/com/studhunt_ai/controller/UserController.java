package com.studhunt_ai.controller;

import com.studhunt_ai.dto.ProfileRequest;
import com.studhunt_ai.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/profile")
    public String saveProfile(@RequestBody ProfileRequest request) {
        return userService.saveProfile(request);
    }
}