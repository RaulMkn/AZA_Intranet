package com.example.dao;

import com.example.entity.DepartmentEntity;

import java.util.List;

public interface DepartmentDAO {
    List<DepartmentEntity> getAllDepartmentsFromDatabase();

    DepartmentEntity getAllDepartmentsFromDatabaseById(int id);

    void persistDepartmentToDatabase(DepartmentEntity department);

    DepartmentEntity getDepartmentPartialInfoFromDatabase(Integer id);

    void removeDepartmentFromDatabase(DepartmentEntity department);
}
