package com.example.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
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

    private int deleted;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp created_at;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp updated_at;

    @Temporal(TemporalType.DATE)
    private Date date_of_birth;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dentist")
    private DentistEntity dentist;

    @OneToMany(mappedBy = "patient")
    private List<AppointmentEntity> appointments;


}
