package com.claro.desafio.pedidos.dtos;

import com.claro.desafio.pedidos.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private UUID id;
    private String displayName;
    private Long itens;
    private Double peso;
    private OrderStatus status;
}
