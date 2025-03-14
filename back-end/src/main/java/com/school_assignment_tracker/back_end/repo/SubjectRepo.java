package com.school_assignment_tracker.back_end.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.school_assignment_tracker.back_end.model.Subject;

@Repository
public interface SubjectRepo extends JpaRepository<Subject, Long> {

}