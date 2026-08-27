package com.example.dto;

import com.example.dto.fakes.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class DentistDto {

    private Integer id;
    private String full_name;
    private String email;
    @JsonIgnore
    private String pass;
    private FakePictureDto picture;
    private String job;
    private Integer permits;
    private Date date_of_birth;
    private String nif;
    private String address;
    private String gender;
    private List<FakeAppointmentDto.GetAppointmentDto> appointments;
    private FakeDepartmentDto.GetDepartmentDto department;
    private List<FakeEventDto.GetEventDto> events;
    private List<FakePatientDto.GetPatientDto> patients;
}
