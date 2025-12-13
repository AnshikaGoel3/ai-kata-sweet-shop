package com.sweetshop.auth.service;

import com.sweetshop.user.model.Role;
import com.sweetshop.user.model.User;
import com.sweetshop.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
@Import(AuthService.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)

class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Test
    void registerUser_successfullyCreatesUser() {
        User user = authService.register("john", "password123");

        assertThat(user.getId()).isNotNull();
        assertThat(user.getUsername()).isEqualTo("john");
        assertThat(user.getRole()).isEqualTo(Role.USER);
        assertThat(user.getPassword()).isNotEqualTo("password123");
    }

    @Test
    void registerUser_throwsExceptionIfUsernameExists() {
        authService.register("john", "password123");

        assertThatThrownBy(() ->
                authService.register("john", "anotherPass")
        ).isInstanceOf(IllegalStateException.class);
    }
}
