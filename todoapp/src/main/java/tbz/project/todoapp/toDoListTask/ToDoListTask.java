package tbz.project.todoapp.toDoListTask;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tbz.project.todoapp.task.Task;
import tbz.project.todoapp.toDoList.ToDoList;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class ToDoListTask {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int todoListTaskId;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "id_list", referencedColumnName = "toDoListId")
  private ToDoList list;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "id_task", referencedColumnName = "taskId")
  private Task task;

}