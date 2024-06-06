package com.example.dao.impl;

import com.example.dao.EventDAO;
import com.example.entity.EventEntity;
import org.hibernate.Session;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EventDAOImpl implements EventDAO {
    @Override
    public List<EventEntity> getEventsFromDatabase(Session session) {
        String hql = "SELECT ev FROM EventEntity ev WHERE ev.deleted != 1";
        return session.createQuery(hql, EventEntity.class).list();
    }

    @Override
    public EventEntity getEventsFromDatabaseById(Session session, Integer id) {
        String hql = "SELECT ev FROM EventEntity ev WHERE ev.id = :id";
        return session.createQuery(hql, EventEntity.class).setParameter("id", id).uniqueResult();
    }

    @Override
    public boolean persistEventToDatabase(EventEntity eventAttached, Session session) {
        try {
            session.persist(eventAttached);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteEventFromDatabase(Session session, EventEntity event) {
        try{
            session.remove(event);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
