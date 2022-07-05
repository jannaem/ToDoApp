package tbz.project.todoapp.user;
import com.sun.istack.NotNull;
import lombok.*;
import tbz.project.todoapp.role.Role;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NotNull
    private int userId;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @Column(unique=true)
    @NotNull
    private String email;
    @Column(unique=true)
    @NotNull
    private String username;
    @NotNull
    private String password;
    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();

}
