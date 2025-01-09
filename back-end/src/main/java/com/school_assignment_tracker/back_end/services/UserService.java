package com.school_assignment_tracker.back_end.services;

import com.school_assignment_tracker.back_end.model.User;
import com.school_assignment_tracker.back_end.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public void addUser(User user)
    {
        userRepo.save(user);
    }


    public List<User> getUsers() {
        List<User> users=userRepo.findAll();
        return users;
    }

    public Optional<User> validateLogin(String email, String password) {
        Optional<User> user=userRepo.findByEmail(email);

        if(user.isPresent())
        {
            if(user.get().getPassword().matches(password))
                return user;
        }

        return Optional.empty();
    }

    public Optional<User> getUsersByName(String sakthi) {
        Optional<User> users=userRepo.findByName(sakthi) ;
        return users;
    }
}
