package com.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "dentist")
public class DentistEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String full_name;

    private String email;

    private String pass;

    private String job;

    private Integer permits;

    @Temporal(TemporalType.DATE)
    private Date date_of_birth;

    private String nif;

    private String address;

    private String gender;

    private int deleted;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp created_at;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp updated_at;

    @OneToMany(mappedBy = "dentist")
    private List<AppointmentEntity> appointments;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department")
    private DepartmentEntity department;

    @OneToMany(mappedBy = "dentist")
    private List<EventEntity> events;

    @OneToMany(mappedBy = "dentist")
    private List<PatientEntity> patients;

    @OneToMany(mappedBy = "dentist")
    private List<PaymentEntity> payments;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "picture")
    private PictureEntity picture;


}
