package tbz.project.todoapp.toDoList;

public interface ToDoListService {

  ToDoListDTO getListById(int id);

  ToDoList save(int id, ToDoListDTO list);

  ToDoList updateById(int id, ToDoListDTO list);

  Void deleteById(int id);
}
