package com.school_assignment_tracker.back_end.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import com.school_assignment_tracker.back_end.model.Department;
import com.school_assignment_tracker.back_end.services.DepartmentService;

@RestController
public class DepartmentController {

    @Autowired
    DepartmentService departmentService;

    @GetMapping("/departments")
    public List<Department> getDepartments() {
        return departmentService.getDepartments();
    }

    @PostMapping("/departments")
    public String addDepartments(@RequestBody Department department) {
        departmentService.addDepartment(department);
        return "Department added successfully";
    }

}
