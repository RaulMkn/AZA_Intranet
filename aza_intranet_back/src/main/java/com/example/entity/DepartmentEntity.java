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
@Table(name = "department")
public class DepartmentEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String department_name;

    private int deleted;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp created_at;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp updated_at;

    @OneToMany(mappedBy = "department")
    private List<DentistEntity> dentists;

    @OneToMany(mappedBy = "department")
    private List<AppointmentEntity> appointments;

    @OneToMany(mappedBy = "department")
    private List<InterventionEntity> interventions;
}
