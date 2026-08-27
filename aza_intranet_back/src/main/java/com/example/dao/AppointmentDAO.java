package com.example.dao;

import com.example.entity.AppointmentEntity;
import com.example.entity.DentistEntity;

import java.util.List;

public interface AppointmentDAO {
    List<AppointmentEntity> getAllAppointmentsFromDatabase();

    AppointmentEntity getAppointmentFromDatabaseById(int id);

    void persistAppointmentToDatabase(AppointmentEntity appointment);

    List<AppointmentEntity> getAppointmentFromDatabaseByDentistId(DentistEntity dentist);

    void deleteAppointmentFromDatabase(AppointmentEntity appointment);
}
