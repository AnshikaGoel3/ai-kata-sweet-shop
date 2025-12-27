package com.sweetshop.auth;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

public class UserNameValidatorTest {
    @Test
    void UserName_whenNull() {
        assertThat(UserNameValidator.isValid(null)).isFalse();
    }

    @Test
    void UserName_tooShort() {
        assertThat(UserNameValidator.isValid("abc")).isFalse();
    }
    @Test
    void UserName_tooLong() {
        assertThat(UserNameValidator.isValid("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")).isFalse();
    }

    @Test
    void UserName_containsSpecialCharacters() {
        assertThat(UserNameValidator.isValid("john$123")).isFalse();
    }
}
