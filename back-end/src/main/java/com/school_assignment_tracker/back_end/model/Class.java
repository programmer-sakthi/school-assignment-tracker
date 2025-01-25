package com.school_assignment_tracker.back_end.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Class")

public class Class {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "class_id")
    private long id;

    

}
