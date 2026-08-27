package com.example.dao;

import com.example.entity.PictureEntity;

public interface PictureDAO {
    PictureEntity persistPictureToDatabase(PictureEntity picture);
}
