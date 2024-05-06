package com.example.dao;

import com.example.entity.DentistEntity;
import org.hibernate.Session;

import java.util.List;

public interface DentistDAO {
    List<DentistEntity> getAllUsersFromDatabase(Session session);

    DentistEntity getUserFromDatabaseById(Session session, int id);

    boolean persistUserToDatabase(DentistEntity userAttached, Session session);

    boolean updateUserInfo(DentistEntity user, Session session);

    boolean deleteUserFromDatabase(Session session, DentistEntity user);

    DentistEntity getUserFromDatabaseByEmail(Session session, String email);
}
