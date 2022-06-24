package tbz.project.todoapp.task;

public interface TaskService {
  Task saveTask(Task task, int listId);

  Task getTaskById(int id);

  Task updateTaskById(int id, Task task);

  void deleteTaskById(int id);
}