package com.example.service;

import com.example.dao.InterventionDAO;
import com.example.entity.InterventionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InterventionService {

    @Autowired
    private InterventionDAO interventionDAO;

    @Transactional(readOnly = true)
    public InterventionEntity getInterventionById(Integer id) {
        return interventionDAO.getInterventionFromDatabaseById(id);
    }

    @Transactional(readOnly = true)
    public List<InterventionEntity> getInterventions() {
        return interventionDAO.getInterventionsFromDatabase();
    }

    @Transactional
    public boolean createIntervention(InterventionEntity entity) {
        try {
            interventionDAO.persistInterventionToDatabase(entity);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public boolean deleteIntervention(int id) {
        InterventionEntity intervention = interventionDAO.getInterventionFromDatabaseById(id);
        if (intervention == null) {
            return false;
        }
        interventionDAO.deleteInterventionFromDatabase(intervention);
        return true;
    }
}
