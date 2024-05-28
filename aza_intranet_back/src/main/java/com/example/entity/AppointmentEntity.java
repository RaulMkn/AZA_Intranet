package com.example.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
@Table(name = "appointment")
public class AppointmentEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp date_time_beginning;
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp date_time_ending;
    private String priority;
    private String state;
    private String title;
    private String description;
    private BigDecimal total_price;
    private String invoice;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department")
    private DepartmentEntity department;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dentist")
    private DentistEntity dentist;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "patient")
    private PatientEntity patient;

    @ManyToMany
    @JoinTable(name = "appointments_interventions",
            joinColumns = @JoinColumn(name = "appointment"),
            inverseJoinColumns = @JoinColumn(name = "intervention"))
    private List<InterventionEntity> interventions;

}
