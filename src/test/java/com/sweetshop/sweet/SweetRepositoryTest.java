package com.sweetshop.sweet;

import com.sweetshop.SweetShopBackendApplication;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = SweetShopBackendApplication.class)
@ActiveProfiles("test")
class SweetRepositoryTest {

    @Autowired
    private SweetRepository sweetRepository;

    @Test
    @DisplayName("Saving a sweet should assign an id and allow loading it back")
    void saveSweet_persistsAndLoadsById() {
        Sweet sweet = new Sweet();
        sweet.setName("Gulab Jamun");
        sweet.setCategory("Indian");
        sweet.setPrice(20.0);
        sweet.setQuantity(50);

        Sweet saved = sweetRepository.save(sweet);

        assertThat(saved.getId()).isNotNull();
        Sweet found = sweetRepository.findById(saved.getId()).orElseThrow();
        assertThat(found.getName()).isEqualTo("Gulab Jamun");
        assertThat(found.getCategory()).isEqualTo("Indian");
        assertThat(found.getPrice()).isEqualTo(20.0);
        assertThat(found.getQuantity()).isEqualTo(50);
    }
}
