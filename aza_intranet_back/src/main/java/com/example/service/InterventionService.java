package com.example.service;

import com.example.configuration.HibernateConfiguration;
import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dao.InterventionDAO;
import com.example.dao.impl.InterventionDAOImpl;
import com.example.entity.InterventionEntity;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InterventionService {
    @Autowired
    InterventionDAO interventionDAO = new InterventionDAOImpl();
    @Transactional
    public InterventionEntity getInterventionById(Integer id) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()){
            session.beginTransaction();
            return interventionDAO.getInterventionFromDatabaseById(session, id);
        }
    }
    @Transactional
    public List<InterventionEntity> getInterventions(){
        try(Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            return interventionDAO.getInterventionsFromDatabase(session);

        }
    }
@Transactional
    public boolean createIntervention(InterventionEntity entity) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            InterventionEntity intervention = session.merge(entity);

            boolean persistSuccess = interventionDAO.persistInterventionToDatabase(intervention, session);
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
@Transactional
    public boolean deleteIntervention(int id) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            InterventionEntity intervention = this.getInterventionById(id);
            if (intervention == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se ha encontrado la intervencion con id -> " + id);
            }
            boolean success = interventionDAO.deleteInterventionFromDatabase(session, intervention);
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
