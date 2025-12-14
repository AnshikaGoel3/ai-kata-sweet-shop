package com.sweetshop.order;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sweetshop.sweet.Sweet;
import com.sweetshop.sweet.SweetRepository;
import com.sweetshop.user.model.User;
import com.sweetshop.user.repository.UserRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final SweetRepository sweetRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository,
                        SweetRepository sweetRepository,
                        UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.sweetRepository = sweetRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Order placeOrder(String username, Long sweetId, Integer quantity) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Sweet sweet = sweetRepository.findById(sweetId)
                .orElseThrow(() -> new IllegalArgumentException("Sweet not found"));

        if (sweet.getQuantity() < quantity) {
            throw new IllegalStateException("Insufficient stock");
        }

        sweet.setQuantity(sweet.getQuantity() - quantity);

        Order order = Order.builder()
                .user(user)
                .sweet(sweet)
                .quantity(quantity)
                .totalPrice(quantity * sweet.getPrice())
                .orderDate(LocalDateTime.now())
                .build();

        sweetRepository.save(sweet);
        return orderRepository.save(order);
    }
}
