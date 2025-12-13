package com.sweetshop.auth.service;

import com.sweetshop.user.model.Role;
import com.sweetshop.user.model.User;
import com.sweetshop.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(String username, String password) {
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            throw new IllegalStateException("Username already exists");
        }

        User user = User.builder()
                .username(username)
                .password(encodePassword(password))
                .role(Role.USER)
                .build();

        return userRepository.save(user);
    }

    private String encodePassword(String rawPassword) {
        // placeholder encoder (will replace with BCrypt later)
        return "ENC(" + rawPassword + ")";
    }

    public User login(String username, String password) {
    User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

    if (!user.getPassword().equals(encodePassword(password))) {
        throw new IllegalArgumentException("Invalid credentials");
    }

    return user;
}

}
