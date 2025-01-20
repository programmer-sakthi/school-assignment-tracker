package com.school_assignment_tracker.back_end.controller;

import com.school_assignment_tracker.back_end.model.Institute;
import com.school_assignment_tracker.back_end.services.InstituteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class InstituteController {
    @Autowired
    private InstituteService instituteService;


    @GetMapping("/institutes")
    public ResponseEntity<List<Institute>> getAllInstitutes()
    {
        List<Institute> institutes=instituteService.getAllInstitutes();
        return ResponseEntity.ok(institutes);
    }

    @PostMapping("/institutes")
    public ResponseEntity<String> addInstitute(@RequestBody Institute institute)
    {
        instituteService.addInstitute(institute);
        return ResponseEntity.ok("Success");
    }


}
