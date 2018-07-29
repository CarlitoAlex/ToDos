package com.todomy.example.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "task")
public class Task {

    @Id
    @GenericGenerator(name = "uuid-gen", strategy = "uuid2")
    @GeneratedValue(generator = "uuid-gen")
    @Column(name = "TASK_ID", nullable = false, updatable = false)
    private UUID taskId;

    private String title;
    private String description;
    private String status;
    private Timestamp created;

    @ElementCollection(targetClass = Category.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "task_category", joinColumns = @JoinColumn(name = "task_id"))
    @Enumerated(EnumType.STRING)
    private Set<Task> categories;

    public Task() {
    }

    public UUID getTaskId() {
        return taskId;
    }

    public void setTaskId(UUID taskId) {
        this.taskId = taskId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getCreated() {
        return created;
    }

    public void setCreated(Timestamp created) {
        this.created = created;
    }

    public Set<Task> getCategories() {
        return categories;
    }

    public void setCategories(Set<Task> categories) {
        this.categories = categories;
    }
}
