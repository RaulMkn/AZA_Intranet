package com.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "event")
public class EventEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp date_time_beginning;
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp date_time_ending;
    private String title;
    private String description;
    private String location;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dentist")
    private DentistEntity dentist;
}
