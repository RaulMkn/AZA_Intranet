package com.example.configuration.exceptionHandler;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@JsonSerialize
@AllArgsConstructor
public class ErrorMessage {

    private final String message;

    private final int status;

    private final LocalDateTime date;

}
