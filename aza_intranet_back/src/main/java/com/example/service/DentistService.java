package com.example.service;

import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dto.LoginDto;
import com.example.dao.DentistDAO;
import com.example.dao.PictureDAO;
import com.example.entity.DentistEntity;
import com.example.entity.PictureEntity;
import com.example.configuration.utils.Security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class DentistService {

    @Autowired
    private DentistDAO dentistDAO;

    @Autowired
    private PictureDAO pictureDAO;

    @Transactional(readOnly = true)
    public List<DentistEntity> getAllUsers() {
        List<DentistEntity> dentists = dentistDAO.getAllUsersFromDatabase();
        for (DentistEntity dentist : dentists) {
            dentist.getAppointments().size();
            dentist.getPatients().size();
            dentist.getEvents().size();
        }
        return dentists;
    }

    @Transactional(readOnly = true)
    public DentistEntity getUserById(int id) {
        DentistEntity dentist = dentistDAO.getUserFromDatabaseById(id);
        if (dentist != null) {
            dentist.getEvents().size();
            dentist.getPatients().size();
            dentist.getAppointments().size();
        }
        return dentist;
    }

    @Transactional
    public boolean createUser(DentistEntity user, MultipartFile picture) {
        try {
            PictureEntity persistedPicture = getPicture(picture);
            user.setPicture(persistedPicture);
            user.setPass(Security.hashPassword(user.getPass()));
            dentistDAO.persistUserToDatabase(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public PictureEntity getPicture(MultipartFile picture) throws IOException {
        PictureEntity pictureEntity = new PictureEntity();
        pictureEntity.setImg_name(picture.getOriginalFilename());
        pictureEntity.setImg(picture.getBytes());
        pictureEntity.setImg_type(picture.getContentType());
        return pictureDAO.persistPictureToDatabase(pictureEntity);
    }

    @Transactional
    public boolean updateUser(DentistEntity user) {
        try {
            dentistDAO.updateUserInfo(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public boolean deleteUser(int id) {
        DentistEntity dentist = dentistDAO.getUserFromDatabaseById(id);
        if (dentist == null) {
            return false;
        }
        dentistDAO.deleteUserFromDatabase(dentist);
        return true;
    }

    @Transactional(readOnly = true)
    public boolean verifyLogin(LoginDto dto) {
        DentistEntity user = dentistDAO.getUserFromDatabaseByEmail(dto.getEmail());
        return user != null && Security.verifyPassword(dto.getPass(), user.getPass());
    }

    @Transactional(readOnly = true)
    public DentistEntity getUserByEmail(LoginDto loginDto) {
        DentistEntity dentist = dentistDAO.getUserFromDatabaseByEmail(loginDto.getEmail());
        if (dentist != null) {
            dentist.getEvents().size();
            dentist.getPatients().size();
            dentist.getAppointments().size();
        }
        return dentist;
    }
}
