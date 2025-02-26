package com.school_assignment_tracker.back_end.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @PostMapping("/mapDepartmentToInstitute/{departmentId}/{instituteId}")
    public String mapDepartmentToInstitute(@PathVariable Long departmentId, @PathVariable Long instituteId) {
        departmentService.mapDepartmentToInstitute(departmentId, instituteId);
        return "Department mapped to institute successfully";
    }

    @GetMapping("/getDepartmentsByInstituteId/{id}")
    public Set<Department> getDepartmentsByInstituteId(@PathVariable Long id) {
        return departmentService.getDepartmentsByInstituteId(id);
    }

    @GetMapping("/getDepartment/{id}")
    public Department getDepartmentById(@PathVariable Long id) {
        return departmentService.getDepartmentById(id);
    }

}
