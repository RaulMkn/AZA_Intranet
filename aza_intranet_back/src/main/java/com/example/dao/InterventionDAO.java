package com.example.dao;

import com.example.entity.InterventionEntity;
import org.hibernate.Session;

import java.util.List;

public interface InterventionDAO {
    InterventionEntity getInterventionFromDatabaseById(Session session, Integer id);

    List<InterventionEntity> getInterventionsFromDatabase(Session session);

    boolean persistInterventionToDatabase(InterventionEntity intervention, Session session);

    boolean deleteInterventionFromDatabase(Session session, InterventionEntity intervention);
}
