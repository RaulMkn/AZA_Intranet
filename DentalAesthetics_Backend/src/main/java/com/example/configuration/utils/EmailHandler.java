package com.example.configuration.utils;

import com.example.entity.AppointmentEntity;
import com.resend.*;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.SendEmailRequest;
import com.resend.services.emails.model.SendEmailResponse;


import com.resend.*;

public class EmailHandler {
    public static void sendMail(AppointmentEntity appointment) {
        try {
            Resend resend = new Resend("re_123456789");

            SendEmailRequest sendEmailRequest = SendEmailRequest.builder()
                    .from("AZA <onboarding@resend.dev>")
                    .to(appointment.getPatient().getEmail())
                    .subject("Cita Dental").
                    .build();


            SendEmailResponse data = resend.emails().send(sendEmailRequest);
            System.out.println(data.getId());
        } catch (ResendException e) {
            e.printStackTrace();
        }
    }

}

