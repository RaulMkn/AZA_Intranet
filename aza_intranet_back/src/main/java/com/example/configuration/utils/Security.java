package com.example.configuration.utils;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

public class Security {


    public static String hashPassword(String pass) {
        return BCrypt.hashpw(pass, BCrypt.gensalt());
    }

    public static boolean verifyPassword(String pass, String pass2) {
        return BCrypt.checkpw(pass, pass2);
    }

}
