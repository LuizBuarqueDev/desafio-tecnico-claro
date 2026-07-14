package com.claro.desafio.pedidos.entities;

import com.claro.desafio.pedidos.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order extends BaseEntity {

    @Column(nullable = false)
    private String displayName;

    @Column(nullable = false)
    private Long items;

    private Double peso;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private Instant createAt;
    private Instant updateAt;

    @PrePersist
    private void prePersist() {
        this.createAt = Instant.now();
        this.updateAt = Instant.now();
    }

    @PreUpdate
    private void preUpdate() {
        this.updateAt = Instant.now();
    }
}
