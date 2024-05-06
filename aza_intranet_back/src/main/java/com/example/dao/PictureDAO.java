package com.example.dao;

import com.example.entity.PictureEntity;
import org.hibernate.Session;

public interface PictureDAO {
    PictureEntity persistPictureToDatabase(PictureEntity pictureAttached, Session session);
}
