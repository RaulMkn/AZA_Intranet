package com.example.service;

import com.example.configuration.HibernateConfiguration;
import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dao.PatientDAO;
import com.example.dao.impl.PatientDAOImpl;
import com.example.entity.PatientEntity;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    PatientDAO patientDAO = new PatientDAOImpl();

    @Autowired
    DentistService dentistService = new DentistService();

    @Transactional
    public PatientEntity getPatientId(Integer patientId) {
        try(Session session = HibernateConfiguration.getSessionFactory().openSession()){
            session.beginTransaction();
            return patientDAO.getPatientFromDatabaseById(session, patientId);
        }
    }

    @Transactional
    public List<PatientEntity> getAllPatients() {
        try(Session session = HibernateConfiguration.getSessionFactory().openSession()){
            session.beginTransaction();
            List<PatientEntity> patients =  patientDAO.getPatientsFromDatabase(session);
            for(PatientEntity patient : patients){
                patient.getAppointments().size();
            }
            return patients;
        }
    }

    @Transactional
    public boolean createPatient(PatientEntity entity, Integer dentist) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            entity.setDentist(dentistService.getUserById(dentist));
            PatientEntity patientAttached = session.merge(entity);

            boolean persistSuccess = patientDAO.persistPatientToDatabase(patientAttached, session);
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

    public String getPatientNameById(int id) {
        try(Session session = HibernateConfiguration.getSessionFactory().openSession()){
            session.beginTransaction();
            return patientDAO.getPatientNameFromDatabaseById(session, id);
        }
    }

    @Transactional
    public boolean deletePatient(int id) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            PatientEntity patient = this.getPatientId(id);
            if (patient == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se ha encontrado el paciente con id -> " + id);
            }
            boolean success = patientDAO.deletePatientFromDatabase(session, patient);
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
