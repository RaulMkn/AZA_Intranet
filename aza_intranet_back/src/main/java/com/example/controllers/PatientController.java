package com.example.controllers;

import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dto.PatientDto;
import com.example.dto.fakes.FakeDentistDto;
import com.example.dto.fakes.FakePatientDto;
import com.example.entity.PatientEntity;
import com.example.service.AppointmentService;
import com.example.service.DentistService;
import com.example.service.PatientService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/intranet/DentalAesthetics")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET})

public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private DentistService dentistService;

    @Autowired
    private ModelMapper map;
    @Autowired
    private AppointmentService appointmentService;
    @Transactional
    @GetMapping(path = "/patients")
    public ResponseEntity<List<PatientDto>> obtainPatients(
    ) {
        return ResponseEntity.ok(
                patientService
                        .getAllPatients()
                        .stream()
                        .map(patEn -> this.map.map(patEn, PatientDto.class))
                        .collect(Collectors.toList()));
    }
    @Transactional
    @GetMapping(path = "/patient/id/{id}")
    public ResponseEntity<PatientDto> obtainPatientById(
            @PathVariable("id") int id
    ) {
        PatientEntity patient = patientService.getPatientId(id);
        if (patient != null) {
            return ResponseEntity.ok(this.map.map(patient, PatientDto.class));
        } else {
            return ResponseEntity.notFound().build();
        }

    }
    @Transactional
    @GetMapping(path = "/patientName/id/{id}")
    public ResponseEntity<String> obtainPatientNameById(
            @PathVariable("id") int id
    ) {
        String patient = patientService.getPatientNameById(id);
        if (patient != null) {
            return ResponseEntity.ok(patient);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @Transactional
    @PostMapping(path = "/patient", consumes = "application/json")
    public ResponseEntity<Void> addPatient(
            @Valid
            @RequestBody FakePatientDto.PostPatientDto patientDto
            ) throws ResponseStatusException {
        PatientEntity entity = new PatientEntity();
        entity.setFull_name(patientDto.getFull_name());
        entity.setEmail(patientDto.getEmail());
        entity.setPhone(patientDto.getPhone());
        entity.setNif(patientDto.getNif());
        entity.setAddress(patientDto.getAddress());
        entity.setGender(patientDto.getGender());
        entity.setDate_of_birth(patientDto.getDate_of_birth());
        entity.setDentist(dentistService.getUserById(patientDto.getDentistId()));
        entity.setAppointments(null);
        if (!patientService.createPatient(entity, patientDto.getDentistId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            return ResponseEntity.ok().build();
        }
    }

    @Transactional
    @DeleteMapping(path = "/appointment/id/{id}")
    public ResponseEntity<Void> deleteAppointment(
            @PathVariable("id") int id
    ) {
        boolean patient = patientService.deletePatient(id);
        if (patient) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }


}
