package com.example.service;

import com.example.configuration.HibernateConfiguration;
import com.example.dao.EventDAO;
import com.example.dao.impl.EventDAOImpl;
import com.example.entity.EventEntity;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
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
}
