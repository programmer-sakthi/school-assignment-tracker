package com.school_assignment_tracker.back_end.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "Institute")
@NoArgsConstructor
public class Institute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Or GenerationType.AUTO
    @JsonProperty("id")
    private Long id;

    @Column(name="name")
    @JsonProperty("name")
    private String name;

    @Column(name="description")
    @JsonProperty("description")
    private String description;


    private String imageName;
    private String imageType;

    @Lob
    private byte[] imageData;

}
