package com.example.configuration.exceptionHandler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
@AllArgsConstructor
public class ResponseStatusException extends Exception {

    private final HttpStatus status;

    private final String message;


    public ResponseStatusException(HttpStatus status, String message, Exception exception) {
        super(exception);
        this.status = status;
        this.message = message;
    }
}
