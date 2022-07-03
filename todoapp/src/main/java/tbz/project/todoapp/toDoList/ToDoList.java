package tbz.project.todoapp.toDoList;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tbz.project.todoapp.user.User;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class ToDoList {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int toDoListId;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "id_user", referencedColumnName = "userId", nullable = false)
  private User user;

  private String name;

}

