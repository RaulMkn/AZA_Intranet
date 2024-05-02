package com.example.dto;

import com.example.dto.fakes.FakeAppointmentDto;
import com.example.dto.fakes.FakeDentistDto;
import com.example.dto.fakes.FakeInterventionDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentDto {
    private Integer id;
    private String department_name;
    private List<FakeDentistDto.GetDentistDto> dentists;
    private List<FakeAppointmentDto.GetAppointmentDto> appointments;
    private List<FakeInterventionDto.GetInterventionDto> interventions;
}
