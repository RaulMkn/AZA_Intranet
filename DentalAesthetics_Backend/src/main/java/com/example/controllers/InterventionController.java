package com.example.controllers;

import com.example.dto.DepartmentDto;
import com.example.dto.InterventionDto;
import com.example.service.InterventionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/intranet/DentalAesthetics")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.DELETE})
public class InterventionController {
    @Autowired
    InterventionService interventionService = new InterventionService();

    @GetMapping(path = "/interventions")
    public ResponseEntity<List<InterventionDto>> obtainDepartments(
    ) {
        return ResponseEntity.ok(
                interventionService
                        .getInterventions()
                        .stream()
                        .map(InterventionDto::toDto)
                        .collect(Collectors.toList()));
    }

    @PostMapping(path = "/intervention")
    public ResponseEntity<Void> createIntervention(
            @Valid
            @RequestBody InterventionDto dto
    ) {
        if (!interventionService.createIntervention(InterventionDto.toEntity(dto))) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            return ResponseEntity.ok().build();
        }

    }
}
