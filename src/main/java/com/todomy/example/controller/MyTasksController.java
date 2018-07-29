package com.todomy.example.controller;

import com.todomy.example.repo.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyTasksController {
    @Autowired
    private TaskRepo taskRepo;

    @GetMapping("myTaskPage")
    public String taskList(Model model){
        model.addAttribute("tasks" , taskRepo.findAll());
        return "myTaskPage";
    }



}
