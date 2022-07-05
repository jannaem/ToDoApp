package tbz.project.todoapp.user;

import tbz.project.todoapp.role.Role;

import java.util.List;

public interface UserService {
    User saveUser(UserDTO userDTO);
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    User getUser(String username);
    UserDTO getUserDTO(String username);
    List<User> getUsers();
}
