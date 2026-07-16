package com.claro.desafio.pedidos.services;

import com.claro.desafio.pedidos.enums.OrderStatus;
import com.claro.desafio.pedidos.repositories.OrderRepository;
import io.micrometer.core.instrument.Gauge;
import io.micrometer.core.instrument.MeterRegistry;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MetricsService {

    private final MeterRegistry registry;
    private final OrderRepository orderRepository;

    @PostConstruct
    public void init() {
        Gauge.builder("pedidos_total", orderRepository, OrderRepository::count)
                .description("Quantidade total de pedidos cadastrados")
                .register(registry);
        for (OrderStatus status : OrderStatus.values()) {
            Gauge.builder("pedidos_by_status", orderRepository, repo -> repo.countByStatus(status))
                    .description("Quantidade de pedidos por status")
                    .tag("status", status.name())
                    .register(registry);
        }
    }
}