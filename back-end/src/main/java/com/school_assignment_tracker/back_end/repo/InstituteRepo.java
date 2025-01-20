package com.school_assignment_tracker.back_end.repo;

import com.school_assignment_tracker.back_end.model.Institute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstituteRepo extends JpaRepository<Institute , Long> {

}
