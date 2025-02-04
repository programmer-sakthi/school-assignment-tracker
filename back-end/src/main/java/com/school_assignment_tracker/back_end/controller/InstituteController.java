package com.school_assignment_tracker.back_end.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.school_assignment_tracker.back_end.model.Institute;
import com.school_assignment_tracker.back_end.services.InstituteService;

import lombok.Data;

@RestController
@RequestMapping("/api")
@CrossOrigin
@Data
public class InstituteController {
    @Autowired
    private InstituteService instituteService;

    @GetMapping("/institutes")
    public ResponseEntity<List<Institute>> getAllInstitutes() {
        List<Institute> institutes = instituteService.getAllInstitutes();
        return ResponseEntity.ok(institutes);
    }

    @PostMapping("/institutes")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> addInstitute(@RequestPart Institute institute, @RequestPart MultipartFile imageFile) {
        try {
            Institute institute1 = instituteService.addInstitute(institute, imageFile);
            return new ResponseEntity<>(institute1, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/institutes/{instituteId}/image")
    public ResponseEntity<byte[]> getImageByInstituteId(@PathVariable long instituteId) {
        Institute institute = instituteService.getInstituteById(instituteId).get();
        byte[] imageFile = institute.getImageData();

        return ResponseEntity.ok().contentType(MediaType.valueOf(institute.getImageType())).body(imageFile);
    }

    @DeleteMapping("/institutes/{instituteId}")
    public ResponseEntity<String> deleteInstitute(@PathVariable long instituteId) {
        instituteService.deleteInstitute(instituteId);
        return ResponseEntity.ok("Deleted successfully");
    }

    @PutMapping("/institutes/{instituteId}")
    public ResponseEntity<String> updateInstitute(@PathVariable long instituteId,
            @RequestPart("institute") Institute institute,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        try {
            instituteService.updateInstitute(instituteId, institute, imageFile);
            return ResponseEntity.ok("Updated Successfully");
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

}
