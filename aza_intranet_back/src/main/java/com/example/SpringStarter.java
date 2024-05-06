package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@CrossOrigin(origins = "http://localhost:5174", allowCredentials = "true")

public class SpringStarter {
    public static void main(String[] args) {
        SpringApplication.run(SpringStarter.class,args);
    }
}
