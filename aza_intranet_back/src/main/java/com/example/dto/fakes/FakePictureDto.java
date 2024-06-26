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
//Special class, maybe I delete it
public class FakePictureDto {
    private Integer id;

    private String img_name;

    private byte[] img;

    private String img_type;
}
