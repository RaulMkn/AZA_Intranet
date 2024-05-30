package com.example.dto.fakes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
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
        private Date date_of_birth;
        private String nif;
        private String address;
        private String gender;
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
        private Date date_of_birth;
        private String nif;
        private String address;
        private String gender;
        private Integer department;
    }
}
