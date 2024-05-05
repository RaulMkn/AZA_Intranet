package com.example.controllers;

import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dto.DepartmentDto;
import com.example.entity.DepartmentEntity;
import com.example.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping("/intranet/DentalAesthetics")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.DELETE})
public class EmailSenderController {

    @Autowired
    private EmailSenderService emailSenderService;

    @Transactional
    @PostMapping(path = "/email")
    public ResponseEntity<Void> addDepartment(
            @Valid
            @RequestBody DepartmentDto departmentDto
    ) throws ResponseStatusException {
        if (!departmentService.createDepartment(this.map.map(departmentDto, DepartmentEntity.class))) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            return ResponseEntity.ok().build();
        }
    }
}
