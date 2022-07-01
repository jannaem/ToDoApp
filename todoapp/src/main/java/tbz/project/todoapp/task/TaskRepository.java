package tbz.project.todoapp.task;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TaskRepository extends JpaRepository<Task, Integer> {
  @Query(value = "select * from task join to_do_list_task on task.id =  to_do_list_task.id_task where to_do_list_task.id_list = :id", nativeQuery = true)
  List<Task> findByListId(int id);
}
