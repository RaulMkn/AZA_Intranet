package com.example.controllers;

import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dto.DepartmentDto;
import com.example.entity.DepartmentEntity;
import com.example.service.DepartmentService;
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
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET})
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private ModelMapper map;

    @GetMapping(path = "/departments")
    public ResponseEntity<List<DepartmentDto>> obtainDepartments(
    ) {
        return ResponseEntity.ok(
                departmentService
                        .getAllDepartments()
                        .stream()
                        .map(depEn -> this.map.map(depEn, DepartmentDto.class))
                        .collect(Collectors.toList()));
    }

    @GetMapping(path = "/departments/id/{id}")
    public ResponseEntity<DepartmentDto> obtainDepartmentById(
            @PathVariable("id") int id
    ) {
        DepartmentEntity department = departmentService.getDepartmentById(id);
        if (department != null) {
            return ResponseEntity.ok(this.map.map(department, DepartmentDto.class));
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @Transactional
    @PostMapping(path = "/department")
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
