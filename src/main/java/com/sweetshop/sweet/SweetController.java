package com.sweetshop.sweet;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sweets")
public class SweetController {

    private final SweetService sweetService;

    public SweetController(SweetService sweetService) {
        this.sweetService = sweetService;
    }

    // ADMIN: add new sweet
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> addSweet(@RequestBody Sweet sweet) {
        Sweet saved = sweetService.addSweet(sweet);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // USER / ADMIN: list sweets
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public List<Sweet> getAllSweets() {
        return sweetService.getAllSweets();
    }

    // ADMIN: delete sweet
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSweet(@PathVariable Long id) {
        sweetService.deleteSweet(id);
        return ResponseEntity.noContent().build();
    }

    // USER → PURCHASE
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/{id}/purchase")
    public Sweet purchaseSweet(@PathVariable Long id,
                            @RequestParam int quantity) {
        return sweetService.purchaseSweet(id, quantity);
    }

    // ADMIN → RESTOCK
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/restock")
    public Sweet restockSweet(@PathVariable Long id,
                            @RequestParam int quantity) {
        return sweetService.restockSweet(id, quantity);
    }

}
