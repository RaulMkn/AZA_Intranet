package com.example.dao.impl;

import com.example.dao.EventDAO;
import com.example.entity.DentistEntity;
import com.example.entity.EventEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EventDAOImpl implements EventDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<EventEntity> getEventsFromDatabase() {
        return entityManager.createQuery("SELECT ev FROM EventEntity ev WHERE ev.deleted != 1", EventEntity.class).getResultList();
    }

    @Override
    public EventEntity getEventsFromDatabaseById(Integer id) {
        return entityManager.createQuery("SELECT ev FROM EventEntity ev WHERE ev.id = :id", EventEntity.class)
                .setParameter("id", id).getResultStream().findFirst().orElse(null);
    }

    @Override
    public void persistEventToDatabase(EventEntity event) {
        entityManager.persist(event);
    }

    @Override
    public void deleteEventFromDatabase(EventEntity event) {
        entityManager.remove(entityManager.contains(event) ? event : entityManager.merge(event));
    }

    @Override
    public List<EventEntity> getEventsFromDatabaseByDentistId(DentistEntity dentist) {
        return entityManager.createQuery("SELECT ev FROM EventEntity ev WHERE ev.dentist = :id", EventEntity.class)
                .setParameter("id", dentist).getResultList();
    }
}
