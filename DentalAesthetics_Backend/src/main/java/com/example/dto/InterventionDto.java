package com.example.dto;

import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dto.fakes.FakeAppointmentDto;
import com.example.dto.fakes.FakeDepartmentDto;
import com.example.entity.AppointmentEntity;
import com.example.entity.DepartmentEntity;
import com.example.entity.InterventionEntity;
import com.example.service.AppointmentService;
import com.example.service.DepartmentService;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
public class InterventionDto {
    private Integer id;
    private String full_name;
    private BigDecimal price;
    private FakeDepartmentDto department;
    private List<FakeAppointmentDto> appointments;
}
