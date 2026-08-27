package com.example.dao;

import com.example.entity.DentistEntity;
import com.example.entity.EventEntity;

import java.util.List;

public interface EventDAO {
    List<EventEntity> getEventsFromDatabase();

    EventEntity getEventsFromDatabaseById(Integer id);

    void persistEventToDatabase(EventEntity event);

    void deleteEventFromDatabase(EventEntity event);

    List<EventEntity> getEventsFromDatabaseByDentistId(DentistEntity dentist);
}
