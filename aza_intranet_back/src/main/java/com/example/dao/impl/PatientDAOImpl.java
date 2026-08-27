package com.example.dao.impl;

import com.example.dao.PatientDAO;
import com.example.entity.PatientEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PatientDAOImpl implements PatientDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public PatientEntity getPatientFromDatabaseById(Integer patientId) {
        return entityManager.createQuery("SELECT pt FROM PatientEntity pt WHERE pt.id = :patientId", PatientEntity.class)
                .setParameter("patientId", patientId).getResultStream().findFirst().orElse(null);
    }

    @Override
    public List<PatientEntity> getPatientsFromDatabase() {
        return entityManager.createQuery("SELECT pt FROM PatientEntity pt WHERE pt.deleted != 1", PatientEntity.class).getResultList();
    }

    @Override
    public void persistPatientToDatabase(PatientEntity patient) {
        entityManager.persist(patient);
    }

    @Override
    public String getPatientNameFromDatabaseById(int id) {
        return entityManager.createQuery("SELECT pt.full_name FROM PatientEntity pt WHERE pt.id = :id", String.class)
                .setParameter("id", id).getResultStream().findFirst().orElse(null);
    }

    @Override
    public void deletePatientFromDatabase(PatientEntity patient) {
        entityManager.remove(entityManager.contains(patient) ? patient : entityManager.merge(patient));
    }
}
