package com.school_assignment_tracker.back_end.repo;

import com.school_assignment_tracker.back_end.model.Institute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InstituteRepo extends JpaRepository<Institute , Long> {
    Optional<Institute> findById(Long id);
}
