package com.example.dto;

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
    private Integer department;
    private List<Integer> appointments;

    public static InterventionEntity toEntity(InterventionDto dto){
        InterventionEntity entity = new InterventionEntity();
        DepartmentService departmentService = new DepartmentService();
        AppointmentService appointmentService = new AppointmentService();
        entity.setId(dto.getId());
        entity.setFull_name(dto.getFull_name());
        entity.setPrice(dto.getPrice());
        entity.setDepartment(departmentService.getDepartmentById(dto.getDepartment()));
        List<AppointmentEntity> appointments = new ArrayList<>();
        for (Integer appointment : dto.getAppointments()){
            appointments.add(appointmentService.getAppointmentById(appointment));
        }
        entity.setAppointments(appointments);
        return entity;
    }

    public static InterventionDto toDto(InterventionEntity entity){
        InterventionDto dto = new InterventionDto();
        dto.setId(entity.getId());
        dto.setFull_name(entity.getFull_name());
        dto.setPrice(entity.getPrice());
        dto.setDepartment(entity.getDepartment().getId());
        List<Integer> appointments = new ArrayList<>();
        for (AppointmentEntity appointment : entity.getAppointments()){
            appointments.add(appointment.getId());
        }
        dto.setAppointments(appointments);
        return dto;
    }
}
