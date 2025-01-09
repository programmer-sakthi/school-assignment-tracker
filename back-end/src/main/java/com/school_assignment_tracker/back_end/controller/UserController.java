package com.school_assignment_tracker.back_end.controller;

import com.school_assignment_tracker.back_end.model.User;
import com.school_assignment_tracker.back_end.services.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;


    // to create a new user("Signup")
    @PostMapping("/users")
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

    // to get all available users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }


    @PostMapping("/validate-login")
    public ResponseEntity<String> validateLogin(@RequestBody UserLogin u) {
        String email=u.getEmail();
        String password=u.getPassword();
        System.out.println(email+password);
        Optional<User> user = userService.validateLogin(email, password);

        if (user.isPresent()) {
            return ResponseEntity.ok("User validated successfully");
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

    }   

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserLogin
    {
        private String email;
        private String password;
    }




}
