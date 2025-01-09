package com.school_assignment_tracker.back_end.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "Users")
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Or GenerationType.AUTO
    private Long id;

    @Column(name="Email")
    @JsonProperty("email")
    private String email;

    @Column(name="password")
    @JsonProperty("password")
    private String password;

    @Column(name="Name")
    @JsonProperty("name")
    private String name;

    @Column(name="Type")
    @JsonProperty("type")
    private String type;

}
