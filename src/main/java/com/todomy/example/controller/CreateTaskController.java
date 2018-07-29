package com.todomy.example.controller;

import com.todomy.example.model.Task;
import com.todomy.example.repo.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Timestamp;
import java.time.LocalDateTime;


@Controller
public class CreateTaskController {

    @Autowired
    private TaskRepo taskRepo;

    @GetMapping("CreateTaskPage")
    public String createTaskPage(){
        return "CreateTaskPage";
    }

    @PostMapping("CreateNewTask")
    public String createTask(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String status)
    {
        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setStatus(status);
        task.setCreated(Timestamp.valueOf(LocalDateTime.now()));

        System.out.println(title);
        System.out.println(description);
        System.out.println(status);

        taskRepo.save(task);

        return "redirect:/myTaskPage";
    }
}
