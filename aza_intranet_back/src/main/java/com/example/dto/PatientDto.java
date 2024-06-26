package com.example.dto;

import com.example.dto.fakes.FakeAppointmentDto;
import com.example.dto.fakes.FakeDentistDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientDto {
    private Integer id;
    private String full_name;
    private String email;
    private Integer phone;
    private String nif;
    private String address;
    private String gender;
    private Date date_of_birth;
    private FakeDentistDto.GetDentistDto dentist;
    private List<FakeAppointmentDto.GetAppointmentDto> appointments;
}
