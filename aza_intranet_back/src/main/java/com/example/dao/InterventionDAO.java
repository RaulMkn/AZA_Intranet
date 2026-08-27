package com.example.dao;

import com.example.entity.InterventionEntity;

import java.util.List;

public interface InterventionDAO {
    InterventionEntity getInterventionFromDatabaseById(Integer id);

    List<InterventionEntity> getInterventionsFromDatabase();

    void persistInterventionToDatabase(InterventionEntity intervention);

    void deleteInterventionFromDatabase(InterventionEntity intervention);
}
