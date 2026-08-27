package com.example.configuration.utils;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class Security {


    public static String hashPassword(String pass) {
        return BCrypt.hashpw(pass, BCrypt.gensalt());
    }

    public static boolean verifyPassword(String pass, String pass2) {
        return BCrypt.checkpw(pass, pass2);
    }

}
