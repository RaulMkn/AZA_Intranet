package com.example.dao.impl;

import com.example.dao.InterventionDAO;
import com.example.entity.InterventionEntity;
import org.hibernate.Session;
import org.hibernate.validator.constraints.CodePointLength;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class InterventionDAOImpl implements InterventionDAO {
    @Override
    public InterventionEntity getInterventionFromDatabaseById(Session session, Integer id) {
        String hql = "SELECT itv FROM InterventionEntity itv WHERE itv.id =:id";
        return session.createQuery(hql,InterventionEntity.class).setParameter("id", id).uniqueResult();
    }

    @Override
    public List<InterventionEntity> getInterventionsFromDatabase(Session session) {
        return null;
    }

    @Override
    public boolean persistInterventionToDatabase(InterventionEntity intervention, Session session) {
        return false;
    }
}
