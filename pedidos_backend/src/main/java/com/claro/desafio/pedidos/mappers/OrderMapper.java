package com.claro.desafio.pedidos.mappers;

import com.claro.desafio.pedidos.dtos.OrderDTO;
import com.claro.desafio.pedidos.entities.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderDTO toDTO (Order order);
    Order toEntity (OrderDTO orderDTO);
}
