package com.example.service;

import com.example.configuration.HibernateConfiguration;
import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dao.AppointmentDAO;
import com.example.dao.impl.AppointmentDAOImpl;
import com.example.entity.AppointmentEntity;
import com.example.entity.DentistEntity;
import com.example.entity.InterventionEntity;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    AppointmentDAO appointmentDAO = new AppointmentDAOImpl();

    @Transactional
    public List<AppointmentEntity> getAllAppointments() {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            List<AppointmentEntity> appointments = appointmentDAO.getAllAppointmentsFromDatabase(session);

            for (AppointmentEntity appointment : appointments) {
                BigDecimal totalPrice = BigDecimal.ZERO;
                for (InterventionEntity intervention : appointment.getInterventions()) {
                    totalPrice = totalPrice.add(intervention.getPrice());
                }
                appointment.setTotal_price(totalPrice);
            }
            return appointments;
        }
    }
    @Transactional
    public AppointmentEntity getAppointmentById(int id) throws ResponseStatusException {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            AppointmentEntity entity = appointmentDAO.getAppointmentFromDatabaseById(session, id);
            if (entity != null) {
                return entity;
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se ha podido encontrar el Appoiment con identificador -> " + id);
    }
    @Transactional
    public boolean createAppointment(AppointmentEntity entity) throws ResponseStatusException {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            AppointmentEntity appointmentAttached = session.merge(entity);
            BigDecimal total_price = BigDecimal.ZERO;
            for (InterventionEntity intervention : appointmentAttached.getInterventions()) {
                total_price = total_price.add(intervention.getPrice());
            }
            appointmentAttached.setTotal_price(total_price);
            boolean persistSuccess = appointmentDAO.persistAppointmentToDatabase(appointmentAttached, session);
            if (persistSuccess) {
                session.getTransaction().commit();
            } else {
                session.getTransaction().rollback();
            }
            return persistSuccess;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error realizando la conexión con Base de datos", e);
        }
    }

    @Transactional
    public List<AppointmentEntity> getAppointmentByDentistId(int id) {
        DentistService dentistService = new DentistService();
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            DentistEntity dentist = dentistService.getUserById(id);
            List<AppointmentEntity> entities = appointmentDAO.getAppointmentFromDatabaseByDentistId(session, dentist);
            for (AppointmentEntity appointment : entities) {
                appointment.getInterventions().size();
            }
            return entities;
        }
    }

    @Transactional
    public boolean deleteAppointmentFromDatabase(int id) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            AppointmentEntity appointment = this.getAppointmentById(id);
            if (appointment == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se ha encontrado el appoiment con id -> " + id);
            }
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
