package com.example.dao;

import com.example.entity.DepartmentEntity;
import org.hibernate.Session;

import java.util.List;

public interface DepartmentDAO {
    List<DepartmentEntity> getAllDepartmentsFromDatabase(Session session);

    DepartmentEntity getAllDepartmentsFromDatabaseById(Session session, int id);

    boolean persistDepartmentToDatabase(DepartmentEntity departmentAttached, Session session);
}
