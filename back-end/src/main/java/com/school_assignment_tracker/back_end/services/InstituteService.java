package com.school_assignment_tracker.back_end.services;

import com.school_assignment_tracker.back_end.model.Institute;
import com.school_assignment_tracker.back_end.repo.InstituteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstituteService {

    @Autowired
    InstituteRepo instituteRepo;

    public List<Institute> getAllInstitutes() {
        return instituteRepo.findAll();
    }

    public void addInstitute(Institute institute) {
        System.out.println(institute);
        instituteRepo.save(institute);
    }
}
