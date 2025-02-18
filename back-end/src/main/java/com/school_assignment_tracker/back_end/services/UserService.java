package com.school_assignment_tracker.back_end.services;

import com.school_assignment_tracker.back_end.model.Institute;
import com.school_assignment_tracker.back_end.model.User;
import com.school_assignment_tracker.back_end.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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

           if(user.get().getPassword().matches(password))
                return user;
           return Optional.empty();
    }


    public Optional<User> validateEmail(String email) {
        Optional<User> user=userRepo.findByEmail(email);

        return user;
    }


    public Set<Institute> getInstituteByUserId(Long userId) {
        User user=userRepo.findById(userId).get();
        Set<Institute> institutes=user.getInstitutes();
        return institutes;
    }
}
