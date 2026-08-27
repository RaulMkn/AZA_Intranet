package com.example.dao.impl;

import com.example.dao.AppointmentDAO;
import com.example.entity.AppointmentEntity;
import com.example.entity.DentistEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AppointmentDAOImpl implements AppointmentDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<AppointmentEntity> getAllAppointmentsFromDatabase() {
        return entityManager.createQuery("SELECT ap FROM AppointmentEntity ap WHERE ap.deleted != 1", AppointmentEntity.class).getResultList();
    }

    @Override
    public AppointmentEntity getAppointmentFromDatabaseById(int id) {
        return entityManager.createQuery("SELECT ap FROM AppointmentEntity ap WHERE ap.id = :id", AppointmentEntity.class)
                .setParameter("id", id).getResultStream().findFirst().orElse(null);
    }

    @Override
    public void persistAppointmentToDatabase(AppointmentEntity appointment) {
        entityManager.persist(appointment);
    }

    @Override
    public List<AppointmentEntity> getAppointmentFromDatabaseByDentistId(DentistEntity dentist) {
        return entityManager.createQuery("SELECT ap FROM AppointmentEntity ap WHERE ap.dentist = :dentist", AppointmentEntity.class)
                .setParameter("dentist", dentist).getResultList();
    }

    @Override
    public void deleteAppointmentFromDatabase(AppointmentEntity appointment) {
        entityManager.remove(entityManager.contains(appointment) ? appointment : entityManager.merge(appointment));
    }
}
