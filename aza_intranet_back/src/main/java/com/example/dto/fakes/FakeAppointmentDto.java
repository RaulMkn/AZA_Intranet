package com.example.dto.fakes;

import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;


public class FakeAppointmentDto {
    @NoArgsConstructor
    @Getter
    @Setter
    public static class GetAppointmentDto {
        private Integer id;
        private Timestamp date_time_beginning;
        private Timestamp date_time_ending;
        private String priority;
        private String state;
        private String title;
        private String description;
        private BigDecimal total_price;
        private String invoice;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class PostAppointmentDto {
        private Integer id;
        private Timestamp date_time_beginning;
        private Timestamp date_time_ending;
        private String priority;
        private String state;
        private String title;
        private String description;
        private BigDecimal total_price;
        private String invoice;
        private Integer department;
        private Integer dentist;
        private Integer patient;
        private String interventions;



    }
}
