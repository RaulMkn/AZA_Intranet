package com.example.dto.fakes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;


public class FakeEventDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class GetEventDto {
        private Integer id;
        private Timestamp date_time_beginning;
        private Timestamp date_time_ending;
        private String title;
        private String description;
        private String location;
    }
    @AllArgsConstructor
    @Getter
    @Setter
    public static class PostEventDto {
        private Integer id;
        private Timestamp date_time_beginning;
        private Timestamp date_time_ending;
        private String title;
        private String description;
        private String location;
        private Integer dentist;
    }
}
