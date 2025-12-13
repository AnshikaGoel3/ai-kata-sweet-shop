package com.sweetshop.user.repository;

import com.sweetshop.user.model.User;
import com.sweetshop.user.model.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void saveUser_persistsAndLoadsById() {
        User user = User.builder()
                .username("admin")
                .password("encoded-password")
                .role(Role.ADMIN)
                .build();

        User saved = userRepository.save(user);

        assertThat(saved.getId()).isNotNull();

        User found = userRepository.findById(saved.getId()).orElseThrow();

        assertThat(found.getUsername()).isEqualTo("admin");
        assertThat(found.getRole()).isEqualTo(Role.ADMIN);
    }
}
