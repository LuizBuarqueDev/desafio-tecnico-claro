package com.claro.desafio.pedidos.mappers;

import com.claro.desafio.pedidos.dtos.OrderDTO;
import com.claro.desafio.pedidos.entities.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderDTO toDTO (Order order);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", ignore = true)
    Order toEntity (OrderDTO orderDTO);
}
