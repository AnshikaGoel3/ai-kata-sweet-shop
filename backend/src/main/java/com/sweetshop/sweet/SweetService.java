package com.sweetshop.sweet;

import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class SweetService {

    private final SweetRepository sweetRepository;

    public SweetService(SweetRepository sweetRepository) {
        this.sweetRepository = sweetRepository;
    }

    public Sweet addSweet(Sweet sweet) {
        return sweetRepository.save(sweet);
    }

    public List<Sweet> getAllSweets() {
        return sweetRepository.findAll();
    }

    public void deleteSweet(Long id) {
        sweetRepository.deleteById(id);
    }
    
    public List<Sweet> searchSweets(
        String name,
        String category,
        Double minPrice,
        Double maxPrice) {

        if (name != null) {
            return sweetRepository.findByNameContainingIgnoreCase(name);
        }

        if (category != null) {
            return sweetRepository.findByCategoryIgnoreCase(category);
        }

        if (minPrice != null && maxPrice != null) {
            return sweetRepository.findByPriceBetween(minPrice, maxPrice);
        }

        return sweetRepository.findAll();
    }


    @Transactional
public Sweet purchaseSweet(Long id, int quantity) {
    Sweet sweet = sweetRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Sweet not found"));

    if (sweet.getQuantity() < quantity) {
        throw new IllegalStateException("Insufficient stock");
    }

    sweet.setQuantity(sweet.getQuantity() - quantity);
    return sweetRepository.save(sweet);
}

@Transactional
public Sweet restockSweet(Long id, int quantity) {
    Sweet sweet = sweetRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Sweet not found"));

    sweet.setQuantity(sweet.getQuantity() + quantity);
    return sweetRepository.save(sweet);
}

public Sweet updateSweet(Long id, Sweet updatedSweet) {
    Sweet existing = sweetRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Sweet not found"));

    existing.setName(updatedSweet.getName());
    existing.setCategory(updatedSweet.getCategory());
    existing.setPrice(updatedSweet.getPrice());
    existing.setQuantity(updatedSweet.getQuantity());

    return sweetRepository.save(existing);
}


}
