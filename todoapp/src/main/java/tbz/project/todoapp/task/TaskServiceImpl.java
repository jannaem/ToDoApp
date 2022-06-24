package tbz.project.todoapp.task;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tbz.project.todoapp.Exception.ItemNotFoundException;
import tbz.project.todoapp.toDoList.ToDoListRepository;
import tbz.project.todoapp.toDoList.ToDoList;
import tbz.project.todoapp.toDoListTask.ToDoListTask;
import tbz.project.todoapp.toDoListTask.ToDoListTaskRepository;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
  private final TaskRepository taskRepository;
  private final ToDoListRepository toDoListRepository;
  private final ToDoListTaskRepository toDoListTaskRepository;

  @Override
  public Task saveTask(Task task, int listId) {
    ToDoList list = toDoListRepository.findById(listId).orElseThrow(() -> new ItemNotFoundException("Task with id " + listId + " not found"));
    Task newTask = taskRepository.save(task);
    ToDoListTask toDoListTask = new ToDoListTask();
    toDoListTask.setList(list);
    toDoListTask.setTask(newTask);
    toDoListTaskRepository.save(toDoListTask);
    return taskRepository.save(task);
  }

  @Override
  public Task getTaskById(int id) throws ItemNotFoundException {
    return taskRepository.findById(id)
        .orElseThrow(() -> new ItemNotFoundException("Task with id " + id + " not found"));
  }

  @Override
  public Task updateTaskById(int id, Task task) throws ItemNotFoundException {
    Task oldTask = taskRepository.findById(id)
        .orElseThrow(() -> new ItemNotFoundException("Task with id " + id + " not found"));
    oldTask.setName(task.getName());
    oldTask.setStatus(task.isStatus());
    return taskRepository.save(oldTask);
  }

  @Override
  public void deleteTaskById(int id)throws ItemNotFoundException {
    if (taskRepository.existsById(id)) {
      ToDoListTask toDoListTask = toDoListTaskRepository.findByIdTask(id);
      toDoListTaskRepository.deleteById(toDoListTask.getId());
      taskRepository.deleteById(id);
    }else{
      throw new ItemNotFoundException("Task with id " + id + " not found");
    }

  }

}