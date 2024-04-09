package com.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
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
    @OneToMany(mappedBy = "department")
    private List<DentistEntity> dentist ;
    @OneToMany(mappedBy = "department")
    private List<AppointmentEntity> appointments;
    @OneToMany(mappedBy = "department")
    private List<InterventionEntity> interventions;
}
