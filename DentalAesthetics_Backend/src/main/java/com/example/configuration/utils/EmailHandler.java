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
                    .subject("Cita Dental")
                    .html("<body>\n" +
                            "  <div class=\"container\">\n" +
                            "    <div class=\"header\">\n" +
                            "      <img src=\"ruta/a/tu/logo.png\" alt=\"Logo Clínica Dental\" class=\"logo\">\n" +
                            "      <h2>Confirmación de Cita</h2>\n" +
                            "    </div>\n" +
                            "    <div class=\"content\">\n" +
                            "      <p>Estimado/a [Nombre del Paciente],</p>\n" +
                            "      <p>Le escribimos para confirmar su cita en nuestra clínica dental.</p>\n" +
                            "      <p><strong>Fecha:</strong> [Fecha de la Cita]</p>\n" +
                            "      <p><strong>Hora:</strong> [Hora de la Cita]</p>\n" +
                            "      <p>Por favor, si necesita reprogramar su cita o tiene alguna pregunta, no dude en ponerse en contacto con nosotros.</p>\n" +
                            "      <p>¡Esperamos verlo/a pronto!</p>\n" +
                            "    </div>\n" +
                            "    <div class=\"footer\">\n" +
                            "      <p>Clínica Dental Sonrisas Felices | Dirección de la Clínica | Teléfono: 123-456-789</p>\n" +
                            "    </div>\n" +
                            "  </div>\n" +
                            "</body>\n")
                    .build();


            SendEmailResponse data = resend.emails().send(sendEmailRequest);
            System.out.println(data.getId());
        } catch (ResendException e) {
            e.printStackTrace();
        }
    }

}

