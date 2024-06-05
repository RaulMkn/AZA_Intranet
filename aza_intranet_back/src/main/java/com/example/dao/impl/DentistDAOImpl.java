package com.example.dao.impl;

import com.example.dao.DentistDAO;
import com.example.entity.DentistEntity;
import org.hibernate.Session;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class DentistDAOImpl implements DentistDAO {
    @Transactional
    @Override
    public List<DentistEntity> getAllUsersFromDatabase(Session session) {
        String hql ="SELECT us FROM DentistEntity us WHERE us.deleted != 1";
        return session.createQuery(hql, DentistEntity.class).list();
    }

    @Transactional
    @Override
    public DentistEntity getUserFromDatabaseById(Session session, int id) {
        String hql = "SELECT us FROM DentistEntity us WHERE us.id = :id";
        return session.createQuery(hql, DentistEntity.class).setParameter("id", id).uniqueResult();
    }

    @Transactional
    @Override
    public boolean persistUserToDatabase(DentistEntity userAttached, Session session) {
        try{
            session.persist(userAttached);
            return true;
        }catch (Exception e){
            return false;
        }
    }
    @Transactional
    @Override
    public boolean updateUserInfo(DentistEntity user, Session session) {
        try{
            session.merge(user);
            session.getTransaction().commit();
            return true;
        }catch (Exception e){
            return false;
        }
    }
    @Transactional
    @Override
    public boolean deleteUserFromDatabase(Session session, DentistEntity user) {
        try{
            session.remove(user);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Transactional
    @Override
    public DentistEntity getUserFromDatabaseByEmail(Session session, String mail) {
        String hql = "SELECT us FROM DentistEntity us WHERE us.email = :mail";
        return session.createQuery(hql, DentistEntity.class).setParameter("mail",mail).uniqueResult();
    }
}
