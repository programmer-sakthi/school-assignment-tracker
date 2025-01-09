package com.school_assignment_tracker.back_end.repo;

import com.school_assignment_tracker.back_end.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
}
