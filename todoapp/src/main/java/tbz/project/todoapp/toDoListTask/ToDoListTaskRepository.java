package tbz.project.todoapp.toDoListTask;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ToDoListTaskRepository extends JpaRepository<ToDoListTask, Integer> {
  @Query(value = "select * from to_do_list_task where to_do_list_task.id_task = :id", nativeQuery = true)
  ToDoListTask findByIdTask(int id);
}
