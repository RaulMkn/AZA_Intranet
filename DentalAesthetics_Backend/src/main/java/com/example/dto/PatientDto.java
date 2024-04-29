package com.example.dto;

import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dto.fakes.FakeAppointmentDto;
import com.example.dto.fakes.FakeDentistDto;
import com.example.entity.AppointmentEntity;
import com.example.entity.DentistEntity;
import com.example.entity.PatientEntity;
import com.example.service.AppointmentService;
import com.example.service.DentistService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
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
    private FakeDentistDto dentist;
    private List<FakeAppointmentDto> appointments;
}
