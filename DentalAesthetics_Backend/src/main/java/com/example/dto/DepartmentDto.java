package com.example.dto;

import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dto.fakes.FakeAppointmentDto;
import com.example.dto.fakes.FakeDentistDto;
import com.example.dto.fakes.FakeInterventionDto;
import com.example.entity.AppointmentEntity;
import com.example.entity.DepartmentEntity;
import com.example.entity.DentistEntity;
import com.example.entity.InterventionEntity;
import com.example.service.AppointmentService;
import com.example.service.DentistService;
import com.example.service.InterventionService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentDto {
    private Integer id;
    private String department_name;
    private List<FakeDentistDto> dentists;
    private List<FakeAppointmentDto> appointments;
    private List<FakeInterventionDto> interventions;
}
