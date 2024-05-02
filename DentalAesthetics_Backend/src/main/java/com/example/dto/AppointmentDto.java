package com.example.dto;

import com.example.dto.fakes.FakeDentistDto;
import com.example.dto.fakes.FakeDepartmentDto;
import com.example.dto.fakes.FakeInterventionDto;
import com.example.dto.fakes.FakePatientDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AppointmentDto {
    private Integer id;
    private Timestamp date_time_beginning;
    private Timestamp date_time_ending;
    private String priority;
    private String state;
    private String title;
    private String description;
    private BigDecimal total_price;
    private String invoice;
    private FakeDepartmentDto department;
    private FakeDentistDto dentist;
    private FakePatientDto.GetPatientDto patient;
    private List<FakeInterventionDto> interventions;

}
