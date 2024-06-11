package com.example.controllers;

import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dto.InterventionDto;
import com.example.dto.fakes.FakeInterventionDto;
import com.example.entity.InterventionEntity;
import com.example.service.DepartmentService;
import com.example.service.InterventionService;
import org.modelmapper.ModelMapper;
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
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE})
public class InterventionController {
    @Autowired
    InterventionService interventionService;
    @Autowired
    private ModelMapper map;
    @Autowired
    private DepartmentService departmentService;

    @Transactional
    @GetMapping(path = "/interventions")
    public ResponseEntity<List<InterventionDto>> obtainDepartments(
    ) {
        return ResponseEntity.ok(
                interventionService
                        .getInterventions()
                        .stream()
                        .map(intEn -> this.map.map(intEn, InterventionDto.class))
                        .collect(Collectors.toList()));
    }

    @Transactional
    @PostMapping(path = "/intervention")
    public ResponseEntity<Void> createIntervention(
            @Valid
            @RequestBody FakeInterventionDto.PostInterventionDto dto
    ) throws ResponseStatusException {
        InterventionEntity interventionEntity = new InterventionEntity();
        interventionEntity.setFull_name(dto.getFull_name());
        interventionEntity.setPrice(dto.getPrice());
        interventionEntity.setDepartment(departmentService.getDepartmentById(dto.getDepartment()));
        interventionEntity.setAppointments(null);
        if (!interventionService.createIntervention(interventionEntity)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            return ResponseEntity.ok().build();
        }

    }

    @Transactional
    @DeleteMapping(path = "/intervention/id/{id}")
    public ResponseEntity<Void> deleteIntervention(
            @PathVariable("id") int id
    ) {
        boolean intervention = interventionService.deleteIntervention(id);
        if (intervention) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }
}
