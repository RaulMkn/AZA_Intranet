package com.example.dao.impl;

import com.example.dao.PatientDAO;
import com.example.entity.PatientEntity;
import org.hibernate.Session;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class PatientDAOImpl implements PatientDAO {
    @Transactional
    @Override
    public PatientEntity getPatientFromDatabaseById(Session session, Integer patientId) {
        String hql = "SELECT pt FROM PatientEntity pt WHERE pt.id = :patientId";
        return session.createQuery(hql, PatientEntity.class).setParameter("patientId", patientId).uniqueResult();
    }

    @Transactional
    @Override
    public List<PatientEntity> getPatientsFromDatabase(Session session) {
        String hql = "SELECT pt FROM PatientEntity pt";
        return session.createQuery(hql, PatientEntity.class).list();
    }

    @Transactional
    @Override
    public boolean persistPatientToDatabase(PatientEntity patientAttached, Session session) {
        try{
            session.persist(patientAttached);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public String getPatientNameFromDatabaseById(Session session, int id) {
        String hql = "SELECT pt.full_name FROM PatientEntity pt WHERE pt.id = :id";
        return session.createQuery(hql, String.class).setParameter("id", id).uniqueResult();

    }
}
