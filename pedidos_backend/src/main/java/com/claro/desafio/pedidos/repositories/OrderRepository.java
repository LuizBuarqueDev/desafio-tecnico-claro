package com.claro.desafio.pedidos.repositories;

import com.claro.desafio.pedidos.entities.Order;
import com.claro.desafio.pedidos.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    long countByStatus(OrderStatus status);

    @Query("""
            SELECT o FROM Order o WHERE
                        (:search IS NULL OR LOWER(o.displayName) LIKE LOWER(CONCAT('%', :search, '%')))
            """)
    Page<Order> findOrders(@Param("search") String search, Pageable pageable);
}
