package com.example.dao;

import com.example.entity.DentistEntity;

import java.util.List;

public interface DentistDAO {
    List<DentistEntity> getAllUsersFromDatabase();

    DentistEntity getUserFromDatabaseById(int id);

    void persistUserToDatabase(DentistEntity user);

    void updateUserInfo(DentistEntity user);

    void deleteUserFromDatabase(DentistEntity user);

    DentistEntity getUserFromDatabaseByEmail(String email);
}
