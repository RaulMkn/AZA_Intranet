package com.example.dto;

import com.example.dto.fakes.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class DentistDto {

    private Integer id;
    private String full_name;
    private String email;
    private String pass;
    private FakePictureDto picture;
    private String job;
    private Integer permis;
    private List<FakeAppointmentDto> appointments;
    private FakeDepartmentDto department;
    private List<FakeEventDto> events;
    private List<FakePatientDto> patients;
}
