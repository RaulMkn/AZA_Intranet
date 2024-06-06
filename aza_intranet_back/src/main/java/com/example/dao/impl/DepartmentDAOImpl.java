package com.example.dao.impl;

import com.example.dao.DepartmentDAO;
import com.example.entity.DepartmentEntity;
import org.hibernate.Session;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Component
public class DepartmentDAOImpl implements DepartmentDAO {
    @Transactional
    @Override
    public List<DepartmentEntity> getAllDepartmentsFromDatabase(Session session) {
        String hql = "SELECT dp FROM DepartmentEntity dp WHERE dp.deleted != 1";
        return session.createQuery(hql, DepartmentEntity.class).list();
    }
    @Transactional
    @Override
    public DepartmentEntity getAllDepartmentsFromDatabaseById(Session session, int id) {
        String hql = "SELECT dp FROM DepartmentEntity dp WHERE id = :id";
        return session.createQuery(hql, DepartmentEntity.class).setParameter("id", id).uniqueResult();

    }
    @Transactional
    @Override
    public boolean persistDepartmentToDatabase(DepartmentEntity departmentAttached, Session session) {
        try{
            session.persist(departmentAttached);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public DepartmentEntity getDepartmentPartialInfoFromDatabase(Session session, Integer id) {
        String hql = "SELECT dp.department_name FROM DepartmentEntity dp WHERE dp.id = :id";
        return session.createQuery(hql, DepartmentEntity.class).setParameter("id", id).uniqueResult();

    }

    @Override
    public boolean removeDepartmentFromDatabase(Session session, DepartmentEntity department) {
        try{
            session.remove(department);
            return true;
        }catch (Exception e){
            return false;
        }    }
}
