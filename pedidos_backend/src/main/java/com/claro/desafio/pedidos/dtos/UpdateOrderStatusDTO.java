package com.claro.desafio.pedidos.dtos;

import com.claro.desafio.pedidos.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateOrderStatusDTO {
    OrderStatus status;
}