package com.school_assignment_tracker.back_end.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school_assignment_tracker.back_end.model.Subject;
import com.school_assignment_tracker.back_end.services.SubjectService;

@RestController
@RequestMapping("/subjects")
@CrossOrigin
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @GetMapping
    public ResponseEntity<?> fetchSubjects() {
        try {
            List<Subject> subjects = subjectService.fetchSubjects();
            return ResponseEntity.ok(subjects);
        } catch (Exception e) {

            return ResponseEntity.internalServerError().body("Something went wrong");
        }
    }

    @PostMapping
    public ResponseEntity<?> createSubject(@RequestBody Subject subject) {
        return subjectService.createSubject(subject);
    }

    @DeleteMapping("/{subjectId}")
    public ResponseEntity<?> deleteSubject(@PathVariable Long subjectId) {
        return subjectService.deleteSubject(subjectId);
    }    

    @PutMapping("/{subjectId}")
    public ResponseEntity<?> updateSubject(@PathVariable Long subjectId,@RequestBody Subject subject)
    {
        return subjectService.updateSubject(subjectId,subject);
    }


}
    