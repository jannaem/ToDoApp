package tbz.project.todoapp.toDoList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping(value = {"/list"})
@RequiredArgsConstructor
public class ToDoListController {
  private final ToDoListService listService;

  @GetMapping("/{id}")
  public ResponseEntity<ToDoListDTO> getAllTasksByListId(@PathVariable int id) {
    return new ResponseEntity<>(listService.getListById(id), HttpStatus.OK);
  }

  @PostMapping("/{userId}")
  public ResponseEntity<ToDoList> createList(@PathVariable int userId, @RequestBody ToDoListDTO list) {
    return new ResponseEntity<>(listService.save(userId, list), HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ToDoList> updateList(@PathVariable int id, @RequestBody ToDoListDTO list){
    return new ResponseEntity<>(listService.updateById(id, list), HttpStatus.OK);
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteList(@PathVariable int id){
    return new ResponseEntity<>(listService.deleteById(id), HttpStatus.NO_CONTENT);
  }
  @GetMapping("/user/{userId}")
  public ResponseEntity<List<ToDoList>> getAllLists(@PathVariable int userId){
    return new ResponseEntity<>(listService.getListByUserId(userId), HttpStatus.OK);
  }

}
