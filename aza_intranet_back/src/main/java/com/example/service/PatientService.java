package com.example.service;

import com.example.dao.PatientDAO;
import com.example.entity.PatientEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientDAO patientDAO;

    @Autowired
    private DentistService dentistService;

    @Transactional(readOnly = true)
    public PatientEntity getPatientId(Integer patientId) {
        return patientDAO.getPatientFromDatabaseById(patientId);
    }

    @Transactional(readOnly = true)
    public List<PatientEntity> getAllPatients() {
        List<PatientEntity> patients = patientDAO.getPatientsFromDatabase();
        for (PatientEntity patient : patients) {
            patient.getAppointments().size();
        }
        return patients;
    }

    @Transactional
    public boolean createPatient(PatientEntity entity, Integer dentist) {
        try {
            entity.setDentist(dentistService.getUserById(dentist));
            patientDAO.persistPatientToDatabase(entity);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional(readOnly = true)
    public String getPatientNameById(int id) {
        return patientDAO.getPatientNameFromDatabaseById(id);
    }

    @Transactional
    public boolean deletePatient(int id) {
        PatientEntity patient = patientDAO.getPatientFromDatabaseById(id);
        if (patient == null) {
            return false;
        }
        patientDAO.deletePatientFromDatabase(patient);
        return true;
    }
}
