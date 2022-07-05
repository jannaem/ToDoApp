package tbz.project.todoapp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import tbz.project.todoapp.role.Role;
import tbz.project.todoapp.user.UserDTO;
import tbz.project.todoapp.user.UserService;

@SpringBootApplication
public class TodoappApplication {

    public static void main(String[] args) {
        SpringApplication.run(TodoappApplication.class, args);
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner run(UserService userService) {
        return args -> {
            userService.saveRole(new Role(1, "ROLE_USER"));
            userService.saveRole(new Role(2, "ROLE_ADMIN"));
            userService.saveUser(new UserDTO("Milena", "Blaser", "blaser@gmail.com", "mblaser", "blaser123"));
            userService.saveUser(new UserDTO("Janna", "Esteban", "esteban@gmail.com", "jesteban", "esteban123"));
        };
    }
}
