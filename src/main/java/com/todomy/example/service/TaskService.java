package com.todomy.example.service;


import com.todomy.example.repo.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepo;

    public void deleteTask(UUID task_id) {
        taskRepo.delete(taskRepo.findByTaskId(task_id));
    }
}
