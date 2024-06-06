package com.example.service;

import com.example.configuration.HibernateConfiguration;
import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dao.EventDAO;
import com.example.dao.impl.EventDAOImpl;
import com.example.entity.EventEntity;
import jdk.jfr.Event;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EventService {
    @Autowired
    EventDAO eventDAO = new EventDAOImpl();

    @Transactional
    public List<EventEntity> getAllEvents(){
        try(Session session = HibernateConfiguration.getSessionFactory().openSession()){
            session.beginTransaction();
            return eventDAO.getEventsFromDatabase(session);
        }
    }

    @Transactional
    public EventEntity getEventsById(Integer id){
        try(Session session = HibernateConfiguration.getSessionFactory().openSession()){
            session.beginTransaction();
            return eventDAO.getEventsFromDatabaseById(session,id);
        }
    }

    @Transactional
    public boolean createEvent(EventEntity event) throws ResponseStatusException {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            EventEntity eventAttached = session.merge(event);
            boolean persistSuccess = eventDAO.persistEventToDatabase(eventAttached, session);
            if (persistSuccess) {
                session.getTransaction().commit();
            } else {
                session.getTransaction().rollback();
            }
            return persistSuccess;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error realizando la conexión con Base de datos", e);
        }
    }

    @Transactional
    public boolean deleteEvent(int id) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            EventEntity event = this.getEventsById(id);
            if (event == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se ha encontrado el evento con id -> " + id);
            }
            boolean success = eventDAO.deleteEventFromDatabase(session, event);
            if (success) {
                session.getTransaction().commit();
            } else {
                session.getTransaction().rollback();
            }
            return success;

        } catch (Exception e) {
            return false;
        }
    }
}
