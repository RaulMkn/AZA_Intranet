package com.example.dao;

import com.example.entity.EventEntity;
import org.hibernate.Session;

import java.util.List;

public interface EventDAO {
    List<EventEntity> getEventsFromDatabase(Session session);

    EventEntity getEventsFromDatabaseById(Session session, Integer id);
}
