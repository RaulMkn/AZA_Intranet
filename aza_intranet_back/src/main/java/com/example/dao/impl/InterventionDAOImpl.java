package com.example.dao.impl;

import com.example.dao.InterventionDAO;
import com.example.entity.InterventionEntity;
import org.hibernate.Session;
import org.hibernate.validator.constraints.CodePointLength;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class InterventionDAOImpl implements InterventionDAO {
    @Transactional
    @Override
    public InterventionEntity getInterventionFromDatabaseById(Session session, Integer id) {
        String hql = "SELECT itv FROM InterventionEntity itv WHERE itv.id =:id";
        return session.createQuery(hql, InterventionEntity.class).setParameter("id", id).uniqueResult();
    }

    @Transactional
    @Override
    public List<InterventionEntity> getInterventionsFromDatabase(Session session) {
        String hql = "SELECT itv FROM InterventionEntity itv WHERE itv.deleted != 1";
        return session.createQuery(hql, InterventionEntity.class).list();
    }

    @Transactional
    @Override
    public boolean persistInterventionToDatabase(InterventionEntity intervention, Session session) {
        try {
            session.persist(intervention);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
