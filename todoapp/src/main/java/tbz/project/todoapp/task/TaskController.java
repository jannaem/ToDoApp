package tbz.project.todoapp.task;

import java.security.Principal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tbz.project.todoapp.user.User;

@Controller
@RequestMapping(value = {"/task"})
@RequiredArgsConstructor
public class TaskController {
  private final TaskService taskService;

  @GetMapping("/{id}")
  public ResponseEntity<Task> getTaskById(@PathVariable int id){
    return new ResponseEntity<>(taskService.getTaskById(id), HttpStatus.OK);
  }

  @PostMapping({"/{listId}"})
  public ResponseEntity<Task> createTask(@RequestBody Task task, @PathVariable int listId) {
    return new ResponseEntity<>(taskService.saveTask(task, listId), HttpStatus.CREATED);
  }
  @PutMapping("/{id}")
  public ResponseEntity<Task>updateTaskById(@RequestBody Task task, @PathVariable int id){
    return new ResponseEntity<>(taskService.updateTaskById(id, task), HttpStatus.OK);
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTaskById(@PathVariable int id){
    taskService.deleteTaskById(id );
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

}