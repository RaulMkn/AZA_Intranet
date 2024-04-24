package com.example.dto;

import com.example.entity.AppointmentEntity;
import com.example.entity.InterventionEntity;
import com.example.service.DepartmentService;
import com.example.service.InterventionService;
import com.example.service.PatientService;
import com.example.service.DentistService;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
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
    private Integer department;
    private Integer dentist;
    private Integer patient;
    private List<Integer> interventions;



    public static AppointmentEntity toEntity(AppointmentDto dto){
        if (dto == null){
            throw new IllegalArgumentException("El objeto ApointmentDto no puede ser nulo");
        }
        DentistService dentistService = new DentistService();
        PatientService patientService = new PatientService();
        DepartmentService departmentService = new DepartmentService();
        InterventionService interventionService = new InterventionService();
        AppointmentEntity appointment = new AppointmentEntity();
        appointment.setId(dto.getId());
        appointment.setDate_time_beginning(dto.getDate_time_beginning());
        appointment.setDate_time_ending(dto.getDate_time_ending());
        appointment.setPriority(dto.getPriority());
        appointment.setState(dto.getState());
        appointment.setTitle(dto.getTitle());
        appointment.setDescription(dto.getDescription());
        appointment.setTotal_price(dto.getTotal_price());
        appointment.setInvoice(dto.getInvoice());
        appointment.setDentist(dentistService.getUserById(dto.getDentist()));
        appointment.setPatient(patientService.getPatientId(dto.getPatient()));
        appointment.setDepartment(departmentService.getDepartmentById(dto.getDepartment()));
        List<InterventionEntity> interventionEntities = new ArrayList<>();
        for (Integer intervention : dto.getInterventions()){
            interventionEntities.add(interventionService.getInterventionById(intervention));
        }
        appointment.setInterventions(interventionEntities);
        return appointment;
    }
    public static AppointmentDto toDto(AppointmentEntity entity){
        AppointmentDto dto = new AppointmentDto();
        dto.setId(entity.getId());
        dto.setDate_time_beginning(entity.getDate_time_beginning());
        dto.setDate_time_ending(entity.getDate_time_ending());
        dto.setPriority(entity.getPriority());
        dto.setState(entity.getState());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setTotal_price(entity.getTotal_price());
        dto.setInvoice(entity.getInvoice());
        dto.setDentist(entity.getDentist().getId());
        dto.setPatient(entity.getPatient().getId());
        dto.setDepartment(entity.getDepartment().getId());
        List<Integer> interventions = new ArrayList<>();
        for (InterventionEntity intervention : entity.getInterventions()){
            interventions.add(intervention.getId());
        }
        dto.setInterventions(interventions);
        return dto;

    }
}
