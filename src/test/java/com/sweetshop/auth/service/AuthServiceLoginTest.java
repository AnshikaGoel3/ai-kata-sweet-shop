package com.sweetshop.auth.service;

import com.sweetshop.config.SecurityBeansConfig;
import com.sweetshop.user.model.User;
import com.sweetshop.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import({AuthService.class, SecurityBeansConfig.class})
class AuthServiceLoginTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Test
    void login_success_whenCredentialsAreCorrect() {
        authService.register("john", "password123");

        User user = authService.login("john", "password123");

        assertThat(user).isNotNull();
        assertThat(user.getUsername()).isEqualTo("john");
    }

    @Test
    void login_fails_whenPasswordIsWrong() {
        authService.register("john", "password123");

        assertThatThrownBy(() ->
                authService.login("john", "wrongPassword")
        ).isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void login_fails_whenUserDoesNotExist() {
        assertThatThrownBy(() ->
                authService.login("ghost", "password")
        ).isInstanceOf(IllegalArgumentException.class);
    }
}
