package com.claro.desafio.pedidos.dtos;

import com.claro.desafio.pedidos.enums.OrderStatus;
import lombok.Data;

import java.util.UUID;

@Data
public class OrderDTO {
    private UUID id;
    private String displayName;
    private Long items;
    private Double peso;
    private OrderStatus status;
}
