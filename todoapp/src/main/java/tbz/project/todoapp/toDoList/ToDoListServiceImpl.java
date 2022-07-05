package tbz.project.todoapp.toDoList;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tbz.project.todoapp.Exception.ItemNotFoundException;
import tbz.project.todoapp.task.Task;
import tbz.project.todoapp.task.TaskRepository;
import tbz.project.todoapp.task.TaskService;
import tbz.project.todoapp.user.User;
import tbz.project.todoapp.user.UserRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class ToDoListServiceImpl implements ToDoListService {
    public final ToDoListRepository toDoListRepository;
    public final TaskRepository taskRepository;
    public final UserRepository userRepository;
    public final TaskService taskService;

    @Override
    public ToDoListDTO getListById(int id) {
        List<Task> tasks = taskRepository.findByListId(id);
        ToDoList list = toDoListRepository.findById(id).orElseThrow(() -> new ItemNotFoundException("List not found"));
        return new ToDoListDTO(list.getName(), tasks);

    }

    @Override
    public ToDoList save(int id, ToDoListDTO toDoListDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new ItemNotFoundException("User not found"));
        ToDoList list = new ToDoList();
        list.setName(toDoListDTO.getName());
        list.setUser(user);
        list = toDoListRepository.save(list);
        log.info("List was created successfully: {}", list);
        return list;
    }

    @Override
    public ToDoList updateById(int id, ToDoListDTO list) {
        ToDoList oldList = toDoListRepository.findById(id).orElseThrow(() -> new ItemNotFoundException("List not found"));
        oldList.setName(list.getName());
        ToDoList updatedList = toDoListRepository.save(oldList);
        log.info("List was updated as follows: {}", updatedList);
        return updatedList;
    }

    @Override
    public Void deleteById(int id) {
        List<Task> tasks = taskRepository.findByListId(id);
        for (Task task : tasks) {
            taskService.deleteTaskById(task.getId());
        }
        toDoListRepository.deleteById(id);
        log.info("List with id {} was deleted", id);
        return null;
    }

    @Override
    public List<ToDoList> getListByUserId(int id) {
        List<ToDoList> list = toDoListRepository.findByUserId(id);
        log.info("Fetching list {}", list);
        return list;
    }
}