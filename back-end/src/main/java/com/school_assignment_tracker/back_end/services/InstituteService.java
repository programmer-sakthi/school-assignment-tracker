package com.school_assignment_tracker.back_end.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.school_assignment_tracker.back_end.model.Institute;
import com.school_assignment_tracker.back_end.model.User;
import com.school_assignment_tracker.back_end.repo.InstituteRepo;
import com.school_assignment_tracker.back_end.repo.UserRepo;

@Service
public class InstituteService {

    @Autowired
    InstituteRepo instituteRepo;
    @Autowired
    UserRepo userRepo;

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

    @Transactional
    public void addUserToInstitute(Long userId, Long instituteId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Institute institute = instituteRepo.findById(instituteId)
                .orElseThrow(() -> new RuntimeException("Institute not found"));

        if (!institute.getUsers().contains(user)) { // Prevent duplicate addition
            institute.getUsers().add(user);
            user.getInstitutes().add(institute); // 🔹 Ensure bidirectional update

            userRepo.save(user); // 🔹 Save both entities
            instituteRepo.save(institute);
        }

        System.out.println("User.institutes: " + user.getInstitutes());
        System.out.println("Institute.users: " + institute.getUsers());
    }

    public Set<Institute> getInstituteByUserId(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Set<Institute> institutes = user.getInstitutes();
        return institutes;
    }

}
