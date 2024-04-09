package com.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "intervention")
public class InterventionEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String full_name;

    private BigDecimal price;

    @ManyToOne(fetch = FetchType.EAGER)
    private DepartmentEntity department;

    @ManyToMany(mappedBy = "interventions",fetch = FetchType.EAGER)
    private List<AppointmentEntity> appointments;
}
