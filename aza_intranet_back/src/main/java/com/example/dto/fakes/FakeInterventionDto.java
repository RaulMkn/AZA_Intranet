package com.example.dto.fakes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;


public class FakeInterventionDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class GetInterventionDto {
        private Integer id;
        private String full_name;
        private BigDecimal price;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class PostInterventionDto {
        private Integer id;
        private String full_name;
        private BigDecimal price;
        private Integer department;
        private List<Integer> appointments;

    }

}
