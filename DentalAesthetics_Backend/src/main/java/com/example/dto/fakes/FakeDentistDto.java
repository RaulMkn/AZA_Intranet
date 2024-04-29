package com.example.dto.fakes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FakeDentistDto {
    private Integer id;
    private String full_name;
    private String email;
    private String pass;
    private String job;
    private Integer permis;
}
