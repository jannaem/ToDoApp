package tbz.project.todoapp.toDoList;

import java.util.List;

public interface ToDoListService {

  ToDoListDTO getListById(int id);

  ToDoList save(int id, ToDoListDTO list);

  ToDoList updateById(int id, ToDoListDTO list);

  Void deleteById(int id);
  List<ToDoList> getListByUserId(int id);
}

