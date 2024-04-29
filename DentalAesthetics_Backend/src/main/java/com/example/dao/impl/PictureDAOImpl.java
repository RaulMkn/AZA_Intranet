package com.example.dao.impl;

import com.example.dao.PictureDAO;
import com.example.entity.PatientEntity;
import com.example.entity.PictureEntity;
import org.hibernate.Session;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class PictureDAOImpl implements PictureDAO {
    @Transactional
    @Override
    public PictureEntity persistPictureToDatabase(PictureEntity pictureAttached, Session session) {
        try {
            session.persist(pictureAttached); // Guarda o actualiza la entidad en la base de datos
            return pictureAttached; // Devuelve la entidad guardada o actualizada
        } catch (Exception e) {
            // Maneja cualquier excepción que pueda ocurrir durante la persistencia
            throw new RuntimeException("Error al persistir la imagen en la base de datos", e);
        }
    }

}
