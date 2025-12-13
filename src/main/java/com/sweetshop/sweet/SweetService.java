package com.sweetshop.sweet;

import java.util.List;

import org.springframework.stereotype.Service;

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

}
