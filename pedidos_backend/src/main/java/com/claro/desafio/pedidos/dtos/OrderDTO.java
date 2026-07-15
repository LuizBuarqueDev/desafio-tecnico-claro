package com.claro.desafio.pedidos.dtos;

import com.claro.desafio.pedidos.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class OrderDTO {
    private UUID id;
    private String displayName;
    private Long itens;
    private Double peso;
    private OrderStatus status;
}
