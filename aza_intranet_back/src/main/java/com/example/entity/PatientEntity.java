package com.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "patient")
public class PatientEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String full_name;
    private String email;
    private int phone;
    private String nif;
    private String address;
    private String gender;
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp birthDate;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dentist")
    private DentistEntity dentist;
    @OneToMany(mappedBy = "patient")
    private List<AppointmentEntity> appointments;


}
