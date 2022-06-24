package tbz.project.todoapp.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository  extends JpaRepository<Role, Integer> {
    Role findByName(String role);
}
