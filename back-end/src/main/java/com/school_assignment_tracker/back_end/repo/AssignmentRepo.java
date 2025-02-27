package com.school_assignment_tracker.back_end.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.school_assignment_tracker.back_end.model.Assignment;

@Repository
public interface AssignmentRepo extends JpaRepository<Assignment, Long> {
}
