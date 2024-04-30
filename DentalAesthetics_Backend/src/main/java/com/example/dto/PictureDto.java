package com.example.dto;

import com.example.dto.fakes.FakeDentistDto;
import com.example.entity.DentistEntity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PictureDto {
    private Integer id;

    private String img_name;

    private byte[] img;

    private List<FakeDentistDto> dentist;
}
