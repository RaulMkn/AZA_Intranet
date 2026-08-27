package com.example.dao.impl;

import com.example.dao.PictureDAO;
import com.example.entity.PictureEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class PictureDAOImpl implements PictureDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public PictureEntity persistPictureToDatabase(PictureEntity picture) {
        entityManager.persist(picture);
        return picture;
    }
}
