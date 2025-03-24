package com.school_assignment_tracker.back_end.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school_assignment_tracker.back_end.model.Institute;
import com.school_assignment_tracker.back_end.model.User;
import com.school_assignment_tracker.back_end.repo.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private EmailService emailService;

    public void addUser(User user) {
        userRepo.save(user);
        emailService.sendWelcomeEmail(user.getEmail());
    }

    public List<User> getUsers() {
        return userRepo.findAll();
    }

    public Optional<User> validateLogin(String email, String password) {
        Optional<User> user = userRepo.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().matches(password)) {
            return user;
        }
        return Optional.empty();
    }

    public Optional<User> validateEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public Set<Institute> getInstituteByUserId(Long userId) {
        return userRepo.findById(userId).map(User::getInstitutes).orElse(Set.of());
    }
}
