package com.example.dto;

import com.example.entity.*;
import com.example.service.AppointmentService;
import com.example.service.DepartmentService;
import com.example.service.EventService;
import com.example.service.PatientService;
import com.example.utils.Security;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class DentistDto {
    private Integer id;
    private String full_name;
    private String email;
    private String pass;
    private String picture;
    private String job;
    private Integer permis;
    private List<Integer> appointments;
    private Integer department;
    private List<Integer> events;
    private List<Integer> patients;

    public static DentistEntity toEntity(DentistDto dentistDto){
        DepartmentService departmentService = new DepartmentService();
        AppointmentService appointmentService = new AppointmentService();
        EventService eventService = new EventService();
        PatientService patientService = new PatientService();
        if (dentistDto == null){
            throw new IllegalArgumentException("El Objeto userDTO no puede ser nulo.");
        }
        DentistEntity user = new DentistEntity();
        user.setId(dentistDto.getId());
        user.setPicture(dentistDto.getPicture());
        user.setFull_name(dentistDto.getFull_name());
        user.setPass(Security.hashPassword(dentistDto.getPass()));
        user.setEmail(dentistDto.getEmail());
        user.setJob(dentistDto.getJob());
        user.setPermis(dentistDto.getPermis());

        user.setDepartment(departmentService.getDepartmentById(dentistDto.getDepartment()));

        List<AppointmentEntity> appointments = new ArrayList<>();
        for (Integer integer : dentistDto.getAppointments()){
            appointments.add(appointmentService.getAppointmentById(integer));
        }
        user.setAppointments(appointments);

        List<EventEntity> events = new ArrayList<>();
        for (Integer integer : dentistDto.getEvents()){
            events.add(eventService.getEventsById(integer));
        }
        user.setEvents(events);

        List<PatientEntity> patients = new ArrayList<>();
        for (Integer integer : dentistDto.getPatients()){
            patients.add(patientService.getPatientId(integer));
        }
        user.setPatients(patients);

        return user;
    }

    public static DentistDto toDto(DentistEntity dentistEntity){
        DentistDto dentistDto = new DentistDto();
        dentistDto.setId(dentistEntity.getId());
        dentistDto.setFull_name(dentistEntity.getFull_name());
        dentistDto.setEmail(dentistEntity.getEmail());
        dentistDto.setPass(dentistEntity.getPass());
        dentistDto.setJob(dentistEntity.getJob());
        dentistDto.setPicture(dentistEntity.getPicture());
        dentistDto.setPermis(dentistEntity.getPermis());
        dentistDto.setDepartment(dentistEntity.getDepartment().getId());

        List<Integer> appointmentsIds = new ArrayList<>();
        for (AppointmentEntity appointment : dentistEntity.getAppointments()){
            appointmentsIds.add(appointment.getId());
        }
        dentistDto.setAppointments(appointmentsIds);

        List<Integer> eventsIds = new ArrayList<>();
        for (EventEntity event : dentistEntity.getEvents()){
            eventsIds.add(event.getId());
        }
        dentistDto.setEvents(eventsIds);

        List<Integer> patientsIds = new ArrayList<>();
        for (PatientEntity patient : dentistEntity.getPatients()){
            patientsIds.add(patient.getId());
        }
        dentistDto.setPatients(patientsIds);
        return dentistDto;
    }
}
