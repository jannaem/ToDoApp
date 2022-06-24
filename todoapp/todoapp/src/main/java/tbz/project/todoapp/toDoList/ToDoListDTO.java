package tbz.project.todoapp.toDoList;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import tbz.project.todoapp.Task.Task;

@AllArgsConstructor
@Getter
@Setter

public class ToDoListDTO {
  private String name;
  private List<Task> tasks;
}
