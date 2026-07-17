package com.claro.desafio.pedidos.services;

import com.claro.desafio.pedidos.dtos.OrderDTO;
import com.claro.desafio.pedidos.entities.Order;
import com.claro.desafio.pedidos.enums.OrderStatus;
import com.claro.desafio.pedidos.exceptions.OrderNotFoundException;
import com.claro.desafio.pedidos.mappers.OrderMapper;
import com.claro.desafio.pedidos.repositories.OrderRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private OrderMapper orderMapper;

    @InjectMocks
    private OrderService orderService;

    @Test
    void shouldCreateOrderSuccessfully() {

        OrderDTO dto = new OrderDTO();
        dto.setDisplayName("João Silva");
        dto.setItens(22L);
        dto.setPeso(1000.0);

        Order order = new Order();
        Order savedOrder = new Order();
        savedOrder.setId(UUID.randomUUID());
        savedOrder.setStatus(OrderStatus.EM_PROCESSAMENTO);

        when(orderRepository.count()).thenReturn(0L);
        when(orderMapper.toEntity(dto)).thenReturn(order);
        when(orderRepository.save(order)).thenReturn(savedOrder);
        when(orderMapper.toDTO(savedOrder)).thenReturn(dto);

        OrderDTO result = orderService.createOrder(dto);

        assertNotNull(result);

        verify(orderRepository).save(order);
    }

    @Test
    void shouldThrowExceptionWhenMaximumOrdersReached() {

        OrderDTO dto = new OrderDTO();
        when(orderRepository.count()).thenReturn(5L);
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> orderService.createOrder(dto)
        );

        assertEquals("Maximum number of items exceeded", exception.getMessage());
        verify(orderRepository, never()).save(any());
    }

    @Test
    void shouldDeleteOrderSuccessfully() {
        UUID id = UUID.randomUUID();
        Order order = new Order();
        order.setId(id);

        when(orderRepository.findById(id))
                .thenReturn(Optional.of(order));

        orderService.deleteOrder(id);
        verify(orderRepository).findById(id);
        verify(orderRepository).delete(order);
    }

    @Test
    void shouldThrowOrderNotFoundWhenDeleting() {
        UUID id = UUID.randomUUID();
        when(orderRepository.findById(id))
                .thenReturn(Optional.empty());
        assertThrows(
                OrderNotFoundException.class,
                () -> orderService.deleteOrder(id)
        );
        verify(orderRepository, never()).delete(any());
    }

    @Test
    void shouldUpdateStatusSuccessfully() {

        UUID id = UUID.randomUUID();
        Order order = new Order();
        order.setId(id);
        order.setStatus(OrderStatus.EM_PROCESSAMENTO);

        OrderDTO dto = new OrderDTO();

        when(orderRepository.findById(id)).thenReturn(Optional.of(order));
        when(orderRepository.save(order)).thenReturn(order);
        when(orderMapper.toDTO(order)).thenReturn(dto);

        OrderDTO result = orderService.updateStatus(id, OrderStatus.PAUSADO);
        assertNotNull(result);
        assertEquals(OrderStatus.PAUSADO, order.getStatus());
        verify(orderRepository).save(order);
    }

    @Test
    void shouldThrowExceptionForInvalidTransition() {

        UUID id = UUID.randomUUID();
        Order order = new Order();
        order.setStatus(OrderStatus.CANCELADO);

        when(orderRepository.findById(id))
                .thenReturn(Optional.of(order));
        assertThrows(
                IllegalStateException.class,
                () -> orderService.updateStatus(id, OrderStatus.PAUSADO)
        );
        verify(orderRepository, never()).save(any());
    }
}