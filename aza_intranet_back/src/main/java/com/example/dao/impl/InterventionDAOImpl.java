package com.example.dao.impl;

import com.example.dao.InterventionDAO;
import com.example.entity.InterventionEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class InterventionDAOImpl implements InterventionDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public InterventionEntity getInterventionFromDatabaseById(Integer id) {
        return entityManager.createQuery("SELECT itv FROM InterventionEntity itv WHERE itv.id = :id", InterventionEntity.class)
                .setParameter("id", id).getResultStream().findFirst().orElse(null);
    }

    @Override
    public List<InterventionEntity> getInterventionsFromDatabase() {
        return entityManager.createQuery("SELECT itv FROM InterventionEntity itv WHERE itv.deleted != 1", InterventionEntity.class).getResultList();
    }

    @Override
    public void persistInterventionToDatabase(InterventionEntity intervention) {
        entityManager.persist(intervention);
    }

    @Override
    public void deleteInterventionFromDatabase(InterventionEntity intervention) {
        entityManager.remove(entityManager.contains(intervention) ? intervention : entityManager.merge(intervention));
    }
}
