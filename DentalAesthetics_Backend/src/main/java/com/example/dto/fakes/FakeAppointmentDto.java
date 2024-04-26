package com.example.dto.fakes;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@NoArgsConstructor
@Getter
@Setter
public class FakeAppointmentDto {
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
