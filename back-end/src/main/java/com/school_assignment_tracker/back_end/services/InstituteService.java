package com.school_assignment_tracker.back_end.services;

import com.school_assignment_tracker.back_end.model.Institute;
import com.school_assignment_tracker.back_end.repo.InstituteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class InstituteService {

    @Autowired
    InstituteRepo instituteRepo;

    public List<Institute> getAllInstitutes() {
        return instituteRepo.findAll();
    }

    public Institute addInstitute(Institute institute , MultipartFile imageFile) throws IOException {
        institute.setImageName(imageFile.getOriginalFilename());
        institute.setImageType(imageFile.getContentType());
        institute.setImageData(imageFile.getBytes());
        instituteRepo.save(institute);
        return institute;
    }

    public Optional<Institute> getInstituteById(Long id) {
         Optional<Institute> institute= instituteRepo.findById(id);
         return institute;
    }
}
