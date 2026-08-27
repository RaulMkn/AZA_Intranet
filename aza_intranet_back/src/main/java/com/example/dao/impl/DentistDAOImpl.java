package com.example.dao.impl;

import com.example.dao.DentistDAO;
import com.example.entity.DentistEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DentistDAOImpl implements DentistDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<DentistEntity> getAllUsersFromDatabase() {
        return entityManager.createQuery("SELECT us FROM DentistEntity us WHERE us.deleted != 1", DentistEntity.class).getResultList();
    }

    @Override
    public DentistEntity getUserFromDatabaseById(int id) {
        return entityManager.createQuery("SELECT us FROM DentistEntity us WHERE us.id = :id", DentistEntity.class)
                .setParameter("id", id).getResultStream().findFirst().orElse(null);
    }

    @Override
    public void persistUserToDatabase(DentistEntity user) {
        entityManager.persist(user);
    }

    @Override
    public void updateUserInfo(DentistEntity user) {
        entityManager.merge(user);
    }

    @Override
    public void deleteUserFromDatabase(DentistEntity user) {
        entityManager.remove(entityManager.contains(user) ? user : entityManager.merge(user));
    }

    @Override
    public DentistEntity getUserFromDatabaseByEmail(String email) {
        return entityManager.createQuery("SELECT us FROM DentistEntity us WHERE us.email = :mail", DentistEntity.class)
                .setParameter("mail", email).getResultStream().findFirst().orElse(null);
    }
}
