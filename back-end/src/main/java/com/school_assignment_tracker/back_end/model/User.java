package com.school_assignment_tracker.back_end.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "Users")
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Or GenerationType.AUTO
    private Long id;

    @Column(name = "Email")
    @JsonProperty("email")
    private String email;

    @Column(name = "password")
    @JsonProperty("password")
    private String password;

    @Column(name = "Name")
    @JsonProperty("name")
    private String name;

    @Column(name = "Type")
    @JsonProperty("type")
    private String type;

    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinTable(name = "user_institute", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "institute_id"))
    @JsonIgnore
    private Set<Institute> institutes;
}
