package com.example.controllers;

import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dto.AppointmentDto;
import com.example.dto.DentistDto;
import com.example.entity.AppointmentEntity;
import com.example.entity.DentistEntity;
import com.example.service.AppointmentService;
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
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/intranet/DentalAesthetics")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.DELETE})
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private ModelMapper map;

    @GetMapping(path = "/appointments")
    public ResponseEntity<List<AppointmentDto>> obtainAppointment(
    ) {
        return ResponseEntity.ok(
                appointmentService
                        .getAllAppointments()
                        .stream().map(appoEn -> this.map.map(appoEn, AppointmentDto.class))
                        .collect(Collectors.toList()));
    }

    @Transactional
    @PostMapping(path = "/appointment")
    public ResponseEntity<Void> addAppointment(
            @Valid
            @RequestBody AppointmentDto appoimentDto
    ) throws ResponseStatusException {
        if (!appointmentService.createAppointment(this.map.map(appoimentDto, AppointmentEntity.class))) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            return ResponseEntity.ok().build();
        }
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
