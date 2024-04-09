package com.example.dao;

import com.example.entity.AppointmentEntity;
import com.example.entity.DentistEntity;
import org.hibernate.Session;

import java.util.List;

public interface AppointmentDAO {
    List<AppointmentEntity> getAllAppointmentsFromDatabase(Session session);

    AppointmentEntity getAppointmentFromDatabaseById(Session session, int id);

    boolean persistAppointmentToDatabase(AppointmentEntity appointmentAttached, Session session);

    List<AppointmentEntity> getAppointmentFromDatabaseByDentistId(Session session, DentistEntity id);

    boolean deleteAppointmentFromDatabase(Session session, AppointmentEntity appointment);
}
