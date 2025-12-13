package com.sweetshop.order;

import java.time.LocalDateTime;

import com.sweetshop.sweet.Sweet;
import com.sweetshop.user.model.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Sweet sweet;

    private Integer quantity;

    private Double totalPrice;

    private LocalDateTime orderDate;
}
