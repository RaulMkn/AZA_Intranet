package com.example.dao.impl;

import com.example.dao.AppointmentDAO;
import com.example.entity.AppointmentEntity;
import com.example.entity.DentistEntity;
import org.hibernate.Session;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class AppointmentDAOImpl implements AppointmentDAO {
    @Transactional
    @Override
    public List<AppointmentEntity> getAllAppointmentsFromDatabase(Session session) {
        String hql = "SELECT ap FROM AppointmentEntity ap WHERE ap.deleted != 1";
        return session.createQuery(hql, AppointmentEntity.class).list();
    }

    @Transactional
    @Override
    public AppointmentEntity getAppointmentFromDatabaseById(Session session, int id) {
        String hql = "SELECT ap FROM AppointmentEntity ap WHERE ap.id = :id";
        return session.createQuery(hql, AppointmentEntity.class).setParameter("id", id).uniqueResult();
    }

    @Transactional
    @Override
    public boolean persistAppointmentToDatabase(AppointmentEntity appointmentAttached, Session session) {
        try {
            session.persist(appointmentAttached);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    @Override
    public List<AppointmentEntity> getAppointmentFromDatabaseByDentistId(Session session, DentistEntity id) {
        String hql = "SELECT ap FROM AppointmentEntity ap WHERE ap.dentist = :id";
        return session.createQuery(hql, AppointmentEntity.class).setParameter("id", id).list();
    }

    @Transactional
    @Override
    public boolean deleteAppointmentFromDatabase(Session session, AppointmentEntity appointment) {
        try {
            session.remove(appointment);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
