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
/*
    public static DepartmentEntity toEntity(DepartmentDto dto) throws ResponseStatusException {
        DentistService dentistService = new DentistService();
        AppointmentService appointmentService = new AppointmentService();
        InterventionService interventionService = new InterventionService();
        if (dto == null){
            throw new IllegalArgumentException("El Objeto departmentDto no puede ser nulo.");
        }
        List<DentistEntity> users = new ArrayList<>();
        for (Integer user : dto.getDentists()) {
            users.add(dentistService.getUserById(user));
        }
        List<AppointmentEntity> appointments = new ArrayList<>();
        for (Integer appointment : dto.getAppointments()){
            appointments.add(appointmentService.getAppointmentById(appointment));
        }
        List<InterventionEntity> interventions = new ArrayList<>();
        for (Integer intervention : dto.getInterventions()) {
            interventions.add(interventionService.getInterventionById(intervention));
        }

        return new DepartmentEntity(dto.getId(), dto.getDepartment_name(), users,appointments,interventions);
    }

    public static DepartmentDto toDto(DepartmentEntity entity){
        List<Integer> usersIds = new ArrayList<>();
        for (DentistEntity user : entity.getDentist()) {
            usersIds.add(user.getId());
        }
        List<Integer> appointmentsIds = new ArrayList<>();
        for (AppointmentEntity appointment : entity.getAppointments()){
            appointmentsIds.add(appointment.getId());
        }
        List<Integer> interventionsIds = new ArrayList<>();
        for (InterventionEntity intervention : entity.getInterventions()){
            interventionsIds.add(intervention.getId());
        }
        return new DepartmentDto(entity.getId(), entity.getDepartment_name(), usersIds, appointmentsIds, interventionsIds);
    }
    */

}
