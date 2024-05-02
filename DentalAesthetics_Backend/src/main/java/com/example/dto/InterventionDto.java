package com.example.dto;

import com.example.dto.fakes.FakeAppointmentDto;
import com.example.dto.fakes.FakeDepartmentDto;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
@Getter
@Setter
public class InterventionDto {
    private Integer id;
    private String full_name;
    private BigDecimal price;
    private FakeDepartmentDto.GetDepartmentDto department;
    private List<FakeAppointmentDto.GetAppointmentDto> appointments;
}
