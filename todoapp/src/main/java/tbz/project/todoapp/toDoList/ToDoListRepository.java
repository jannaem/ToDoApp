package tbz.project.todoapp.toDoList;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ToDoListRepository extends JpaRepository<ToDoList, Integer> {
  @Query(value = "select * from to_do_list where to_do_list.user_id = :id", nativeQuery = true)
  List<ToDoList> findByUserId(int id);
}
