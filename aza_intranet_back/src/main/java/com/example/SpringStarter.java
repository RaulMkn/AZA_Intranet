package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication(excludeName = "org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")

public class SpringStarter {
    public static void main(String[] args) {
        SpringApplication.run(SpringStarter.class,args);
    }
}
