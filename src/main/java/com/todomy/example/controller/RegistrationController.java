package com.todomy.example.controller;

import com.todomy.example.model.User;
import com.todomy.example.service.UserService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
public class RegistrationController {

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(RegistrationController.class);

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userRepo;

    @GetMapping("/registration")
    public String registration() {
        return "registration";
    }

    @PostMapping("/registration")
    public String addUser(@RequestParam("email") String email,
                          @RequestParam("repeatpassword") String passwordConfirm,
                          User user,
                          Map<String, Object> model) {

        boolean isErr = false;
        User userFromDb;

        if (StringUtils.isEmpty(user.getUsername())) {
            model.put("errLogin", "Username cannot be empty!");
            isErr = true;
        } else {
            userFromDb = userRepo.findUserByUsername(user.getUsername());
            if (userFromDb != null) {
                model.put("errLogin", "User with this login already exists!");
                isErr = true;
            } else {
                model.put("username", user.getUsername());
            }
        }

        if (StringUtils.isEmpty(email)) {
            model.put("errEmail", "Email cannot be empty!");
            isErr = true;
        } else {
            userFromDb = userRepo.findUserByEmail(email);
            if (userFromDb != null) {
                model.put("errEmail", "User with this email already exists!");
                isErr = true;
            } else {
                model.put("email", email);
            }
        }
        if (StringUtils.isEmpty(user.getPassword())) {
            model.put("errHard", "Password cannot be empty!");
            isErr = true;
        }

        if (!user.getPassword().equals(passwordConfirm)) {
            model.put("errPassword", "Passwords are different!");
            isErr = true;
        }

        if (!isErr) {
            user = userRepo.saveUser(user.getUsername(), passwordEncoder.encode(user.getPassword()), email);
            logger.info("user created info:Username " + user.getUsername());
            logger.info("user created info:Email " + user.getEmail());
            return "redirect:/login";
        } else {
            return "registration";
        }
    }
}
