package com.claro.desafio.pedidos.services;

import com.claro.desafio.pedidos.dtos.OrderDTO;
import com.claro.desafio.pedidos.entities.Order;
import com.claro.desafio.pedidos.enums.OrderStatus;
import com.claro.desafio.pedidos.exceptions.OrderNotFoundException;
import com.claro.desafio.pedidos.mappers.OrderMapper;
import com.claro.desafio.pedidos.repositories.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private static final int MAX_ORDERS = 5;

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    @Transactional
    public OrderDTO createOrder(OrderDTO orderDTO) {
        if (orderRepository.count() >= MAX_ORDERS) {
            throw new IllegalArgumentException("Maximum number of items exceeded");
        }

        Order order = orderMapper.toEntity(orderDTO);
        order.setStatus(OrderStatus.EM_PROCESSAMENTO);

        Order savedOrder = orderRepository.save(order);
        log.info("Order {} created.", savedOrder.getId());

        return orderMapper.toDTO(savedOrder);
    }

    @Transactional
    public OrderDTO updateStatus(UUID id, OrderStatus newStatus) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found"));

        if (!order.getStatus().canTransitionTo(newStatus)) {
            throw new IllegalStateException("Invalid transition: " + order.getStatus() + " -> " + newStatus);
        }
        order.setStatus(newStatus);

        Order updated = orderRepository.save(order);
        log.info("Order {} changed from {} to {}", id, order.getStatus(), newStatus);
        return orderMapper.toDTO(updated);
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(orderMapper::toDTO)
                .toList();
    }

    public Page<OrderDTO> getOrders(String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return orderRepository
                .findOrders(search, pageable)
                .map(orderMapper::toDTO);
    }

    @Transactional
    public void deleteOrder(UUID id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found."));
    }
}
