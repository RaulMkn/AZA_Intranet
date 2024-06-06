package com.example.dao;

import com.example.entity.PatientEntity;
import org.hibernate.Session;

import java.util.List;

public interface PatientDAO {
    PatientEntity getPatientFromDatabaseById(Session session, Integer patientId);

    List<PatientEntity> getPatientsFromDatabase(Session session);

    boolean persistPatientToDatabase(PatientEntity patientAttached, Session session);

    String getPatientNameFromDatabaseById(Session session, int id);

    boolean deletePatientFromDatabase(Session session, PatientEntity patient);
}
