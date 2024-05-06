package com.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "picture")
public class PictureEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String img_name;

    @Column(name = "img_array", columnDefinition="bytea")
    private byte[] img;

    private String img_type;


    @OneToMany(mappedBy = "picture", fetch = FetchType.EAGER)
    private List<DentistEntity> dentist;

}
