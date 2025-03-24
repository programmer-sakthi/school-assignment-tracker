package com.school_assignment_tracker.back_end.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.school_assignment_tracker.back_end.model.Subject;
import com.school_assignment_tracker.back_end.repo.SubjectRepo;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepo subjectRepo;

    public List<Subject> fetchSubjects() {
        return subjectRepo.findAll();
    }

    public ResponseEntity<?> createSubject(Subject subject) {
        subjectRepo.save(subject);
        return ResponseEntity.ok("Subject created successfully");
    }

    public ResponseEntity<?> deleteSubject(Long subjectId) {
        Subject subject = subjectRepo.findById(subjectId).get();
        subjectRepo.delete(subject);
        return ResponseEntity.ok("Deletion successful");
    }

    @PutMapping("/subjects/{id}")
    public ResponseEntity<?> updateSubject(@PathVariable Long subjectId, @RequestBody Subject subject) {
        Optional<Subject> existingSubject = subjectRepo.findById(subjectId);

        if (existingSubject.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Subject not found");
        }

        Subject updatedSubject = existingSubject.get();
        updatedSubject.setSubjectCode(subject.getSubjectCode());
        updatedSubject.setSubjectName(subject.getSubjectName());
        updatedSubject.setColorCode(subject.getColorCode());

        subjectRepo.save(updatedSubject);

        return ResponseEntity.ok(updatedSubject);
    }

}
