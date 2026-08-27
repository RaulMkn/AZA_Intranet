package com.example.service;

import com.example.configuration.exceptionHandler.ResponseStatusException;
import com.example.dao.AppointmentDAO;
import com.example.entity.AppointmentEntity;
import com.example.entity.DentistEntity;
import com.example.entity.InterventionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentDAO appointmentDAO;

    @Autowired
    private DentistService dentistService;

    @Transactional(readOnly = true)
    public List<AppointmentEntity> getAllAppointments() {
        List<AppointmentEntity> appointments = appointmentDAO.getAllAppointmentsFromDatabase();
        for (AppointmentEntity appointment : appointments) {
            BigDecimal totalPrice = BigDecimal.ZERO;
            for (InterventionEntity intervention : appointment.getInterventions()) {
                totalPrice = totalPrice.add(intervention.getPrice());
            }
            appointment.setTotal_price(totalPrice);
        }
        return appointments;
    }

    @Transactional(readOnly = true)
    public AppointmentEntity getAppointmentById(int id) throws ResponseStatusException {
        AppointmentEntity entity = appointmentDAO.getAppointmentFromDatabaseById(id);
        if (entity == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se ha podido encontrar el Appointment con identificador -> " + id);
        }
        return entity;
    }

    @Transactional
    public boolean createAppointment(AppointmentEntity entity) {
        try {
            BigDecimal total_price = BigDecimal.ZERO;
            for (InterventionEntity intervention : entity.getInterventions()) {
                total_price = total_price.add(intervention.getPrice());
            }
            entity.setTotal_price(total_price);
            appointmentDAO.persistAppointmentToDatabase(entity);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional(readOnly = true)
    public List<AppointmentEntity> getAppointmentByDentistId(int id) {
        DentistEntity dentist = dentistService.getUserById(id);
        return appointmentDAO.getAppointmentFromDatabaseByDentistId(dentist);
    }

    @Transactional
    public boolean deleteAppointmentFromDatabase(int id) {
        AppointmentEntity appointment = appointmentDAO.getAppointmentFromDatabaseById(id);
        if (appointment == null) {
            return false;
        }
        appointmentDAO.deleteAppointmentFromDatabase(appointment);
        return true;
    }
}
