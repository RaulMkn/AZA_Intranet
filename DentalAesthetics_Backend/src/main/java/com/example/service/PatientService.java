package com.example.service;

import com.example.configuration.HibernateConfiguration;
import com.example.dao.PatientDAO;
import com.example.dao.impl.PatientDAOImpl;
import com.example.entity.PatientEntity;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    PatientDAO patientDAO = new PatientDAOImpl();

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
                patient.getAppointments().isEmpty();
            }
            return patients;
        }
    }

    @Transactional
    public boolean createPatient(PatientEntity entity) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
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
}
