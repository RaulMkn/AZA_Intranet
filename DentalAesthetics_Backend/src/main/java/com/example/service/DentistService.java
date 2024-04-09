package com.example.service;

import com.example.configuration.HibernateConfiguration;
import com.example.dao.impl.DentistDAOImpl;
import com.example.dto.LoginDto;
import com.example.dao.DentistDAO;
import com.example.entity.DentistEntity;
import com.example.utils.Security;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.net.ssl.SSLSession;
import java.util.List;

@Service
public class DentistService {

    @Autowired
    DentistDAO dentistDAO = new DentistDAOImpl();


    @Transactional
    public List<DentistEntity> getAllUsers() {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            return dentistDAO.getAllUsersFromDatabase(session);
        }
    }

    @Transactional
    public DentistEntity getUserById(int id) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            return dentistDAO.getUserFromDatabaseById(session, id);
        }
    }

    @Transactional
    public boolean createUser(DentistEntity user) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            DentistEntity userAttached = session.merge(user);

            boolean persistSuccess = dentistDAO.persistUserToDatabase(userAttached, session);
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

    @Transactional
    public boolean updateUser(DentistEntity user) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            return dentistDAO.updateUserInfo(user, session);
        }
    }

    @Transactional
    public boolean deleteUser(DentistEntity user) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            boolean success = dentistDAO.deleteUserFromDatabase(session, user);
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

    public boolean verifyLogin(LoginDto dto) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            DentistEntity user = dentistDAO.getUserFromDatabaseByEmail(session,dto.getEmail());
            if (user != null && Security.verifyPassword(dto.getPass(), user.getPass())) {
                session.getTransaction().commit();
                return true;
            } else {
                session.getTransaction().rollback();
                return false;
            }
        } catch (Exception e) {
            return false;
        }

    }

    public DentistEntity getUserByEmail(LoginDto loginDto) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            return dentistDAO.getUserFromDatabaseByEmail(session, loginDto.getEmail());
        }
    }
}

