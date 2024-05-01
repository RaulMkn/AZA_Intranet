package com.example.controllers;

import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dto.PatientDto;
import com.example.dto.fakes.FakeDentistDto;
import com.example.entity.PatientEntity;
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
    @PostMapping(path = "/patient", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> addPatient(
            @Valid
            @RequestPart("full_name") String full_name,
            @RequestPart("email") String email,
            @RequestPart("phone") Integer phone,
            @RequestPart("dentistId") Integer dentist
    ) throws ResponseStatusException {
        PatientEntity entity = new PatientEntity(null,full_name,email,phone,null,null);
        if (!patientService.createPatient(entity, dentist)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            return ResponseEntity.ok().build();
        }
    }

}
