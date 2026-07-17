package com.claro.desafio.pedidos.dtos;

import com.claro.desafio.pedidos.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateOrderStatusDTO {
    OrderStatus status;
}