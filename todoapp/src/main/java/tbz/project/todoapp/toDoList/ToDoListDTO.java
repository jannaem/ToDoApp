package tbz.project.todoapp.toDoList;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tbz.project.todoapp.task.Task;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ToDoListDTO {
  private String name;
  private List<Task> tasks;
}
