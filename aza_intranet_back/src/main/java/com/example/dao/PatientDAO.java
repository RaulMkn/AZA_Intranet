package com.example.dao;

import com.example.entity.PatientEntity;

import java.util.List;

public interface PatientDAO {
    PatientEntity getPatientFromDatabaseById(Integer patientId);

    List<PatientEntity> getPatientsFromDatabase();

    void persistPatientToDatabase(PatientEntity patient);

    String getPatientNameFromDatabaseById(int id);

    void deletePatientFromDatabase(PatientEntity patient);
}
