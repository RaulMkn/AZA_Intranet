package com.example.dto.fakes;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
public class FakeEventDto {
    private Integer id;
    private Timestamp date_time_beginning;
    private Timestamp date_time_ending;
    private String title;
    private String description;
    private String location;
}
