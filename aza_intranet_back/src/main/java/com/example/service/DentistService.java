package com.example.service;

import com.example.configuration.HibernateConfiguration;
import com.example.dao.PictureDAO;
import com.example.dao.impl.DentistDAOImpl;
import com.example.dao.impl.PictureDAOImpl;
import com.example.dto.LoginDto;
import com.example.dao.DentistDAO;
import com.example.entity.DentistEntity;
import com.example.entity.PictureEntity;
import com.example.configuration.utils.ImageUtils;
import com.example.configuration.utils.Security;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class DentistService {

    @Autowired
    DentistDAO dentistDAO = new DentistDAOImpl();

    @Autowired
    PictureDAO pictureDAO = new PictureDAOImpl();


    @Transactional
    public List<DentistEntity> getAllUsers() {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            List<DentistEntity> dentists = dentistDAO.getAllUsersFromDatabase(session);
            for (DentistEntity dentist : dentists) {
                dentist.getAppointments().size();
                dentist.getPatients().size();
                dentist.getEvents().size();
            }
            return dentists;
        }
    }

    @Transactional
    public DentistEntity getUserById(int id) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            DentistEntity dentist = dentistDAO.getUserFromDatabaseById(session, id);
            dentist.getEvents().size();
            dentist.getPatients().size();
            dentist.getAppointments().size();
            dentist.getPayments().size();
            return dentist;
        }
    }

    @Transactional
    public boolean createUser(DentistEntity user, MultipartFile picture) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            PictureEntity persistedPicture = getPicture(picture, session);
            user.setPicture(persistedPicture);
            user.setPass(Security.hashPassword(user.getPass()));
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
    private PictureEntity getPicture(MultipartFile picture, Session session) throws IOException {
        PictureEntity pictureEntity = new PictureEntity();
        pictureEntity.setImg_name(picture.getOriginalFilename());
        pictureEntity.setImg(picture.getBytes());
        pictureEntity.setImg_type(picture.getContentType());
        return pictureDAO.persistPictureToDatabase(session.merge(pictureEntity), session);
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

    @Transactional
    public boolean verifyLogin(LoginDto dto) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            DentistEntity user = dentistDAO.getUserFromDatabaseByEmail(session, dto.getEmail());
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

    @Transactional
    public DentistEntity getUserByEmail(LoginDto loginDto) {
        try (Session session = HibernateConfiguration.getSessionFactory().openSession()) {
            session.beginTransaction();
            DentistEntity dentist = dentistDAO.getUserFromDatabaseByEmail(session, loginDto.getEmail());
            dentist.getEvents().size();
            dentist.getPatients().size();
            dentist.getAppointments().size();
            dentist.getPayments().size();
            return dentist;
        }
    }
}

