package com.example.dao.impl;

import com.example.dao.EventDAO;
import com.example.entity.AppointmentEntity;
import com.example.entity.DentistEntity;
import com.example.entity.EventEntity;
import org.hibernate.Session;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class EventDAOImpl implements EventDAO {
    @Transactional
    @Override
    public List<EventEntity> getEventsFromDatabase(Session session) {
        String hql = "SELECT ev FROM EventEntity ev WHERE ev.deleted != 1";
        return session.createQuery(hql, EventEntity.class).list();
    }

    @Transactional
    @Override
    public EventEntity getEventsFromDatabaseById(Session session, Integer id) {
        String hql = "SELECT ev FROM EventEntity ev WHERE ev.id = :id";
        return session.createQuery(hql, EventEntity.class).setParameter("id", id).uniqueResult();
    }

    @Transactional
    @Override
    public boolean persistEventToDatabase(EventEntity eventAttached, Session session) {
        try {
            session.persist(eventAttached);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    @Override
    public boolean deleteEventFromDatabase(Session session, EventEntity event) {
        try {
            session.remove(event);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    @Transactional
    @Override
    public List<EventEntity> getEventsFromDatabaseByDentistId(Session session, DentistEntity id) {
        String hql = "SELECT ev FROM EventEntity ev WHERE ev.dentist = :id";
        return session.createQuery(hql, EventEntity.class).setParameter("id", id).list();
    }
}
