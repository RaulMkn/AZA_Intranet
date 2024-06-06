package com.example.dao;

import com.example.entity.DentistEntity;
import com.example.entity.EventEntity;
import org.hibernate.Session;

import java.util.List;

public interface EventDAO {
    List<EventEntity> getEventsFromDatabase(Session session);

    EventEntity getEventsFromDatabaseById(Session session, Integer id);

    boolean persistEventToDatabase(EventEntity eventAttached, Session session);

    boolean deleteEventFromDatabase(Session session, EventEntity event);

    List<EventEntity> getEventsFromDatabaseByDentistId(Session session, DentistEntity dentist);
}
