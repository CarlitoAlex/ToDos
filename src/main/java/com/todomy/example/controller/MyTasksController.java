package com.todomy.example.controller;

import com.sun.org.apache.xpath.internal.operations.Mod;
import com.todomy.example.repo.TaskRepo;
import com.todomy.example.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MyTasksController {

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private UserRepo userRepo;

    @GetMapping("myTaskPage")
    public String taskList(Model model){
        model.addAttribute("tasks" , taskRepo.findAll());
        return "myTaskPage";
    }

    @PostMapping("checkPoints")
    public Long myPoint(@RequestParam String username){
        return userRepo.findPointsByUsername(username);
    }
}
