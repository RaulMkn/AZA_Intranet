package com.example.dto;

import com.example.entity.AppointmentEntity;
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
    private int phone;
    private int dentist;
    private List<Integer> appointments;

    public static PatientEntity toEntity(PatientDto dto) {
        DentistService dentistService = new DentistService();
        AppointmentService appointmentService = new AppointmentService();
        if (dto == null) {
            throw new IllegalArgumentException("El objeto patientDTO no puede ser nulo");
        }
        List<AppointmentEntity> appointmentEntities = new ArrayList<>();
        for(Integer list : dto.getAppointments()){
            appointmentEntities.add(appointmentService.getAppointmentById(list));

        }
        return new PatientEntity(
                dto.getId(), dto.getFull_name(), dto.getEmail(), dto.getPhone(),
                dentistService.getUserById(dto.getDentist()), appointmentEntities);
    }

    public static PatientDto toDto(PatientEntity entity) {
        List<Integer> appointments = new ArrayList<>();
        for (AppointmentEntity appointment : entity.getAppointments()){
            appointments.add(appointment.getId());
        }
        return new PatientDto(
                entity.getId(), entity.getFull_name(), entity.getEmail(), entity.getPhone(),
                entity.getDentist().getId(), appointments);

    }


}
