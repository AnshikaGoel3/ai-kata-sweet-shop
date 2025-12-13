package com.sweetshop.sweet;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SweetRepository extends JpaRepository<Sweet, Long> {

    List<Sweet> findByNameContainingIgnoreCase(String name);

    List<Sweet> findByCategoryIgnoreCase(String category);

    List<Sweet> findByPriceBetween(double minPrice, double maxPrice);
}
