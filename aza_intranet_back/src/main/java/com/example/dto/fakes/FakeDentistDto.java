package com.example.dto.fakes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


public class FakeDentistDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class GetDentistDto {
        private Integer id;
        private String full_name;
        private String email;
        private String pass;
        private String job;
        private Integer permis;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class PostDentistDto {

        private Integer id;
        private String full_name;
        private String email;
        private String pass;
        private FakePictureDto picture;
        private String job;
        private Integer permis;
        private List<Integer> appointments;
        private Integer department;
        private List<Integer> events;
        private List<Integer> patients;
    }
}
