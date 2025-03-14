package com.school_assignment_tracker.back_end.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
    
}
