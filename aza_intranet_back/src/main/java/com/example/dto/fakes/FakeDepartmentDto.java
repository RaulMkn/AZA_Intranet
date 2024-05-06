package com.example.dto.fakes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class FakeDepartmentDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class GetDepartmentDto {
        private Integer id;
        private String department_name;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostDepartmentDto {
        private Integer id;
        private String department_name;
        private List<Integer> dentists;
        private List<Integer> appointments;
        private List<Integer> interventions;
    }
}
