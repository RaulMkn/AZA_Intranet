package com.example.controllers;

import com.example.dto.PatientDto;
import com.example.entity.PatientEntity;
import com.example.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @GetMapping(path = "/patients")
    public ResponseEntity<List<PatientDto>> obtainPatients(
    ) {
        return ResponseEntity.ok(
                patientService
                        .getAllPatients()
                        .stream()
                        .map(PatientDto::toDto)
                        .collect(Collectors.toList()));
    }

    @GetMapping(path = "/patient/id/{id}")
    public ResponseEntity<PatientDto> obtainPatientById(
            @PathVariable("id") int id
    ) {
        PatientEntity patient = patientService.getPatientId(id);
        if (patient != null) {
            return ResponseEntity.ok(PatientDto.toDto(patient));
        } else {
            return ResponseEntity.notFound().build();
        }

    }

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
    @PostMapping(path = "/patient")
    public ResponseEntity<Void> addPatient(
            @Valid
            @RequestBody PatientDto patientDto
    ) {
        if (!patientService.createPatient(PatientDto.toEntity(patientDto))) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            return ResponseEntity.ok().build();
        }
    }

}
