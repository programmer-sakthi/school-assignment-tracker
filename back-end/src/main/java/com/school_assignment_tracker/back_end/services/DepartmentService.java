package com.school_assignment_tracker.back_end.services;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.school_assignment_tracker.back_end.model.Department;
import com.school_assignment_tracker.back_end.model.Institute;
import com.school_assignment_tracker.back_end.repo.DepartmentRepo;
import com.school_assignment_tracker.back_end.repo.InstituteRepo;

@Service
public class DepartmentService {

    @Autowired
    DepartmentRepo departmentRepo;

    @Autowired
    InstituteRepo instituteRepo;

    public List<Department> getDepartments() {
        return departmentRepo.findAll();
    }

    public ResponseEntity<?> addDepartment(Department department) {
        departmentRepo.save(department);
        return ResponseEntity.ok("Department added successfully");
    }

    public ResponseEntity<?> mapDepartmentToInstitute(Long departmentId, Long instituteId) {
        Department department = departmentRepo.findById(departmentId).get();
        Institute institute = instituteRepo.findById(instituteId).get();
        department.setInstitute(institute);
        Set<Department> departments = institute.getDepartments();
        departments.add(department);
        institute.setDepartments(departments);
        instituteRepo.save(institute);
        departmentRepo.save(department);
        return ResponseEntity.ok("Department mapped to institute successfully");

    }

    public Set<Department> getDepartmentsByInstituteId(Long id) {
        Institute institute = instituteRepo.findById(id).get();
        return institute.getDepartments();
    }

    public Department getDepartmentById(Long id) {
        return departmentRepo.findById(id).get();
    }

    public ResponseEntity<?> updateDepartment(Long id, String name) {
        Department department = departmentRepo.findById(id).get();
        department.setName(name);
        departmentRepo.save(department);
        return ResponseEntity.ok("Department updated successfully");
    }

}
