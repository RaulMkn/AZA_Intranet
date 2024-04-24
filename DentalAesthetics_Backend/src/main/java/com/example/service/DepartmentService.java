package com.example.service;

import com.example.configuration.HibernateConfiguration;
import com.example.dao.DepartmentDAO;
import com.example.dao.impl.DepartmentDAOImpl;
import com.example.entity.DepartmentEntity;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {
    @Autowired
    DepartmentDAO departmentDAO = new DepartmentDAOImpl();
    public List<DepartmentEntity> getAllDepartments() {
        try(Session session = HibernateConfiguration.getSessionFactory().openSession()){
            session.beginTransaction();
            List<DepartmentEntity> departments = departmentDAO.getAllDepartmentsFromDatabase(session);
            for(DepartmentEntity department : departments){
                department.getDentist().isEmpty();
                department.getAppointments().isEmpty();
                department.getInterventions().isEmpty();
            }
            return departments;
        }
    }

    public DepartmentEntity getDepartmentById(int id) {
        try(Session session = HibernateConfiguration.getSessionFactory().openSession()){
            session.beginTransaction();
            return departmentDAO.getAllDepartmentsFromDatabaseById(session, id);
        }
    }

    public boolean createDepartment(DepartmentEntity entity) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            DepartmentEntity departmentAttached = session.merge(entity);

            boolean persistSuccess = departmentDAO.persistDepartmentToDatabase(departmentAttached, session);
            if (persistSuccess) {
                session.getTransaction().commit();
            } else {
                session.getTransaction().rollback();
            }
            return persistSuccess;
        } catch (Exception e) {
            return false;
        }
    }

    public DepartmentEntity getDepartmentPartialInfoById(DepartmentEntity department) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()){
            session.beginTransaction();
            return departmentDAO.getDepartmentPartialInfoFromDatabase(session, department.getId());
        }
    }
}
