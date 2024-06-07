package com.example.controllers;

import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dto.AppointmentDto;
import com.example.dto.EventDto;
import com.example.dto.fakes.FakeEventDto;
import com.example.entity.AppointmentEntity;
import com.example.entity.EventEntity;
import com.example.service.DentistService;
import com.example.service.EventService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/intranet/DentalAesthetics")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.DELETE})
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private ModelMapper map;
    @Autowired
    private DentistService dentistService;

    @Transactional
    @GetMapping(path = "/events")
    public ResponseEntity<List<EventDto>> obtainEvents() {
        return ResponseEntity.ok(
                eventService
                        .getAllEvents()
                        .stream().map(event -> this.map.map(event, EventDto.class))
                        .collect(Collectors.toList()));
    }

    @Transactional
    @GetMapping(path = "/event/id/{id}")
    public ResponseEntity<EventDto> obtainAppointmentById(
            @PathVariable("id") int id
    ) throws ResponseStatusException {
        EventEntity event = eventService.getEventsById(id);
        if (event != null) {
            return ResponseEntity.ok(this.map.map(event, EventDto.class));
        } else {
            return ResponseEntity.notFound().build();
        }


    }

    @Transactional
    @GetMapping(path = "/event/dentistId/{id}")
    public ResponseEntity<List<EventDto>> obtainEventsByDentistId(
            @PathVariable("id") int id) throws ResponseStatusException {

        List<EventEntity> events = eventService.getEventsByDentistId(id);
        if (events != null) {
            return ResponseEntity.ok(events.stream()
                    .map(evEnt -> this.map.map(evEnt, EventDto.class)).collect(Collectors.toList()));
        } else {
            return ResponseEntity.notFound().build();
        }


    }

    @Transactional
    @PostMapping(path = "/event")
    public ResponseEntity<Void> addEvent(
            @Valid @RequestBody FakeEventDto.PostEventDto eventDto
    ) throws ResponseStatusException {
        EventEntity event = new EventEntity();
        try {
            event.setTitle(eventDto.getTitle());
            event.setDescription(eventDto.getDescription());
            event.setDate_time_beginning(eventDto.getDate_time_beginning());
            event.setDate_time_ending(eventDto.getDate_time_ending());
            event.setLocation(eventDto.getLocation());
            event.setDentist(dentistService.getUserById(eventDto.getDentist()));
            eventService.createEvent(event);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            System.out.println("Error al crear el evento: " + e.getMessage());
            System.out.println("Datos del evento fallido: " + eventDto);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error creando el evento", e);
        }

    }

    @Transactional
    @DeleteMapping(path = "/event/id/{id}")
    public ResponseEntity<Void> deleteEvent(
            @PathVariable("id") int id
    ) {
        boolean event = eventService.deleteEvent(id);
        if (event) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }
}
