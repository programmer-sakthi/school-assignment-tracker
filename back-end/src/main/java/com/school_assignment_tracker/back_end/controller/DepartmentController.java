package com.school_assignment_tracker.back_end.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import com.school_assignment_tracker.back_end.model.Department;
import com.school_assignment_tracker.back_end.services.DepartmentService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class DepartmentController {

    @Autowired
    DepartmentService departmentService;

    @GetMapping("/departments")
    public List<Department> getDepartments() {
        return departmentService.getDepartments();
    }

    @PostMapping("/departments")
    public ResponseEntity<?> addDepartments(@RequestBody Department department) {
        departmentService.addDepartment(department);
        return ResponseEntity.ok(department);
    }

    @PutMapping("/departments/{id}/{name}")
    public ResponseEntity<?> updateDepartments(@PathVariable Long id, @PathVariable String name) {
        departmentService.updateDepartment(id, name);
        return ResponseEntity.ok("Department updated successfully");
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

    @DeleteMapping("/deleteDepartment/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok("Department deleted successfully");
    }

}
