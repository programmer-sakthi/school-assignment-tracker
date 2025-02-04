package com.school_assignment_tracker.back_end.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.school_assignment_tracker.back_end.model.Institute;
import com.school_assignment_tracker.back_end.repo.InstituteRepo;

@Service
public class InstituteService {

    @Autowired
    InstituteRepo instituteRepo;

    public List<Institute> getAllInstitutes() {
        return instituteRepo.findAll();
    }

    public Institute addInstitute(Institute institute, MultipartFile imageFile) throws IOException {
        institute.setImageName(imageFile.getOriginalFilename());
        institute.setImageType(imageFile.getContentType());
        institute.setImageData(imageFile.getBytes());
        instituteRepo.save(institute);
        return institute;
    }

    public Optional<Institute> getInstituteById(Long id) {
        Optional<Institute> institute = instituteRepo.findById(id);
        return institute;
    }

    public ResponseEntity<?> deleteInstitute(long instituteId) {
        instituteRepo.deleteById(instituteId);
        return ResponseEntity.ok("Deleted Successfully");
    }

    public void updateInstitute(long instituteId, Institute updatedInstitute, MultipartFile imageFile)
            throws IOException {
        Optional<Institute> existingInstituteOpt = instituteRepo.findById(instituteId);
        if (existingInstituteOpt.isPresent()) {
            Institute existingInstitute = existingInstituteOpt.get();
            existingInstitute.setName(updatedInstitute.getName());
            existingInstitute.setDescription(updatedInstitute.getDescription());
            if (imageFile != null) {
                existingInstitute.setImageName(imageFile.getOriginalFilename());
                existingInstitute.setImageType(imageFile.getContentType());
                existingInstitute.setImageData(imageFile.getBytes());
            }
            instituteRepo.save(existingInstitute);
        } else {
            throw new RuntimeException("Institute not found");
        }
    }
        
    




}
