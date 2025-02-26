package com.school_assignment_tracker.back_end.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.school_assignment_tracker.back_end.model.Department;

@Repository
public interface DepartmentRepo extends JpaRepository<Department, Long> {

    

}
