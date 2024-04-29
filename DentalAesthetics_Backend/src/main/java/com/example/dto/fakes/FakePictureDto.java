package com.example.dto.fakes;

import com.example.entity.DentistEntity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FakePictureDto {
    private Integer id;

    private String img_name;

    private Byte[] img;
}
