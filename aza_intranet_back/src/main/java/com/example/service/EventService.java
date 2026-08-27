package com.example.service;

import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dao.EventDAO;
import com.example.entity.DentistEntity;
import com.example.entity.EventEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventDAO eventDAO;

    @Autowired
    private DentistService dentistService;

    @Transactional(readOnly = true)
    public List<EventEntity> getAllEvents() {
        return eventDAO.getEventsFromDatabase();
    }

    @Transactional(readOnly = true)
    public EventEntity getEventsById(Integer id) {
        return eventDAO.getEventsFromDatabaseById(id);
    }

    @Transactional
    public boolean createEvent(EventEntity event) {
        try {
            eventDAO.persistEventToDatabase(event);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public boolean deleteEvent(int id) {
        EventEntity event = eventDAO.getEventsFromDatabaseById(id);
        if (event == null) {
            return false;
        }
        eventDAO.deleteEventFromDatabase(event);
        return true;
    }

    @Transactional(readOnly = true)
    public List<EventEntity> getEventsByDentistId(int id) {
        DentistEntity dentist = dentistService.getUserById(id);
        return eventDAO.getEventsFromDatabaseByDentistId(dentist);
    }
}
