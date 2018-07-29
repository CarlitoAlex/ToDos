package com.todomy.example.repo;

import com.todomy.example.model.Task;
import com.todomy.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Transactional
public interface TaskRepo extends JpaRepository<Task, UUID> {

    Task findByTaskId(UUID task_id);

    Task findFirstByTitle(String title);

    Task findByStatus(String status);

    Long countByOwner(User owner);
}
