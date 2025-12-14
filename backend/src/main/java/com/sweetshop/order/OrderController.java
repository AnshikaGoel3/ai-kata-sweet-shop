package com.sweetshop.order;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public Order placeOrder(Authentication authentication,
                            @RequestParam Long sweetId,
                            @RequestParam Integer quantity) {

        String username = authentication.getName();
        return orderService.placeOrder(username, sweetId, quantity);
    }
}
