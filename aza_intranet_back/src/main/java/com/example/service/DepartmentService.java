package com.example.service;

import com.example.configuration.HibernateConfiguration;
import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dao.DepartmentDAO;
import com.example.dao.impl.DepartmentDAOImpl;
import com.example.entity.AppointmentEntity;
import com.example.entity.DepartmentEntity;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DepartmentService {
    @Autowired
    DepartmentDAO departmentDAO = new DepartmentDAOImpl();

    @Transactional

    public List<DepartmentEntity> getAllDepartments() {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            List<DepartmentEntity> departments = departmentDAO.getAllDepartmentsFromDatabase(session);
            for (DepartmentEntity department : departments) {
                department.getDentists().isEmpty();
                department.getAppointments().isEmpty();
                department.getInterventions().isEmpty();
            }
            return departments;
        }
    }
    @Transactional

    public DepartmentEntity getDepartmentById(int id) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            return departmentDAO.getAllDepartmentsFromDatabaseById(session, id);
        }
    }
    @Transactional

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
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            return departmentDAO.getDepartmentPartialInfoFromDatabase(session, department.getId());
        }
    }

    @Transactional
    public boolean deleteDepartmentFromDatabase(int id) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            DepartmentEntity department = this.getDepartmentById(id);
            if (department == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se ha encontrado el departamento con id -> " + id);
            }
            boolean success = departmentDAO.removeDepartmentFromDatabase(session, department);
            if (success) {
                session.getTransaction().commit();
            } else {
                session.getTransaction().rollback();
            }
            return success;

        } catch (Exception e) {
            return false;
        }
    }
}
