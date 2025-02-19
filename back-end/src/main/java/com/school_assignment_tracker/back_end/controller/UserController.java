package com.school_assignment_tracker.back_end.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school_assignment_tracker.back_end.model.User;
import com.school_assignment_tracker.back_end.services.UserService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    // to create a new user("Signup")
    @PostMapping("/users")
    public ResponseEntity<String> addUser(@RequestBody User user) {

        String email = user.getEmail();
        Optional<User> user1 = userService.validateEmail(email);

        if (user1.isPresent()) {
            return ResponseEntity.status(409).body("Email already exists !");
        }

        userService.addUser(user);
        return ResponseEntity.ok("User Created Successfully ! ");

    }

    // to get all available users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/validate-login")
    public ResponseEntity<?> validateLogin(@RequestBody UserLogin u) {
        String email = u.getEmail();
        String password = u.getPassword();
        Optional<User> user = userService.validateEmail(email);

        if (!user.isPresent()) {
            return ResponseEntity.status(401).body("Email doesn't exist !");
        } else {
            user = userService.validateLogin(email, password);

            if (user.isPresent()) {     
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(401).body("Invalid Password !");

            }

        }

    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserLogin {
        private String email;
        private String password;
    }

}
