package com.school_assignment_tracker.back_end.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school_assignment_tracker.back_end.model.Assignment;
import com.school_assignment_tracker.back_end.repo.AssignmentRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AssignmentService {

    @Autowired
    private AssignmentRepo assignmentRepo;

    public List<Assignment> getAllAssignments() {
        return assignmentRepo.findAll();
    }

    public Optional<Assignment> getAssignmentById(Long id) {
        return assignmentRepo.findById(id);
    }

    public Assignment createAssignment(Assignment assignment) {
        return assignmentRepo.save(assignment);
    }

    public Assignment updateAssignment(Long id, Assignment updatedAssignment) {
        return assignmentRepo.findById(id).map(assignment -> {
            assignment.setTitle(updatedAssignment.getTitle());
            assignment.setDescription(updatedAssignment.getDescription());
            assignment.setDeadline(updatedAssignment.getDeadline());
            return assignmentRepo.save(assignment);
        }).orElseThrow(() -> new RuntimeException("Assignment not found with id: " + id));
    }

    public void deleteAssignment(Long id) {
        assignmentRepo.deleteById(id);
    }
}
