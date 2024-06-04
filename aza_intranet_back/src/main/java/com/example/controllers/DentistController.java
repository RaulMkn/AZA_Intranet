package com.example.controllers;

import com.example.dto.LoginDto;
import com.example.dto.DentistDto;
import com.example.dto.PictureDto;
import com.example.dto.fakes.FakeDentistDto;
import com.example.entity.DentistEntity;
import com.example.entity.PictureEntity;
import com.example.service.DentistService;
import com.example.service.DepartmentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/intranet/DentalAesthetics")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET})
public class DentistController {
    @Autowired
    private DentistService dentistService;

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private DepartmentService departmentService;

    @Transactional
    @GetMapping(path = "/dentists")
    public ResponseEntity<List<DentistDto>> obtainUsers(
    ) {
        return ResponseEntity.ok(
                dentistService
                        .getAllUsers()
                        .stream()
                        .map(dentistEntity -> this.modelMapper.map(dentistEntity, DentistDto.class))
                        .collect(Collectors.toList()));
    }

    @Transactional
    @GetMapping(path = "/dentist/id/{id}")
    public ResponseEntity<DentistDto> obtainUserById(
            @PathVariable("id") int id
    ) {
        DentistEntity user = dentistService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(this.modelMapper.map(user, DentistDto.class));
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @Transactional
    @PostMapping(path = "/dentist", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> addUser(
            @Valid
            @RequestPart("full_name") String name,
            @RequestPart("email") String email,
            @RequestPart("pass") String pass,
            @RequestPart("job") String job,
            @RequestPart("permis") int permis,
            @RequestPart("department") int department,
            @RequestPart("address") String address,
            @RequestPart("nif") String nif,
            @RequestPart("date_of_birth") Date date_of_birth,
            @RequestPart("gender") String gender,
            @RequestPart("file") MultipartFile file) {
        DentistEntity entity = new DentistEntity();
        entity.setFull_name(name);
        entity.setEmail(email);
        entity.setPass(pass);
        entity.setJob(job);
        entity.setPermis(permis);
        entity.setDepartment(departmentService.getDepartmentById(department));
        entity.setAddress(address);
        entity.setNif(nif);
        entity.setDate_of_birth(date_of_birth);
        entity.setGender(gender);
        if (!dentistService.createUser(entity, file)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            return ResponseEntity.ok().build();
        }
    }

    @Transactional
    @PostMapping("/login")
    public ResponseEntity<DentistDto> login(
            @Valid
            @RequestBody LoginDto loginDto) {
        if (!dentistService.verifyLogin(loginDto)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            DentistEntity id = dentistService.getUserByEmail(loginDto);
            return ResponseEntity.ok(this.modelMapper.map(id, DentistDto.class));
        }
    }
}
