package com.sweetshop.auth;

public class UserNameValidator {
    public static boolean isValid(String username) {
        if(username == null) {
            return false;
        }
        int length = username.length();
        if(length < 5 || length > 20) {
            return false;
        }
        return username.matches("^[a-zA-Z0-9]+$");
    }
}
