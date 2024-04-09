package com.example.service;

import java.util.UUID;

public class SessionService {
    public String generateSessionId() {
        return UUID.randomUUID().toString();
    }
}

