package com.example.dto;

import com.example.dto.fakes.FakeDentistDto;
import com.example.entity.DentistEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
@AllArgsConstructor
@Getter
@Setter
public class EventDto {
    private Integer id;
    private Timestamp date_time_beginning;
    private Timestamp date_time_ending;
    private String title;
    private String description;
    private String location;
    private FakeDentistDto.GetDentistDto dentist;
}
