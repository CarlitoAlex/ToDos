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
public class ToDoListController {

    @Autowired
    private TaskRepo taskRepo;


    @GetMapping("ToDoList")
    public String toDoListPage(){
        return "ToDoList";
    }

}
