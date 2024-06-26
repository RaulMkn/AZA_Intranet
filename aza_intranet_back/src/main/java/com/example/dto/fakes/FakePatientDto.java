package com.example.dto.fakes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;

public class FakePatientDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class GetPatientDto {
        private Integer id;
        private String full_name;
        private String email;
        private int phone;
        private String nif;
        private String address;
        private String gender;
        private Date birthDate;
    }


    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class PostPatientDto{
        private Integer id;
        private String full_name;
        private String email;
        private int phone;
        private String nif;
        private String address;
        private String gender;
        private Date date_of_birth;
        private Integer dentistId;
    }
}
