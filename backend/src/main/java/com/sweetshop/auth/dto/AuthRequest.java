package com.sweetshop.auth.dto;

import com.sweetshop.user.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {
    private String username;
    private String password;
    private Role role;   
}
