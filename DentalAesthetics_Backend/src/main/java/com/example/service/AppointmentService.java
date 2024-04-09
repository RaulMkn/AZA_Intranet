package com.example.service;

import com.example.configuration.HibernateConfiguration;
import com.example.dao.AppointmentDAO;
import com.example.dao.impl.AppointmentDAOImpl;
import com.example.entity.AppointmentEntity;
import com.example.entity.DentistEntity;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    AppointmentDAO appointmentDAO = new AppointmentDAOImpl();

    @Transactional
    public List<AppointmentEntity> getAllAppointments() {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            return appointmentDAO.getAllAppointmentsFromDatabase(session);
        }
    }

    public AppointmentEntity getAppointmentById(int id) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            return appointmentDAO.getAppointmentFromDatabaseById(session, id);
        }
    }

    public boolean createAppointment(AppointmentEntity entity) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            AppointmentEntity appointmentAttached = session.merge(entity);

            boolean persistSuccess = appointmentDAO.persistAppointmentToDatabase(appointmentAttached, session);
            if (persistSuccess) {
                session.getTransaction().commit();
            } else {
                session.getTransaction().rollback();
            }
            return persistSuccess;
        } catch (Exception e) {
            return false;
        }
    }

    public List<AppointmentEntity> getAppointmentByDentistId(int id) {
        DentistService dentistService = new DentistService();
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            DentistEntity dentist = dentistService.getUserById(id);
            return appointmentDAO.getAppointmentFromDatabaseByDentistId(session, dentist);
        }
    }

    public boolean deleteAppointmentFromDatabase(int id) {
        AppointmentService appointmentService = new AppointmentService();
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            AppointmentEntity appointment = appointmentService.getAppointmentById(id);
            boolean success = appointmentDAO.deleteAppointmentFromDatabase(session, appointment);
            if (success) {
                session.getTransaction().commit();
            } else {
                session.getTransaction().rollback();
            }
            return success;

        } catch (Exception e) {
            return false;
        }
    }
}
