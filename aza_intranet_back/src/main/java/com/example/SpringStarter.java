package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(excludeName = "org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration")

public class SpringStarter {
    public static void main(String[] args) {
        SpringApplication.run(SpringStarter.class,args);
    }
}
