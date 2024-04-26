package com.example.configuration.exceptionHandler;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class ControllerExceptionHandler {

    @Autowired
    private ObjectMapper objectMapper;

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> resourceNotFoundException(ResponseStatusException ex, WebRequest request) throws JsonProcessingException {
        ErrorMessage message = new ErrorMessage(
                ex.getMessage(),
                ex.getStatus().value(),
                LocalDateTime.now());
        ex.printStackTrace();
        return new ResponseEntity<>(this.objectMapper.writeValueAsString(message), ex.getStatus());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> globalExceptionHandler(Exception ex, WebRequest request) throws JsonProcessingException {
        ErrorMessage message = new ErrorMessage(
                "Error, ha ocurrido algo inesperado...",
                500,
                LocalDateTime.now());
        ex.printStackTrace();
        return new ResponseEntity<>(this.objectMapper.writeValueAsString(message), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
