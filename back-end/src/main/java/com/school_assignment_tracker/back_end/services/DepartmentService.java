package com.school_assignment_tracker.back_end.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.school_assignment_tracker.back_end.model.Department;
import com.school_assignment_tracker.back_end.repo.DepartmentRepo;

@Service
public class DepartmentService {

    @Autowired
    DepartmentRepo departmentRepo;

    public List<Department> getDepartments() {
        return departmentRepo.findAll();
    }

    public ResponseEntity<?> addDepartment(Department department) {
        departmentRepo.save(department);
        return ResponseEntity.ok("Department added successfully");
    }

}
