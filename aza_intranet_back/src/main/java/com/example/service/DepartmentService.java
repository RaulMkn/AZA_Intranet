package com.example.service;

import com.example.dao.DepartmentDAO;
import com.example.entity.DepartmentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentDAO departmentDAO;

    @Transactional(readOnly = true)
    public List<DepartmentEntity> getAllDepartments() {
        List<DepartmentEntity> departments = departmentDAO.getAllDepartmentsFromDatabase();
        for (DepartmentEntity department : departments) {
            department.getDentists().isEmpty();
            department.getAppointments().isEmpty();
            department.getInterventions().isEmpty();
        }
        return departments;
    }

    @Transactional(readOnly = true)
    public DepartmentEntity getDepartmentById(int id) {
        return departmentDAO.getAllDepartmentsFromDatabaseById(id);
    }

    @Transactional
    public boolean createDepartment(DepartmentEntity entity) {
        try {
            departmentDAO.persistDepartmentToDatabase(entity);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public boolean deleteDepartmentFromDatabase(int id) {
        DepartmentEntity department = departmentDAO.getAllDepartmentsFromDatabaseById(id);
        if (department == null) {
            return false;
        }
        departmentDAO.removeDepartmentFromDatabase(department);
        return true;
    }
}
