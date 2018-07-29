import com.todomy.example.Application;
import com.todomy.example.model.Category;
import com.todomy.example.model.Task;
import com.todomy.example.repo.TaskRepo;
import com.todomy.example.repo.UserRepo;
import com.todomy.example.service.TaskService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.UUID;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
public class Testing {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private TaskService taskService;

    @Test
    public void testCreatedTask(){
        Task task = new Task();
        task.setTitle("Hollo");
        task.setDescription("Halla");
        task.setStatus("Done");
        task.setCreated(Timestamp.valueOf(LocalDateTime.now()));
        taskRepo.save(task);
        String title = taskRepo.findFirstByTitle("Hollo").getTitle();
        Assert.assertEquals(title, task.getTitle());
        taskService.deleteTask(task.getTaskId());
    }

    @Test
    public void test2(){
        String name = userRepo.findByUsername("carlitoAlex716").getUsername();
        System.out.println(name);
    }
}
