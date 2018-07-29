package com.todomy.example.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ToDoListController {


    @GetMapping("ToDoList")
    public String toDoListPage(){
        return "ToDoList";
    }

}
