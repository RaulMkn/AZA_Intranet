package com.example.dto.fakes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
        private Integer dentistId;
    }
}
