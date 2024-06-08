package com.example.controllers;

import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dto.AppointmentDto;
import com.example.dto.DentistDto;
import com.example.dto.fakes.FakeAppointmentDto;
import com.example.dto.fakes.FakePatientDto;
import com.example.entity.AppointmentEntity;
import com.example.entity.DentistEntity;
import com.example.entity.InterventionEntity;
import com.example.entity.PatientEntity;
import com.example.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/intranet/DentalAesthetics")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE})
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private ModelMapper map;
    @Autowired
    private DentistService dentistService;
    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private InterventionService interventionService;
    @Autowired
    private PatientService patientService;

    @GetMapping(path = "/appointments")
    public ResponseEntity<List<AppointmentDto>> obtainAppointment(
    ) {
        return ResponseEntity.ok(
                appointmentService
                        .getAllAppointments()
                        .stream().map(appoEn -> this.map.map(appoEn, AppointmentDto.class))
                        .collect(Collectors.toList()));
    }
    //Toda esta logica hay que moverla al service
    @Transactional
    @PostMapping(path = "/appointment")
    public ResponseEntity<Map<String, Object>> addAppointment(@RequestBody FakeAppointmentDto.PostAppointmentDto appointmentDto) throws ResponseStatusException {
        AppointmentEntity entity = new AppointmentEntity();
        try {
            entity.setTitle(appointmentDto.getTitle());
            entity.setDescription(appointmentDto.getDescription());
            entity.setDentist(dentistService.getUserById(appointmentDto.getDentist()));
            entity.setDepartment(departmentService.getDepartmentById(appointmentDto.getDepartment()));
            entity.setInvoice(appointmentDto.getInvoice());
            entity.setDate_time_beginning(appointmentDto.getDate_time_beginning());
            entity.setDate_time_ending(appointmentDto.getDate_time_ending());
            entity.setPriority(appointmentDto.getPriority());
            entity.setState(appointmentDto.getState());

            PatientEntity patient = patientService.getPatientId(appointmentDto.getPatient());
            entity.setPatient(patient);

            List<InterventionEntity> interventionEntities = convertToIntList(appointmentDto.getInterventions());
            entity.setInterventions(interventionEntities);

            appointmentService.createAppointment(entity);

            Map<String, Object> response = new HashMap<>();
            FakePatientDto.GetPatientDto sendPatient = getGetPatientDto(patient);
            response.put("message", "Appointment created successfully");
            response.put("patient", sendPatient);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            System.out.println("Error al crear la cita: " + e.getMessage());
            System.out.println("Datos de la cita fallida: " + appointmentDto);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error creando la cita", e);
        }
    }

    // Mover al service
    private FakePatientDto.GetPatientDto getGetPatientDto(PatientEntity patient) {
        FakePatientDto.GetPatientDto sendPatient = new FakePatientDto.GetPatientDto();
        sendPatient.setId(patient.getId());
        sendPatient.setGender(patient.getGender());
        sendPatient.setNif(patient.getNif());
        sendPatient.setEmail(patient.getEmail());
        sendPatient.setAddress(patient.getAddress());
        sendPatient.setFull_name(patient.getFull_name());
        sendPatient.setPhone(patient.getPhone());
        sendPatient.setBirthDate(patient.getDate_of_birth());
        return sendPatient;
    }

    private List<InterventionEntity> convertToIntList(String list) {
        if (list == null || list.isEmpty()) {
            throw new IllegalArgumentException("La cadena de texto no puede ser nula o vacía");
        }
        List<InterventionEntity> interventionEntities = new ArrayList<>();
        String delimiter = ",";
        List<Integer> integers = new ArrayList<>();
        String[] lists = list.split(delimiter);
        for (String numberString : lists) {
            try {
                integers.add(Integer.parseInt(numberString.trim()));
            } catch (NumberFormatException e) {
                System.err.println("Error al convertir '" + numberString + "' a entero.");
            }
        }
        for (Integer elements : integers) {
            interventionEntities.add(interventionService.getInterventionById(elements));
        }
        return interventionEntities;
    }




    @GetMapping(path = "/appointment/id/{id}")
    public ResponseEntity<AppointmentDto> obtainAppointmentById(
            @PathVariable("id") int id
    ) throws ResponseStatusException {
        AppointmentEntity appointment = appointmentService.getAppointmentById(id);
        if (appointment != null) {
            return ResponseEntity.ok(this.map.map(appointment, AppointmentDto.class));
        } else {
            return ResponseEntity.notFound().build();
        }


    }

    @GetMapping(path = "/appointment/dentistId/{id}")
    public ResponseEntity<List<AppointmentDto>> obtainAppointmentByDentistId(
            @PathVariable("id") int id
    ) {
        List<AppointmentEntity> appointments = appointmentService.getAppointmentByDentistId(id);
        if (appointments != null) {
            return ResponseEntity.ok(appointments.stream()
                    .map(appEnt -> this.map.map(appEnt, AppointmentDto.class)).collect(Collectors.toList()));
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping(path = "/appointment/id/{id}")
    public ResponseEntity<AppointmentDto> deleteAppointment(
            @PathVariable("id") int id
    ) {
        boolean appointment = appointmentService.deleteAppointmentFromDatabase(id);
        if (appointment) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }
}
