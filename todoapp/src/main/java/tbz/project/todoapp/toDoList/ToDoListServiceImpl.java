package tbz.project.todoapp.toDoList;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tbz.project.todoapp.Exception.ItemNotFoundException;
import tbz.project.todoapp.task.Task;
import tbz.project.todoapp.task.TaskRepository;
import tbz.project.todoapp.task.TaskService;
import tbz.project.todoapp.user.User;
import tbz.project.todoapp.user.UserRepository;

@Service
@RequiredArgsConstructor
public class ToDoListServiceImpl implements ToDoListService {
  public final ToDoListRepository toDoListRepository;
  public final TaskRepository taskRepository;
  public final UserRepository userRepository;
  public final TaskService taskService;

  @Override
  public ToDoListDTO getListById(int id) {
    List<Task> tasks = taskRepository.findByListId(id);
    ToDoList list = toDoListRepository.findById(id).orElseThrow(()-> new ItemNotFoundException("List not found"));
    return new ToDoListDTO(list.getName(), tasks);

  }

  @Override
  public ToDoList save(int id, ToDoListDTO toDoListDTO) {
    User user = userRepository.findById(id).orElseThrow(()-> new ItemNotFoundException("User not found"));
    ToDoList list = new ToDoList();
    list.setName(toDoListDTO.getName());
    list.setUser(user);
    return toDoListRepository.save(list);
  }

  @Override
  public ToDoList updateById(int id, ToDoListDTO list) {
    ToDoList oldList = toDoListRepository.findById(id).orElseThrow(()-> new ItemNotFoundException("List not found"));
    oldList.setName(list.getName());
    return toDoListRepository.save(oldList);
  }

  @Override
  public Void deleteById(int id) {
    List<Task> tasks = taskRepository.findByListId(id);
    for(Task task : tasks) {
      taskService.deleteTaskById(task.getTaskId());
    }
    toDoListRepository.deleteById(id);
    return null;
  }
}