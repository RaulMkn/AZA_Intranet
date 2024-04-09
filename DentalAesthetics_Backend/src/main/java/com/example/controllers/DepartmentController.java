package com.example.controllers;

import com.example.dto.DepartmentDto;
import com.example.entity.DepartmentEntity;
import com.example.service.DepartmentService;
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

    @GetMapping(path = "/departments")
    public ResponseEntity<List<DepartmentDto>> obtainDepartments(
    ) {
        return ResponseEntity.ok(
                departmentService
                        .getAllDepartments()
                        .stream()
                        .map(DepartmentDto::toDto)
                        .collect(Collectors.toList()));
    }

    @GetMapping(path = "/departments/id/{id}")
    public ResponseEntity<DepartmentDto> obtainDepartmentById(
            @PathVariable("id") int id
    ) {
        DepartmentEntity department = departmentService.getDepartmentById(id);
        if (department != null) {
            return ResponseEntity.ok(DepartmentDto.toDto(department));
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @Transactional
    @PostMapping(path = "/department")
    public ResponseEntity<Void> addDepartment(
            @Valid
            @RequestBody DepartmentDto departmentDto
    ) {
        if (!departmentService.createDepartment(DepartmentDto.toEntity(departmentDto))) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            return ResponseEntity.ok().build();
        }
    }

}
