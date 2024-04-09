package com.example.dto;

import com.example.entity.DentistEntity;
import com.example.utils.Security;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DentistDto {
    private Integer id;
    private String full_name;
    private String email;
    private String pass;
    private String picture;
    private String job;

    public static DentistEntity toEntity(DentistDto dentistDto){
        if (dentistDto == null){
            throw new IllegalArgumentException("El Objeto userDTO no puede ser nulo.");
        }
        DentistEntity user = new DentistEntity();
        user.setId(dentistDto.getId());
        user.setPicture(dentistDto.getPicture());
        user.setFull_name(dentistDto.getFull_name());
        user.setPass(Security.hashPassword(dentistDto.getPass()));
        user.setEmail(dentistDto.getEmail());
        user.setJob(dentistDto.getJob());
        return user;
    }

    public static DentistDto toDto(DentistEntity dentistEntity){
        DentistDto dentistDto = new DentistDto();
        dentistDto.setId(dentistEntity.getId());
        dentistDto.setFull_name(dentistEntity.getFull_name());
        dentistDto.setEmail(dentistEntity.getEmail());
        dentistDto.setPass(dentistEntity.getPass());
        dentistDto.setJob(dentistEntity.getJob());
        dentistDto.setPicture(dentistEntity.getPicture());
        return dentistDto;
    }
}
