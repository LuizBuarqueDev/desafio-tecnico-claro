package com.claro.desafio.pedidos.repositories;

import com.claro.desafio.pedidos.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UUID, AppUser> {
}
