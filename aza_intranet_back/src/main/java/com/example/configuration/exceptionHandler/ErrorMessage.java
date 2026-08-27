package com.example.configuration.exceptionHandler;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ErrorMessage {

    private final String message;

    private final int status;

    private final LocalDateTime date;

}
