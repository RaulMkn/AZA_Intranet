package com.example.controllers;

import com.example.dto.LoginDto;
import com.example.service.AppointmentService;
import com.example.service.DentistService;
import com.example.service.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/intranet/DentalAesthetics")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET})
public class SessionController {

     SessionService sessionService;
     DentistService dentistService;
/*
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto, HttpServletResponse response) {
        // Lógica de autenticación
        if (dentistService.verifyLogin(loginDto)) {
            // Usuario válido, generación de identificador de sesión
            String sessionId = sessionService.generateSessionId();

            // Configuración de la cookie segura
            Cookie cookie = new Cookie("sessionId", sessionId);
            cookie.setSecure(true);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            response.addCookie(cookie);

            return ResponseEntity.ok("Inicio de sesión exitoso");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

 */
}
