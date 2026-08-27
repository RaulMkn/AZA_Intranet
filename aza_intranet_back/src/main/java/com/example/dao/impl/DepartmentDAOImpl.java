package com.example.dao.impl;

import com.example.dao.DepartmentDAO;
import com.example.entity.DepartmentEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DepartmentDAOImpl implements DepartmentDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<DepartmentEntity> getAllDepartmentsFromDatabase() {
        return entityManager.createQuery("SELECT dp FROM DepartmentEntity dp WHERE dp.deleted != 1", DepartmentEntity.class).getResultList();
    }

    @Override
    public DepartmentEntity getAllDepartmentsFromDatabaseById(int id) {
        return entityManager.createQuery("SELECT dp FROM DepartmentEntity dp WHERE dp.id = :id", DepartmentEntity.class)
                .setParameter("id", id).getResultStream().findFirst().orElse(null);
    }

    @Override
    public void persistDepartmentToDatabase(DepartmentEntity department) {
        entityManager.persist(department);
    }

    @Override
    public DepartmentEntity getDepartmentPartialInfoFromDatabase(Integer id) {
        return entityManager.createQuery("SELECT dp FROM DepartmentEntity dp WHERE dp.id = :id", DepartmentEntity.class)
                .setParameter("id", id).getResultStream().findFirst().orElse(null);
    }

    @Override
    public void removeDepartmentFromDatabase(DepartmentEntity department) {
        entityManager.remove(entityManager.contains(department) ? department : entityManager.merge(department));
    }
}
